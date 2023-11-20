<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                           pidField="sjzzbz" :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-input placeholder="请输入营销单元名称" v-model="queryParam.ssyxdy"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属客户经理">
            <j-input placeholder="请输入客户经理名称" v-model="queryParam.sskhjl"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.khxm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" ><span style="float: left; overflow: hidden;" class="table-page-search-submitButtons">
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('1')">导出</a-button>
      <!--<a-button type="primary" icon="import">导入</a-button>-->
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
      <a-button @click="handleAddUserDepart" type="primary" icon="plus">转移</a-button>
      <a-button @click="handleCustomerHandover" type="primary" icon="block">支行交接</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="dele(record)"><a-icon type="delete"/>删除</a-menu-item>
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
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="dele(record)">删除</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khgl_khglgx-modal ref="modalForm" @ok="modalFormOk"/>
    <khglgx-khjj-modal ref="khjjModalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <Select-User-Modal ref="selectUserModal" @reset="Reset"/>
  </a-card>
</template>

<script>
  import Khgl_khglgxModal from './modules/Khgl_khglgxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from '../../../components/jeecg/JInput'
  import { getAction, downFile ,putAction} from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import SelectUserModal from './SelectUserModal'
  import KhglgxKhjjModal from './modules/KhglgxKhjjModal'

  export default {
    name: "Khgl_khglgxList",
    mixins:[JeecgListMixin],
    components: {
      KhglgxKhjjModal,
      JInput,
      Khgl_khglgxModal,
      ExcelImport,
      JTreeSelect,
      SelectUserModal
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
          /*{
            title: '所属营销单元编码',
            align:"center",
            dataIndex: 'ssyxdy'
          },*/
          {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy_dictText'
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText'
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/khglgx/khgl_khglgx/list",
          delete: "/khglgx/khgl_khglgx/delete",
          deleteBatch: "/khglgx/khgl_khglgx/deleteBatch",
          exportXlsUrl: "khglgx/khgl_khglgx/exportXls",
          importExcelUrl: "khglgx/khgl_khglgx/importExcel",
          exportTemplateUrl: "khglgx/khgl_khglgx/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "客户关联关系导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log(filePath)
        downFile("/sys/common/download/" + filePath,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
        this.loadData(1);
      },
      dele(record){
        if(confirm("确定要删除吗?")){
          putAction("/khglgx/khgl_khglgx/dele",{"zjhm":record.zjhm}).then((res) => {
            this.loadData(1);
          });
        }
      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      handleAddUserDepart() {
        this.$refs.selectUserModal.visible = true;
        this.$refs.selectUserModal.ceshi();
        this.loadData(1);
      },
      handleCustomerHandover() {
        this.$refs.khjjModalForm.title="支行客户交接";
        this.$refs.khjjModalForm.visible = true;
        this.$refs.khjjModalForm.ceshi();
        this.loadData(1);
      },
      Reset(){
        this.loadData();
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>