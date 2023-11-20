<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约机构">
<!--              <a-input placeholder="请输入签约机构" v-model="queryParam.signbranchid"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.signbranchid"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约柜员">
              <a-input placeholder="请输入签约柜员" v-model="queryParam.signtellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号/卡号">
              <a-input placeholder="请输入账号/卡号" v-model="queryParam.oldacctno"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="新账号">
              <a-input placeholder="请输入新账号" v-model="queryParam.newacctno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="经办人证件号码">
              <a-input placeholder="请输入经办人证件号码" v-model="queryParam.operidentno"></a-input>
            </a-form-item>
          </a-col>

         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约日期">
              <a-range-picker @change="onChangeqyrq" v-model="queryParam.signdate"/>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="解约机构">
              <a-input placeholder="请输入解约机构" v-model="queryParam.cancelbranchid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="解约柜员">
              <a-input placeholder="请输入解约柜员" v-model="queryParam.canceltellerno"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('电话银行签约信息表')">导出</a-button>
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
    <dhyhqyxxb-modal ref="modalForm" @ok="modalFormOk"></dhyhqyxxb-modal>
  </a-card>
</template>

<script>
  import DhyhqyxxbModal from './modules/DhyhqyxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "DhyhqyxxbList",
    mixins:[JeecgListMixin],
    components: {
      DhyhqyxxbModal,JTreeSelect
    },
    data () {
      return {
        description: '电话银行签约信息表管理页面',
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
            title: '账号/卡号',
            align:"center",
            dataIndex: 'oldacctno'
           },
		   {
            title: '新账号',
            align:"center",
            dataIndex: 'newacctno'
           },
		   {
            title: '旧查询密码',
            align:"center",
            dataIndex: 'oldquerypwd'
           },
		   {
            title: '新查询密码',
            align:"center",
            dataIndex: 'newquerypwd'
           },
		   {
            title: '密码标志',
            align:"center",
            dataIndex: 'pwdflag'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'cardflag'
           },
		   {
            title: '签约状态',
            align:"center",
            dataIndex: 'signstate'
           },
		   {
            title: '签约功能',
            align:"center",
            dataIndex: 'signfunction'
           },
		   {
            title: '签约渠道',
            align:"center",
            dataIndex: 'signchannel'
           },
		   {
            title: '账户类别',
            align:"center",
            dataIndex: 'accttype'
           },
		   {
            title: '经办人证件类型',
            align:"center",
            dataIndex: 'operidenttype'
           },
		   {
            title: '经办人证件号码',
            align:"center",
            dataIndex: 'operidentno'
           },
		   {
            title: '单笔限额',
            align:"center",
            dataIndex: 'singlelimit'
           },
		   {
            title: '单日限额',
            align:"center",
            dataIndex: 'daylimit'
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'signdate'
           },
		   {
            title: '签约时间',
            align:"center",
            dataIndex: 'signtime'
           },
		   {
            title: '签约机构',
            align:"center",
            dataIndex: 'signbranchid'
           },
		   {
            title: '签约柜员',
            align:"center",
            dataIndex: 'signtellerno'
           },
		   {
            title: '解约日期',
            align:"center",
            dataIndex: 'canceldate'
           },
		   {
            title: '解约时间',
            align:"center",
            dataIndex: 'canceltime'
           },
		   {
            title: '解约机构',
            align:"center",
            dataIndex: 'cancelbranchid'
           },
		   {
            title: '解约柜员',
            align:"center",
            dataIndex: 'canceltellerno'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '预留字段1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留字段2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留字段3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '账务处理日期',
            align:"center",
            dataIndex: 'acctdate'
           },
		   {
            title: '单日累计金额',
            align:"center",
            dataIndex: 'dayaccumulamt'
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
		 /*  {
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
          list: "/dhyhqyxxb/dhyhqyxxb/list",
          delete: "/dhyhqyxxb/dhyhqyxxb/delete",
          deleteBatch: "/dhyhqyxxb/dhyhqyxxb/deleteBatch",
          exportXlsUrl: "dhyhqyxxb/dhyhqyxxb/exportXls",
          importExcelUrl: "dhyhqyxxb/dhyhqyxxb/importExcel",
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