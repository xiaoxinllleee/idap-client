<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.zzbz"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'DkspSxsp:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('授信审批')" v-has="'DkspSxsp:exp'">导出</a-button>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a v-if="record.result == '0' || record.result == '3' || !record.processId" @click="handleEdit(record)" v-has="'DkspSxsp:edit'">编辑</a>
          <a v-else @click="handleView(record)" v-has="'DkspSxsp:view'">查看</a>
          <a-divider type="vertical" v-if="record.processId && record.procInstId"/>
          <a v-if="record.processId && record.procInstId" @click="historyDetail(record)" v-has="'DkspSxsp:spls'">审批历史</a>
          <a-divider type="vertical" v-if="record.processId && record.procInstId"/>
          <a v-if="record.processId && record.procInstId && record.result == '2'" @click="historyDownload(record)" v-has="'DkspSxsp:spyjb'">审批意见表</a>
          <a-divider type="vertical" v-if="record.result == '0' || record.result == '3' || !record.processId"/>
          <a-dropdown v-if="record.result == '0' || record.result == '3' || !record.processId">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'DkspSxsp:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkspSxsp-modal ref="modalForm" @ok="modalFormOk"></dkspSxsp-modal>
    <!--审批历史 -->
    <historicDetail v-if="showHistory" @close="showHistory=false" :procInstId="procInstId" />
  </a-card>
</template>

<script>
  import DkspSxspModal from './modules/DkspSxspModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import store from '@/store/'
  import historicDetail from '@/views/activiti/historic-detail/historicDetail';
  import { downFile, getAction, postAction } from '@/api/manage'

  export default {
    name: "DkspSxspList",
    mixins:[JeecgListMixin],
    components: {
      DkspSxspModal, JTreeSelect, JInput, historicDetail
    },
    data () {
      return {
        description: '贷款审批授信审批管理页面',
        isAll: false,
        zzbz: '',
        showHistory: false,
        procInstId: "",
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
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '信用等级',
            align:"center",
            dataIndex: 'xydj_dictText'
           },
		   {
            title: '授信期限起',
            align:"center",
            dataIndex: 'sxqxBegin'
           },
		   {
            title: '授信期限止',
            align:"center",
            dataIndex: 'sxqxEnd'
           },
		   {
            title: '最高授信额度(万元)',
            align:"center",
            dataIndex: 'zgsxed'
           },
		   {
            title: '已使用授信额(万元)',
            align:"center",
            dataIndex: 'yysxed'
           },
          {
            title: '审批状态',
            align:"center",
            dataIndex: 'result_dictText'
          },
          {
            title: '提交人',
            align:"center",
            dataIndex: 'createBy'
          },
          {
            title: '提交时间',
            align:"center",
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dksp/sxsp/list",
          delete: "/dksp/sxsp/delete",
          deleteBatch: "/dksp/sxsp/deleteBatch",
          exportXlsUrl: "dksp/sxsp/exportXls",
          importExcelUrl: "dksp/sxsp/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.isAll = store.getters.isRoot
      this.zzbz = store.getters.userInfo.orgCode
    },
    methods: {
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      handleView: function(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title="详情";
        this.$refs.modalForm.disableSubmit = true;
      },
      historyDetail(v) {
        if (!v.procInstId) {
          this.$Message.error("流程实例ID不存在");
          return;
        }
        this.procInstId = v.procInstId;
        this.showHistory = true;
      },
      historyDownload(row){
        this.loading = true
        let fileName = "授信审批意见表"
        let param = {...row};
        console.log("导出参数",param)
        downFile('/dksp/sxsp/download',param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.pdf');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.pdf';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(()=>{
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>