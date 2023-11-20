<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
<!--              <a-input placeholder="请输入删除标志" v-model="queryParam.jgm"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.jgm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目号">
              <a-input placeholder="请输入科目号" v-model="queryParam.kmh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="	正常形态贷款帐号">
              <a-input placeholder="请输入	正常形态贷款帐号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应账号">
              <a-input placeholder="请输入对应账号" v-model="queryParam.zh1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借贷标志">
              <a-input placeholder="请输入借贷标志" v-model="queryParam.jdbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应科目">
              <a-input placeholder="请输入对应科目" v-model="queryParam.dykm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应账号">
              <a-input placeholder="请输入对应账号" v-model="queryParam.dyzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收息日">
              <a-range-picker @change="onChangesxr" v-model="queryParam.sxr" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="四级分类">
              <a-input placeholder="请输入四级分类" v-model="queryParam.sjfl"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="五级分类">
              <a-input placeholder="请输入五级分类" v-model="queryParam.wjfl"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('利息回收登记簿')">导出</a-button>
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
    <lxhsdjb-modal ref="modalForm" @ok="modalFormOk"></lxhsdjb-modal>
  </a-card>
</template>

<script>
  import LxhsdjbModal from './modules/LxhsdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import {filterObj} from '@/utils/util'

  export default {
    name: "LxhsdjbList",
    mixins:[JeecgListMixin],
    components: {
      LxhsdjbModal,JTreeSelect
    },
    data () {
      return {
        description: '利息回收登记簿管理页面',
        // 表头
        dateFormat: 'YYYY/MM/DD',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '货币号',
            align:"center",
            dataIndex: 'hbh'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'jgm_dictText'
           },
		   {
            title: '科目号',
            align:"center",
            dataIndex: 'kmh'
           },
		   {
            title: '正常形态贷款帐号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '对应账号',
            align:"center",
            dataIndex: 'zh1'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '借贷标志',
            align:"center",
            dataIndex: 'jdbz'
           },
		   {
            title: '对应科目',
            align:"center",
            dataIndex: 'dykm'
           },
		   {
            title: '对应账号',
            align:"center",
            dataIndex: 'dyzh'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'qxr'
           },
		   {
            title: '结息日',
            align:"center",
            dataIndex: 'jxr'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'll'
           },
		   {
            title: '积数',
            align:"center",
            dataIndex: 'js'
           },
		   {
            title: '日数',
            align:"center",
            dataIndex: 'rs'
           },
		   {
            title: '收息日',
            align:"center",
            dataIndex: 'sxr'
           },
		   {
            title: '入帐标志',
            align:"center",
            dataIndex: 'rzbz'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 're1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 're2'
           },
		   {
            title: '四级分类',
            align:"center",
            dataIndex: 'sjfl'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '核心借据号',
            align:"center",
            dataIndex: 'jjh'
           },
		   {
            title: '信贷借据号',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '利息',
            align:"center",
            dataIndex: 'lx'
           },
		   {
            title: '合计利息',
            align:"center",
            dataIndex: 'hjlx'
           },
		   {
            title: '贷款本金',
            align:"center",
            dataIndex: 'dkbj'
           },
		   {
            title: '入账标志',
            align:"center",
            dataIndex: 'shouldPayTerm'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
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
          list: "/lxhsdjb/lxhsdjb/list",
          delete: "/lxhsdjb/lxhsdjb/delete",
          deleteBatch: "/lxhsdjb/lxhsdjb/deleteBatch",
          exportXlsUrl: "lxhsdjb/lxhsdjb/exportXls",
          importExcelUrl: "lxhsdjb/lxhsdjb/importExcel",
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
        delete param.sxr;
        return filterObj(param);
      },
      onChangesxr(value,dateString){
        let sxrString = dateString
        this.queryParam.sxr_begin = sxrString[0]
        this.queryParam.sxr_end = sxrString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>