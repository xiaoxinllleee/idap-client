<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织简称">
              <j-input placeholder="请输入组织简称" v-model="queryParam.zzjc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构代码">
              <a-input placeholder="请输入业务机构代码" v-model="queryParam.ywjgdm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="业务机构标识">
                <j-dict-select-tag v-model="queryParam.ywjgbz" placeholder="请选择业务机构标识" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="组织类别">
                <j-dict-select-tag v-model="queryParam.zzlb" placeholder="请选择组织类别" dictCode="zzlb"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="组织级别">
                <j-dict-select-tag v-model="queryParam.zzjb" placeholder="请选择组织级别" dictCode="zzjb"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'zzjggl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('组织机构信息')" v-has="'zzjggl:export'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'zzjggl:import'">导入</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel" v-has="'zzjggl:delete'"><a-icon type="delete"/>删除</a-menu-item>
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
        rowKey="zzbz"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="detail" slot-scope="zzjc, record">
          <a @click="handleView(record)">{{zzjc}}</a>
        </span>
        <span slot="qybzTag" slot-scope="text, record">
          <a-tag v-if="record.qybz=='1'" color="blue">
            {{record.qybz_dictText}}
          </a-tag>
          <a-tag v-else-if="record.qybz=='2'" color="pink">
            {{record.qybz_dictText}}
          </a-tag>
        </span>
        <span slot="ywjgbzTag" slot-scope="text, record">
          <a-tag v-if="record.ywjgbz=='1'" color="blue">
            {{record.ywjgbz_dictText}}
          </a-tag>
          <a-tag v-else-if="record.ywjgbz=='2'" color="pink">
            {{record.ywjgbz_dictText}}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'zzjggl:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zzbz)">
            <a v-has="'zzjggl:delete'">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hrBasOrganization-modal ref="modalForm" @ok="modalFormOk"></hrBasOrganization-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>


  </a-card>
</template>

<script>
  import HrBasOrganizationModal from './modules/HrBasOrganizationModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "HrBasOrganizationList",
    mixins:[JeecgListMixin],
    components: {
      HrBasOrganizationModal,JTreeSelect,JDictSelectTag,ExcelImport,JInput
    },
    data () {
      return {
        description: 'hr管理页面',
        exportTemplateName : '组织信息导入模板',
        // 表头
        columns: [
		      {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.zzbz - b.zzbz,
          },
          {
            title: '业务机构代码',
            align:"center",
            dataIndex: 'ywjgdm'
          },
		      {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzmc'
          },
          {
            title: '组织简称',
            align:"center",
            dataIndex: 'zzjc',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '上级组织名称',
            align:"center",
            dataIndex: 'sjzzbz_dictText'
          },
		      {
            title: '组织类别',
            align:"center",
            dataIndex: 'zzlb_dictText'
          },
		      {
            title: '组织级别',
            align:"center",
            dataIndex: 'zzjb_dictText'
          },
		      {
            title: '启用标识',
            align:"center",
            dataIndex: 'qybz_dictText',
            scopedSlots: { customRender: 'qybzTag' },
          },
          {
            title: '业务机构标识',
            align:"center",
            dataIndex: 'ywjgbz_dictText',
            scopedSlots: { customRender: 'ywjgbzTag' },
          },
		      {
            title: '业务机构类型',
            align:"center",
            dataIndex: 'ywjglx_dictText'
          },
		      {
            title: '排序序号',
            align:"center",
            dataIndex: 'pxxh'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: '120px'
          }
        ],
        isorter: {
          order: 'desc',
        },
		    url: {
          list: "/sys/hrBasOrganization/list",
          delete: "/sys/hrBasOrganization/delete",
          deleteBatch: "/sys/hrBasOrganization/deleteBatch",
          exportXlsUrl: "sys/hrBasOrganization/exportXls",
          importExcelUrl: "sys/hrBasOrganization/importExcel",
          exportTemplateUrl: "sys/hrBasOrganization/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {

      /*excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "组织信息导入模板"
        this.$refs.excelImportModal.showModal(params);
      },*/
      /*importComplete(filePath) {
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
      },*/
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>