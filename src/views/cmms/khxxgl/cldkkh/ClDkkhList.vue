<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item label="是否采集">
              <j-dict-select-tag placeholder="是否采集" v-model="queryParam.sfcj" dict-code="sfbz"></j-dict-select-tag>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存量贷款客户')" v-has="'ClDkkh:exp'">导出</a-button>
      <a-button icon="area-chart" :loading="exportLoading2" @click="initSp" v-has="'ClDkkh:init'">提取</a-button>
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
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="view(record)" v-has="'ClDkkh:view'">查看</a>

<!--          <a-divider type="vertical" />
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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <clDkkh-modal ref="modalForm" @ok="modalFormOk"></clDkkh-modal>
    <nhjbxxx-xq-modal ref="NhjbxxxXqModal" />

  </a-card>
</template>

<script>
  import {getAction, putAction, httpAction} from '@/api/manage'
  import ClDkkhModal from './modules/ClDkkhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictRadioTag from '@comp/dict/JDictRadioTag'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import NhjbxxxXqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/NhjbxxxXqModal'

  export default {
    name: "ClDkkhList",
    mixins:[JeecgListMixin],
    components: {
      ClDkkhModal,JDictRadioTag,JTreeSelect,NhjbxxxXqModal
    },
    data () {
      return {
        exportLoading2:false,
        description: '存量贷款客户管理页面',
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
            title: '所属机构',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
           },
		   {
            title: '采集人',
            align:"center",
            dataIndex: 'cjr_dictText'
           },
/*		   {
            title: '所属机构代码',
            align:"center",
            dataIndex: 'ssjgdm'
           },*/
		   {
            title: '归属情况',
            align:"center",
            dataIndex: 'gsqk_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khgl/clDkkh/list",
          delete: "/khgl/clDkkh/delete",
          deleteBatch: "/khgl/clDkkh/deleteBatch",
          exportXlsUrl: "khgl/clDkkh/exportXls",
          importExcelUrl: "khgl/clDkkh/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      initSp(){
        this.exportLoading2 = true
        getAction("/khgl/clDkkh/init").then(res=>{
          if (res.success){
            this.successInfo("提取成功")
          }else {
            this.errorInfo(res.message)
          }
          this.exportLoading2 = false
        })
      },
      view(row){
        getAction("khflgl/nhxq/list",{zjhm:row.zjhm}).then(res=>{
          if (res.success){
            let jg =  res.result.records;
            if (jg.length > 0){
              console.log("这个是存量数据")
              let rowVal = res.result.records[0];
              this.handlepjsxjdmxEdit(rowVal);
            }else {

            }
          }
        })
      },
      handlepjsxjdmxEdit(rowVal){
        this.$refs.NhjbxxxXqModal.edit(rowVal);
        this.$refs.NhjbxxxXqModal.title = "详情";
        this.$refs.NhjbxxxXqModal.disableSubmit = true;
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>