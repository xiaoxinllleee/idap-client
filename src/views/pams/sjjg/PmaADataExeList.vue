<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务编号">
              <a-input placeholder="请输入任务编号" v-model="queryParam.rwbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务名称">
              <a-input placeholder="请输入任务名称" v-model="queryParam.rwmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否启用">
              <a-input placeholder="请输入是否启用" v-model="queryParam.sfqy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'PmaADataExe:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('数据加工功能')" v-has="'PmaADataExe:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'PmaADataExe:imp'">导入</a-button>
      <a-button @click="initData" v-has="'PmaADataExe:init'">批量提取</a-button>
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

         <span slot="sfqy" slot-scope="text, record" >
          <a-switch v-model="record.sfqy=='1'"  @change="handleClickFlag(record)"  />
        </span>

        <span slot="action" slot-scope="text, record">
           <Button   type="warning" size="small"  @click="viewRl(record)" v-has="'PmaADataExe:viewRl'">查看日历</Button>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
               <a-menu-item>
                  <a @click="handleEdit(record)" v-has="'PmaADataExe:edit'">编辑</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'PmaADataExe:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <pmaADataExe-modal ref="modalForm" @ok="modalFormOk"></pmaADataExe-modal>
    <SjjgrlList ref="rwrlForm" @ok="modalFormOk"></SjjgrlList>
    <batch-extracts  ref="BatchExtracts" @ok="modalFormOk"></batch-extracts>
  </a-card>
</template>

<script>
  import PmaADataExeModal from './modules/PmaADataExeModal'
  import SjjgrlList from './modules/SjjgrlList'
  import BatchExtracts from './modules/BatchExtracts'

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {jxjgsfqyBatch} from '@/api/api'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "PmaADataExeList",
    mixins:[JeecgListMixin],
    components: {
      PmaADataExeModal,SjjgrlList,BatchExtracts,ExcelImport
    },
    data () {
      return {
        description: '数据加工功能管理页面',
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
            title: '任务编号',
            align:"center",
            dataIndex: 'rwbh'
           },
		   {
            title: '任务名称',
            align:"center",
            dataIndex: 'rwmc'
           },
		   {
            title: '计算脚本',
            align:"center",
            dataIndex: 'jsjb'
           },
		   {
            title: '执行顺序',
            align:"center",
            dataIndex: 'zxsx'
           },
          {
            title: '是否启用',
            dataIndex: 'sfqy',
            scopedSlots: {customRender: 'sfqy'},
            align: "center",
          },
		   {
            title: '最大成功日期',
            align:"center",
            dataIndex: 'zdcgrq'
           },
		   {
            title: '当前执行状态',
            align:"center",
            dataIndex: 'dqzxzt_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/sjjg/pmaADataExe/list",
          delete: "/sjjg/pmaADataExe/delete",
          deleteBatch: "/sjjg/pmaADataExe/deleteBatch",
          exportXlsUrl: "sjjg/pmaADataExe/exportXls",
          importExcelUrl: "sjjg/pmaADataExe/importExcel",
          exportTemplateUrl:"/sjjg/pmaADataExe/exportTemplateXls",
       },
        exportTemplateName: '数据加工功能管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleClickFlag(record){
        let that = this;
        console.log(record)
        if(record.sfqy=='1'){
          record.sfqy='2'
          jxjgsfqyBatch({id: record.id, sfqy: 2}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }else{
          record.sfqy='1'
          jxjgsfqyBatch({id: record.id, sfqy: 1}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });

        }
      },

      viewRl(record){
        this.$refs.rwrlForm.visible = true
        this.$refs.rwrlForm.open(record);
      },

      initData(){
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请至少选择一条记录！')
          return
        } else {
          this.$refs.BatchExtracts.showModal(this.selectedRowKeys);
        }

      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>