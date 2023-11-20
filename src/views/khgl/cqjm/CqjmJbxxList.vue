<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <!--<a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag placeholder="请选择所属营销单元" v-model="queryParam.ssyxdy"
                               dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :show-search="true"/>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pidField="sjzzbz"
                           :tree-default-expand-all="true" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属社区">
            <j-dict-select-tag placeholder="请选择所属社区" v-model="queryParam.sscbm"
                               dict-code="YXDYGL_CZXXGL, VILLAGE, QYBM" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属客户经理">
            <j-dict-select-tag placeholder="请选择客户经理" v-model="queryParam.sskhjl"
                               dict-code="HR_BAS_STAFF, YGXM, YGGH" :show-search="true"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <!--<a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>-->
            <a-col :md="6" :sm="8"><a-form-item label="档案编号">
              <a-input placeholder="请输入档案编号" v-model="queryParam.dabh"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户重要程度">
              <j-dict-select-tag placeholder="请选择客户重要程度" v-model="queryParam.khzycd" dict-code="khzycd"/>
            </a-form-item></a-col>
<!--            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>-->
<!--            <a-col :md="6" :sm="8"><a-form-item label="性别">-->
<!--              <j-dict-select-tag placeholder="请选择客户性别" v-model="queryParam.sex" dict-code="sex"/>-->
<!--            </a-form-item></a-col>-->
<!--            <a-col :md="6" :sm="8"><a-form-item label="户口性质">-->
<!--              <j-dict-select-tag placeholder="请选择户口性质" v-model="queryParam.hkxz" dict-code="khgl_hkxz"/>-->
<!--            </a-form-item></a-col>-->
<!--            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>-->
<!--            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>-->
<!--            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>-->
          </template>

          <a-col :md="6" :sm="8" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            <a @click="handleToggleSearch" style="margin-left: 8px">
              {{ toggleSearchStatus ? '收起' : '展开' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
            </a>
          </span></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('城区居民功能包')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
          <a-popover title="自定义列" trigger="click" placement="leftBottom">
            <template slot="content">
              <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
                <a-row><template v-for="(item,index) in defColumns">
                  <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                    <a-col :span="12"><a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox></a-col>
                  </template>
                </template></a-row>
              </a-checkbox-group>
            </template>
            <a><a-icon type="setting" />自定义列</a>
          </a-popover>
        </span>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 4000 }"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
        <span slot="detail" slot-scope="dabh, record">
          <a @click="handleDetail(record)">{{dabh}}</a>
        </span>
        <span slot="hjdz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="khqzyw" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="address" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="bz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <cqjmJbxx-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import CqjmJbxxModal from './modules/CqjmJbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import JInput from '../../../components/jeecg/JInput'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import { getAction,putAction,deleteAction } from '@/api/manage'
  import Vue from 'vue'

  export default {
    name: "CqjmJbxxList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect,
      CqjmJbxxModal
    },
    data () {
      return {
        description: '城区居民功能包管理页面',
        //表头
        columns: [],
        //列设置
        settingColumns: [],
        //列定义
        defColumns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '档案编号',
            align: "center",
            dataIndex: 'dabh',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '客户重要程度',
            align: "center",
            dataIndex: 'khzycd_dictText',
            // filters: [
            //   {text:'一般关注',value:'1'},
            //   {text:'培植发展',value:'2'},
            //   {text:'重点跟进',value:'3'},
            //   {text:'定期回访',value:'4'},
            // ],
            // onFilter: (value, record) => record.khzycd.indexOf(value) === 0,
          },
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText'
          },
          // {
          //   title: '所属营销单元',
          //   align: "center",
          //   dataIndex: 'ssyxdy_dictText'
          // },
          {
            title: '所属社区',
            align: "center",
            dataIndex: 'sscbm_dictText'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
          },
          {
            title: '年龄',
            align: "center",
            dataIndex: 'age',
            sorter: (a,b) => a.age - b.age,
          },
          {
            title: '性别',
            align: "center",
            dataIndex: 'sex_dictText',
            filters: [
              {text:'男',value:'1'},
              {text:'女',value:'2'},
            ],
            onFilter: (value, record) => record.sex.indexOf(value) === 0,
          },
          {
            title: '联系方式',
            align: "center",
            dataIndex: 'lxfs'
          },
          // {
          //   title: '户号编码',
          //   align: "center",
          //   dataIndex: 'hhbm'
          // },
          // {
          //   title: '是否户主',
          //   align: "center",
          //   dataIndex: 'sfhz_dictText'
          // },
          // {
          //   title: '与户主关系',
          //   align: "center",
          //   dataIndex: 'yhzgx_dictText'
          // },
          // {
          //   title: '民族',
          //   align: "center",
          //   dataIndex: 'nation'
          // },
          // {
          //   title: '文化程度',
          //   align: "center",
          //   dataIndex: 'whcd_dictText'
          // },
          // {
          //   title: '婚姻状况',
          //   align: "center",
          //   dataIndex: 'hyzk_dictText'
          // },
          {
            title: '户口性质',
            align: "center",
            dataIndex: 'hkxz_dictText',
            filters: [
              {text:'农业户口',value:'1'},
              {text:'非农业户口',value:'2'},
            ],
            onFilter: (value, record) => record.hkxz.indexOf(value) === 0,
          },
          {
            title: '户籍地址',
            align: "center",
            dataIndex: 'hjdz',
            scopedSlots: { customRender: 'hjdz' },
          },
          {
            title: '住址',
            align: "center",
            dataIndex: 'address',
            scopedSlots: { customRender: 'address' },
          },
          {
            title: '是否贫困户',
            align: "center",
            dataIndex: 'sfpkh_dictText'
          },
          {
            title: '是否低保户',
            align: "center",
            dataIndex: 'sfdbh_dictText'
          },
          // {
          //   title: '从事行业',
          //   align: "center",
          //   dataIndex: 'cshy'
          // },
          // {
          //   title: '工作单位',
          //   align: "center",
          //   dataIndex: 'gzdw'
          // },
          // {
          //   title: '单位地址',
          //   align: "center",
          //   dataIndex: 'dwdz'
          // },
          {
            title: '是否外出务工',
            align: "center",
            dataIndex: 'sfwcwg_dictText'
          },
          {
            title: '最早返乡时间',
            align: "center",
            dataIndex: 'zzfxsj'
          },
          {
            title: '客户潜在业务',
            align: "center",
            dataIndex: 'khqzyw_dictText',
            scopedSlots: { customRender: 'khqzyw' },
          },
          {
            title: '所属客户经理',
            align: "center",
            dataIndex: 'sskhjl_dictText'
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' },
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'xgr'
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'xgsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 100,
          }
        ],
        url: {
          list: "/khgl.cqjm/cqjmJbxx/list",
          delete: "/khgl.cqjm/cqjmJbxx/delete",
          deleteBatch: "/khgl.cqjm/cqjmJbxx/deleteBatch",
          exportXlsUrl: "khgl.cqjm/cqjmJbxx/exportXls",
          importExcelUrl: "khgl.cqjm/cqjmJbxx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.initColumns();
    },
    methods: {
      handleAdd() {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.disabled_1 = false;
      },
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        if (!record.zjhm) {
          this.$message.error("该客户信息不存在!");
          return;
        }
        deleteAction(this.url.delete, { zjhm: record.zjhm }).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
        })
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.disabled_1 = true;
      },
      handleDetail(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.disabled_1 = true;
      },
      onColSettingsChange (checkedValues) {
        var key = this.$route.name+":colsettings";
        Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
        this.settingColumns = checkedValues;
        const cols = this.defColumns.filter(item => {
          if(item.key=='rowIndex' || item.dataIndex=='action'){
            return true;
          }
          if (this.settingColumns.includes(item.dataIndex)) {
            return true;
          }
          return false;
        })
        this.columns = cols;
      },
      initColumns() {
        //权限过滤（列权限控制时打开，修改第二个参数为授权码前缀）
        //this.defColumns = colAuthFilter(this.defColumns,'testdemo:');
        var key = this.$route.name+":colsettings";
        let colSettings = Vue.ls.get(key);
        if (colSettings==null || colSettings==undefined) {
          let allSettingColumns = [];
          this.defColumns.forEach(function(item, i, array) {
            allSettingColumns.push(item.dataIndex);
          })
          this.settingColumns = allSettingColumns;
          this.columns = this.defColumns;
        } else {
          this.settingColumns = colSettings;
          const cols = this.defColumns.filter(item => {
            if (item.key=='rowIndex' || item.dataIndex=='action') {
              return true;
            }
            if (colSettings.includes(item.dataIndex)) {
              return true;
            }
            return false;
          })
          this.columns = cols;
        }
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>