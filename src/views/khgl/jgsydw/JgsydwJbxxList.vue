<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pidField="sjzzbz" :tree-default-expand-all="true" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag placeholder="请选择所属营销单元" v-model="queryParam.ssyxdy"
                               dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="单位名称">
            <j-input placeholder="请输入单位名称" v-model="queryParam.dwmc"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="档案编号">
              <a-input placeholder="请输入档案编号" v-model="queryParam.dabh"/>
            </a-form-item></a-col>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('机关事业单位')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
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
               :scroll="{ x: 2000 }"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
          <!--<a @click="handleEdit(record)">编辑</a>
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
          </a-dropdown>-->
        </span>
        <span slot="detail" slot-scope="dabh, record">
          <a @click="handleDetail(record)">{{dabh}}</a>
        </span>
        <span slot="dwdz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="12"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jgsydwJbxx-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import JgsydwJbxxModal from './modules/JgsydwJbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import JInput from '../../../components/jeecg/JInput'
  import JSelectYgxx from '../../../components/jeecgbiz/JSelectYgxx'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "JgsydwJbxxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      JSelectYgxx,
      JInput,
      JTreeSelect,
      JgsydwJbxxModal
    },
    data () {
      return {
        description: '机关事业单位管理页面',
        // 表头
        columns: [
          /*{
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },*/
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy_dictText'
          },
          {
            title: '归属客户经理',
            align:"center",
            dataIndex: 'gskhjl_dictText'
          },
          {
            title: '档案编号',
            align:"center",
            dataIndex: 'dabh',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '单位名称',
            align:"center",
            dataIndex: 'dwmc'
          },
          {
            title: '主要负责人',
            align:"center",
            dataIndex: 'zyfzr'
          },
          {
            title: '负责人证件号码',
            align:"center",
            dataIndex: 'fzrzjhm'
          },
          {
            title: '单位电话',
            align:"center",
            dataIndex: 'dwdh'
          },
          /*{
            title: '传真号',
            align:"center",
            dataIndex: 'czh'
          },
          {
            title: '邮政编码',
            align:"center",
            dataIndex: 'yzbm'
          },*/
          {
            title: '单位地址',
            align:"center",
            dataIndex: 'dwdz',
            scopedSlots: { customRender: 'dwdz' },
          },
          {
            title: '行业分类',
            align:"center",
            dataIndex: 'hyfl'
          },
          {
            title: '职工人数',
            align:"center",
            dataIndex: 'zgrs'
          },
          {
            title: '客户重要程度',
            align:"center",
            dataIndex: 'khzycd_dictText'
          },
          /*{
            title: '潜在业务',
            align:"center",
            dataIndex: 'qzyw'
          },
          {
            title: '主要收入项目',
            align:"center",
            dataIndex: 'zysrxm'
          },
          {
            title: '资产负债(万元)',
            align:"center",
            dataIndex: 'zcfz'
          },
          {
            title: '年收入(万元)',
            align:"center",
            dataIndex: 'nsr'
          },
          {
            title: '年支出(万元)',
            align:"center",
            dataIndex: 'nzc'
          },
          {
            title: '年利润(万元)',
            align:"center",
            dataIndex: 'nlr'
          },
          {
            title: '其它收入(万元)',
            align:"center",
            dataIndex: 'qtsr'
          },
          {
            title: '其他支出(万元)',
            align:"center",
            dataIndex: 'qtzc'
          },
          {
            title: '总收入(万元)',
            align:"center",
            dataIndex: 'zsr'
          },
          {
            title: '总支出(万元)',
            align:"center",
            dataIndex: 'zzc'
          },
          {
            title: '净利润(万元)',
            align:"center",
            dataIndex: 'jlr'
          },*/
          {
            title: '录入人',
            align: "center",
            dataIndex: 'createBy'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'createTime'
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'updateBy'
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'updateTime'
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
          list: "/khgl.jgsydw/jgsydwJbxx/list",
          delete: "/khgl.jgsydw/jgsydwJbxx/delete",
          deleteBatch: "/khgl.jgsydw/jgsydwJbxx/deleteBatch",
          exportXlsUrl: "khgl.jgsydw/jgsydwJbxx/exportXls",
          importExcelUrl: "khgl.jgsydw/jgsydwJbxx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleDetail(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "机关事业单位客户资料详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>