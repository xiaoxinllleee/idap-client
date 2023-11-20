<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约机构">
<!--              <a-input placeholder="全部" v-model="queryParam.acctno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.signbankno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主账号">
              <a-input placeholder="请输入主账号" v-model="queryParam.acctno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约账号或卡号">
              <a-input placeholder="请输入签约账号或卡号" v-model="queryParam.signno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="手机号">
              <a-input placeholder="请输入手机号" v-model="queryParam.mobile"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.customname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.certno"></a-input>
            </a-form-item>
          </a-col>
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约日期">
              <a-range-picker @change="onChangeqyrq" v-model="queryParam.signdate"/>
            </a-form-item>
          </a-col>-->
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('短信业务签约登记簿')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:3430}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
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
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dxywqydjb-modal ref="modalForm" @ok="modalFormOk"></dxywqydjb-modal>
  </a-card>
</template>

<script>
  import DxywqydjbModal from './modules/DxywqydjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'

  export default {
    name: "DxywqydjbList",
    mixins:[JeecgListMixin],
    components: {
      DxywqydjbModal,JTreeSelect
    },
    data () {
      return {
        description: '短信业务签约登记簿管理页面',
        // 表头
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '主账号',
            align:"center",
            dataIndex: 'acctno'
           },
		   {
            title: '签约账号或卡号',
            align:"center",
            dataIndex: 'signno'
           },
		   {
            title: '手机号',
            align:"center",
            dataIndex: 'mobile'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'customname'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'certtype'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'certno'
           },
		   {
            title: '开通类型',
            align:"center",
            dataIndex: 'noticeflag'
           },
		   {
            title: '签约机构',
            align:"center",
            dataIndex: 'signbankno_dictText'
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'signdate'
           },
		   {
            title: '解约机构',
            align:"center",
            dataIndex: 'rescbanno'
           },
		   {
            title: '解约日期',
            align:"center",
            dataIndex: 'rescdate'
           },
		   {
            title: '控制标志',
            align:"center",
            dataIndex: 'controlflag'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '旧签约账号或卡号',
            align:"center",
            dataIndex: 'oldsignno'
           },
		   {
            title: '旧账号',
            align:"center",
            dataIndex: 'oldacctno'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		  /* {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dxywqydjb/dxywqydjb/list",
          delete: "/dxywqydjb/dxywqydjb/delete",
          deleteBatch: "/dxywqydjb/dxywqydjb/deleteBatch",
          exportXlsUrl: "dxywqydjb/dxywqydjb/exportXls",
          importExcelUrl: "dxywqydjb/dxywqydjb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.signdate;
        return filterObj(param);
      },
      onChangeqyrq(value,dateString){
        let signdateString=dateString
        this.queryParam.signdate_begin=signdateString[0]
        this.queryParam.signdate_end=signdateString[1]

      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>