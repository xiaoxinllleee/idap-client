<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人证件号码">
              <a-input placeholder="请输入借款人证件号码" v-model="queryParam.jkrzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人名称">
              <a-input placeholder="请输入借款人名称" v-model="queryParam.jkrmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关联关系">
              <a-select placeholder="全部" v-model="queryParam.glgx">
                <a-select-option value="1">
                  父母与子女
                </a-select-option>
                <a-select-option value="2">
                  配偶
                </a-select-option>
                <a-select-option value="3">
                  兄弟姐妹
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关联人证件号码">
              <a-input placeholder="请输入关联人证件号码" v-model="queryParam.glrzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关联人姓名">
              <a-input placeholder="请输入关联人姓名" v-model="queryParam.glrxm"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'dkhkglrgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷款客户关联人管理')" v-has="'dkhkglrgl:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'dkhkglrgl:import'">导入</a-button>
      <a-button @click="init" icon="area-chart" v-has="'dkhkglrgl:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="middle"
               bordered
               rowKey=""
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="glrgzdw" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkhkglrgl:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'dkhkglrgl:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkkhglrgl-modal ref="modalForm" @ok="modalFormOk"></dkkhglrgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkkhglrglModal from './modules/DkkhglrglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { deleteAction,getAction } from '@/api/manage'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import {putAction} from "../../../../api/manage";
  import ExcelImport from '@/components/common/ExcelImport'
  export default {
    name: "DkkhglrglList",
    mixins:[JeecgListMixin],
    components: {
      DkkhglrglModal,JTreeSelect,JEllipsis,ExcelImport
    },
    data () {
      return {
        description: '贷款客户关联人管理管理页面',
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
            title: '借款人证件号码',
            align:"center",
            dataIndex: 'jkrzjhm',
            //width: 200
           },
		   {
            title: '借款人名称',
            align:"center",
            dataIndex: 'jkrmc',
            //width: 130
           },
		   {
            title: '关联人证件类型',
            align:"center",
            dataIndex: 'glrzjlx_dictText',
            //width: 130
           },
		   {
            title: '关联人证件号码',
            align:"center",
            dataIndex: 'glrzjhm',
            //width: 200
           },
		   {
            title: '关联人姓名',
            align:"center",
            dataIndex: 'glrxm',
            //width: 130
           },
		   {
            title: '关联关系',
            align:"center",
            dataIndex: 'glgx_dictText'
           },
		   {
            title: '关联人工作单位',
            align:"center",
            dataIndex: 'glrgzdw',
            scopedSlots: {customRender: 'glrgzdw'},
            width: 300
           },
		   {
            title: '关联人联系电话',
            align:"center",
            dataIndex: 'glrlxdh'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: 150,
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkkhglrgl/dkkhglrgl/list",
          delete: "/dkkhglrgl/dkkhglrgl/delete",
          deleteBatch: "/dkkhglrgl/dkkhglrgl/deleteBatch",
          exportXlsUrl: "dkkhglrgl/dkkhglrgl/exportXls",
          importExcelUrl: "dkkhglrgl/dkkhglrgl/importExcel",
          init: "/dkkhglrgl/dkkhglrgl/init",
          exportTemplateUrl: "/dkkhglrgl/dkkhglrgl/exportTemplateXls",
       },
        exportTemplateName: '贷款客户关联人管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },

      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {jkrzjhm: record.jkrzjhm,glrzjhm:record.glrzjhm}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      init(){
        this.loading=true;
        putAction(this.url.init).then((response)=>{
          if(response.success){
            this.$message.success('提取成功！')
            this.loadData(1)
          }else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) => {
          this.$message.error('提取失败！')
        }).finally(()=>{
          this.loading=false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>