<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属机构代码">
              <j-tree-select placeholder="请选择支行"
                             v-model="queryParam.ssjgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <a-col :md="6" :sm="8">
            <a-form-item label="经度">
              <a-input placeholder="请输入经度" v-model="queryParam.longitude"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="纬度">
              <a-input placeholder="请输入纬度" v-model="queryParam.latitude"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            <!--  <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('经纬度设置')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
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
    <tjfx_kqdkbb_ssjg-modal ref="modalForm" @ok="modalFormOk"></tjfx_kqdkbb_ssjg-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import Tjfx_kqdkbb_ssjgModal from './modules/Tjfx_kqdkbb_ssjgModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import { getAction, downFile } from '@/api/manage'
  export default {
    name: "Tjfx_kqdkbb_ssjgList",
    mixins:[JeecgListMixin],
    components: {
      Tjfx_kqdkbb_ssjgModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
		   {
            title: '所属机构代码',
            align:"center",
            dataIndex: 'ssjgdm_dictText'
           },
		   {
            title: '经度',
            align:"center",
            dataIndex: 'longitude'
           },
		   {
            title: '纬度',
            align:"center",
            dataIndex: 'latitude'
           },
        /*  {
            title: '经度范围',
            align:"center",
            dataIndex: 'jdfw'
          },
          {
            title: '纬度范围',
            align:"center",
            dataIndex: 'wdfw'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/tjfx_kqdkbb_ssjg/tjfx_kqdkbb_ssjg/list",
          delete: "/tjfx_kqdkbb_ssjg/tjfx_kqdkbb_ssjg/delete",
          deleteBatch: "/tjfx_kqdkbb_ssjg/tjfx_kqdkbb_ssjg/deleteBatch",
          exportXlsUrl: "tjfx_kqdkbb_ssjg/tjfx_kqdkbb_ssjg/exportXls",
          importExcelUrl: "tjfx_kqdkbb_ssjg/tjfx_kqdkbb_ssjg/importExcel",
      exportTemplateUrl: "tjfx_kqdkbb_ssjg/tjfx_kqdkbb_ssjg/exportTemplateXls",
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
        params.exportTemplateName = "经纬度设置"
        this.$refs.excelImportModal.showModal(params);
      },
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log("filePath")
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

        this.loadData();
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>