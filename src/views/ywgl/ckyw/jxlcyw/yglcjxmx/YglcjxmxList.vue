<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请输入统计月份" @change="onChange" v-model="queryParam.tjyf" style="width: 100%"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"></a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择组织标识" v-model="queryParam.zzbz"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
                             pidField="sjzzbz"
                             treeNodeFilterProp="title"
                             :sszh="true"
                             :showSearch="false"
                             :treeDefaultExpandAll="true"
                             :filterTreeNode="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.gwbz"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择开户机构"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号名称">
              <a-input placeholder="请输入账号名称" v-model="queryParam.zhmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="月存款日平余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.ckrpye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.ckrpye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关联标识">
              <a-select placeholder="全部" v-model="queryParam.glbz">
                <a-select-option value="0">
                  自动关联
                </a-select-option>
                <a-select-option value="1">
                  手动关联
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="年存款日平余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.nckrpye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.nckrpye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号性质">
              <a-select placeholder="全部" v-model="queryParam.zhxz">
                <a-select-option value="1">
                  对私活期
                </a-select-option>
                <a-select-option value="2">
                  对公活期
                </a-select-option>
                <a-select-option value="3">
                  定期
                </a-select-option>
                <a-select-option value="4">
                  一本通
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.ckye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.ckye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-range-picker @change="onChangekhrq" v-model="queryParam.khrq" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"></a-range-picker>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('员工揽储绩效明细')">导出</a-button>
      <a-button icon="area-chart" @click="init">提取</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:4050}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yglcjxmx-modal ref="modalForm" @ok="modalFormOk"></yglcjxmx-modal>
  </a-card>
</template>

<script>
  import YglcjxmxModal from './modules/YglcjxmxModal'
  import moment from 'moment'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction, postAction} from "../../../../../api/manage";
  import {filterObj} from "../../../../../utils/util";

  export default {
    name: "YglcjxmxList",
    mixins:[JeecgListMixin],
    components: {
      YglcjxmxModal,JTreeSelect
    },
    data () {
      return {
        description: '员工揽储绩效明细管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf'
          },
          {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg_dictText'
          },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq'
           },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh'
          },
          {
            title: '账号名称',
            align:"center",
            dataIndex: 'zhmc'
          },
          {
            title: '账号性质',
            align:"center",
            dataIndex: 'zhxz_dictText'
          },
          {
            title: '关联比率(%)',
            align:"center",
            dataIndex: 'glbl'
          },
          {
            title: '关联标识',
            align:"center",
            dataIndex: 'glbz_dictText'
          },
          {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
          },
          {
            title: '月存款日平余额',
            align:"center",
            dataIndex: 'ckrpye'
          },
          {
            title: '年存款日平余额',
            align:"center",
            dataIndex: 'nckrpye'
          },
          {
            title: '折算后存款余额',
            align:"center",
            dataIndex: 'zshckye'
          },
          {
            title: '折算后存款日平余额',
            align:"center",
            dataIndex: 'zshckrpye'
          },
          {
            title: '折算后年存款日平余额',
            align:"center",
            dataIndex: 'zshnckrpye'
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrczy'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
		   /*{
            title: '关联id',
            align:"center",
            dataIndex: 'glid'
           },
		   {
            title: '有效标识',
            align:"center",
            dataIndex: 'yxbz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/yglcjxmx/yglcjxmx/list",
          delete: "/yglcjxmx/yglcjxmx/delete",
          deleteBatch: "/yglcjxmx/yglcjxmx/deleteBatch",
          exportXlsUrl: "yglcjxmx/yglcjxmx/exportXls",
          importExcelUrl: "yglcjxmx/yglcjxmx/importExcel",
          init: "/yglcjxmx/yglcjxmx/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.getCurrentDate();
      this.queryParam.khrq_end = moment(new Date()).format('YYYY-MM-DD');
    },
    methods: {
      moment,
      onChange(date,dateString){
        this.queryParam.tjyf = dateString;
      },
      onChangekhrq(value,dateString){
        //this.queryParam.khrqString = dateString[0] + ',' + dateString[1];
        let khrqString = dateString
        this.queryParam.khrq_begin = khrqString[0]
        this.queryParam.khrq_end = khrqString[1]
      },
      getCurrentDate() {
        let curDate = new Date()
        let curMonth= {year : curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate)
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        if (!this.url.list){
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.khrq
        return filterObj(param);
      },
      init(){
        console.info('统计日期', this.queryParam.tjyf)
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          this.$message.warning("统计日期不能为空！")
          return false
        }
        let params = {'tjyf': moment(this.queryParam.tjyf).format("YYYY-MM"),}
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData()
          } else {
            this.$message.warning(res.message,5)
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>