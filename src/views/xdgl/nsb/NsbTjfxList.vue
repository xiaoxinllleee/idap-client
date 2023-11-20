<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">


          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('年审统计分析')"  v-has="'nsbtjfx:dc'">导出</a-button>

      <a-button @click="tq" type="primary" :loading="tqLoading" v-has="'nsbtjfx:tq'">提取</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->

    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <nsbTjfx-modal ref="modalForm" @ok="modalFormOk"></nsbTjfx-modal>
  </a-card>
</template>

<script>
  import NsbTjfxModal from './modules/NsbTjfxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction, putAction } from '@api/manage'

  export default {
    name: "NsbTjfxList",
    mixins:[JeecgListMixin],
    components: {
      NsbTjfxModal,JTreeSelect
    },
    data () {
      return {
        description: '年审统计分析管理页面',
        tqLoading:false,
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
            title: '统计时间',
            align:"center",
            dataIndex: 'tjsj'
           },
		   {
            title: '组织简称',
            align:"center",
            dataIndex: 'zzjc'
           },
		   {
            title: '总户数',
            align:"center",
            dataIndex: 'zhs'
           },
		   {
            title: '总人数',
            align:"center",
            dataIndex: 'zrs'
           },
		   {
            title: '等级A',
            align:"center",
            dataIndex: 'dja'
           },
		   {
            title: '等级B',
            align:"center",
            dataIndex: 'djb'
           },
		   {
            title: '等级C',
            align:"center",
            dataIndex: 'djc'
           },
		   {
            title: '等级D',
            align:"center",
            dataIndex: 'djd'
           },
		   {
            title: '等级E',
            align:"center",
            dataIndex: 'dje'
           },
		   {
            title: 'A授信金额',
            align:"center",
            dataIndex: 'asxje'
           },
		   {
            title: 'B授信金额',
            align:"center",
            dataIndex: 'bsxje'
           },
		   {
            title: 'C授信金额',
            align:"center",
            dataIndex: 'csxje'
           },
		   {
            title: 'D授信金额',
            align:"center",
            dataIndex: 'dsxje'
           },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
		url: {
          list: "/nsb/nsbTjfx/list",
          delete: "/nsb/nsbTjfx/delete",
          deleteBatch: "/nsb/nsbTjfx/deleteBatch",
          exportXlsUrl: "nsb/nsbTjfx/exportXls",
          importExcelUrl: "nsb/nsbTjfx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      tq(){
        this.tqLoading = true
        getAction("/nsb/nsbTjfx/tq").then(res=>{
          this.tqLoading = false
          this.successInfo("提取成功")
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>