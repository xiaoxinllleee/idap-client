<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="基础指标编号">
              <a-input placeholder="请输入基础指标编号" v-model="queryParam.id"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="基础指标名称">
              <a-input placeholder="请输入基础指标名称" v-model="queryParam.indexName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标归属机构">
              <a-input placeholder="请输入指标归属机构" v-model="queryParam.orgId"></a-input>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="备注">
              <a-input placeholder="请输入备注" v-model="queryParam.indexRemark"></a-input>
            </a-form-item>
          </a-col>-->
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类型标志">
              <a-input placeholder="请输入业务类型标志" v-model="queryParam.bizFlg"></a-input>
            </a-form-item>
          </a-col>-->

          <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if="false">
            <a-form-item label="业务id">
              <a-input placeholder="请输入业务类型标志" v-model="queryParam.indexId"></a-input>
            </a-form-item>
          </a-col>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-if="isCanAdd">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('基础指标信息表')">导出</a-button>
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
   <!-- <pmaFBaseIndexInfo-modal ref="modalForm" @ok="modalFormOk"></pmaFBaseIndexInfo-modal>-->
    <pma-f-base-index-info-modal ref="modalForm" @ok="modalFormOk"></pma-f-base-index-info-modal>
  </a-card>
</template>

<script>

  import { getAction } from '@api/manage'
  import PmaFBaseIndexInfoModal from '@views/pams/khlc/jczbgl/modules/modules/PmaFBaseIndexInfoModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "PmaFBaseIndexInfoList",
    mixins:[JeecgListMixin],
    components: {
      PmaFBaseIndexInfoModal
    },
    data () {
      return {
        description: '基础指标信息表管理页面',
        queryParam:[],
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
            title: '基础指标编号',
            align:"center",
            dataIndex: 'indexId'
           },
		   {
            title: '基础指标名称',
            align:"center",
            dataIndex: 'indexName'
           },
		   /*{
            title: '业务类型标志',
            align:"center",
            dataIndex: 'bizFlg'
           },*/
		   {
            title: '业务条线',
            align:"center",
            dataIndex: 'bussSysNo'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        isCanAdd:false,
        parentId:'',
		url: {
          list: "/jczbgl/pmaFBaseIndexInfo/list",
          listChild: "/jczbgl/pmaFBaseIndexInfo/listChild",
          delete: "/jczbgl/pmaFBaseIndexInfo/delete",
          deleteBatch: "/jczbgl/pmaFBaseIndexInfo/deleteBatch",
          exportXlsUrl: "jczbgl/pmaFBaseIndexInfo/exportXls",
          importExcelUrl: "jczbgl/pmaFBaseIndexInfo/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      myRefresh(data){
        this.isCanAdd = data.isLeaf;
        this.parentId = data.id;
        /*let params = {"id":data.id}
        getAction(this.url.listChild,params).then((res) => {
          console.log(res)
          this.dataSource = res.result.records
          console.log(this.dataSource)
          this.ipagination = res.result;
        })*/
        this.queryParam.indexTypeId = data.id;
        this.loadData(1);


      },  handleAdd: function () {
        this.$refs.modalForm.add(this.parentId);
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
      },
    },
    created () {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>