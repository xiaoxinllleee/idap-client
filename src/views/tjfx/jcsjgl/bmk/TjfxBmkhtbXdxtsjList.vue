<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf" placeholder="请选择统计月份"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
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
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="卡号">
                <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('1')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
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

        <span slot="jgdm_dictText" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxBmkhtbXdxtsj-modal ref="modalForm" @ok="modalFormOk"></tjfxBmkhtbXdxtsj-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import TjfxBmkhtbXdxtsjModal from './modules/TjfxBmkhtbXdxtsjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import {downFile} from '@/api/manage'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "TjfxBmkhtbXdxtsjList",
    mixins:[JeecgListMixin],
    components: {
      TjfxBmkhtbXdxtsjModal,ExcelImport,JEllipsis,JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            width: 100,
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm_dictText',
            scopedSlots: { customRender: 'jgdm_dictText' }
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
            title: '卡号',
            align:"center",
            dataIndex: 'kh'
          },
          {
            title: '合同开始日期',
            align:"center",
            dataIndex: 'htksrq'
          },
          {
            title: '合同到期日期',
            align:"center",
            dataIndex: 'htdqrq'
          },
          {
            title: '合同金额',
            align:"center",
            dataIndex: 'htje'
          },
          {
            title: '合同可用金额',
            align:"center",
            dataIndex: 'htkyje'
          },
          {
            title: '业务品种',
            align:"center",
            dataIndex: 'ywpz_dictText',
          },
          {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr_dictText'
          },
          {
            title: '关联责任人',
            align:"center",
            dataIndex: 'glzrr_dictText'
          },
          {
            title: '合同状态',
            align:"center",
            dataIndex: 'htzt'
          },
        ],
        url: {
          list: "/TjfxBmkhtbXdxtsj/tjfxBmkhtbXdxtsj/list",
          delete: "/TjfxBmkhtbXdxtsj/tjfxBmkhtbXdxtsj/delete",
          deleteBatch: "/TjfxBmkhtbXdxtsj/tjfxBmkhtbXdxtsj/deleteBatch",
          exportXlsUrl: "TjfxBmkhtbXdxtsj/tjfxBmkhtbXdxtsj/exportXls",
          importExcelUrl: "TjfxBmkhtbXdxtsj/tjfxBmkhtbXdxtsj/importExcel",
          exportTemplateUrl: "TjfxBmkhtbXdxtsj/tjfxBmkhtbXdxtsj/exportTemplateXls",
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
        //获取查询条件
        let sqp = {}
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf = tjyfMoment;
        return filterObj(param);
      },
      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = '信贷系统便民卡数据导入'
        this.$refs.excelImportModal.showModal(params)
      },
      searchReset: function() {
        this.queryParam = {}
        this.loadData(1);
      },
      importComplete(filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath')
        console.log(filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })

        this.loadData()
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>