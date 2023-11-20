<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms,zzjc,ywjgdm" pid-field="sjywjgdm" tree-node-filter-prop="title"
                             :sszh="true" :show-search="true" :tree-default-expand-all="true" :filter-tree-node="true" :is-all="isAll"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.hth"></a-input>
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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.khlx" dict-code="cust_type"></j-dict-select-tag>
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
      <a-tooltip>
        <template slot="title">
          从管户流水表同步最新的管户、包收、审批、调查信息
        </template>
        <a-button @click="handleDataExtraction" icon="area-chart" v-has="'Dkkhxxgl:init'">提取</a-button>
      </a-tooltip>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款客户综合信息')" v-has="'Dkkhxxgl:exp'">导出</a-button>
      <a-button @click="handleTransfer(1)" icon="export" v-has="'Dkkhxxgl:ghyj'">管户移交</a-button>
      <a-button @click="handleTransfer(2)" icon="export" v-has="'Dkkhxxgl:bsyj'">包收移交</a-button>
      <a-button type="dashed" icon="export" @click="handleDkInventoryClaimExport('贷款客户存量认领信息')" v-has="'dkinvenclaim:export'" :loading="exportClrlLoading"> 存量认领导出 </a-button>
      <a-button type="dashed" icon="import" @click="handleDkInventoryClaimImport" v-has="'dkinvenclaim:import'"> 存量认领导入 </a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="small"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="{x:3000}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Dkkhxxgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Dkkhxxgl:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <DkkhyjModal ref="yjModalForm" @ok="modalFormOk" @close="closeWindow()"></DkkhyjModal>

    <dkkhxxgl-modal ref="modalForm" @ok="modalFormOk"></dkkhxxgl-modal>
    <!--存量认领导入-->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkkhxxglModal from './modules/DkkhxxglModal'
  import DkkhyjModal from './modules/DkkhyjModal'
  import ExcelImport from '@comp/common/ExcelImport'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import {downFile, putAction} from "@/api/manage";
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import moment from "moment";
  import {notification} from "ant-design-vue";

  export default {
    name: "DkkhxxglList",
    mixins:[JeecgListMixin],
    components: {
      DkkhxxglModal,
      JTreeSelect,
      DkkhyjModal,
      ExcelImport,
    },
    data () {
      return {
        description: '贷款客户（合同）综合信息管理页面',
        toggleSearchStatus: true,
        exportClrlLoading: false,
        isAll: false,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户编号',
            align: "center",
            dataIndex: 'khbh'
          },
          {
            title: '合同号',
            align: "center",
            dataIndex: 'hth'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          // {
          //   title: '证件类型',
          //   align:"center",
          //   dataIndex: 'zjlx'
          // },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180,
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '合同金额',
            align: "center",
            dataIndex: 'htje'
          },
          {
            title: '合同余额',
            align: "center",
            dataIndex: 'htye'
          },
          {
            title: '最早合同发放日期',
            align: "center",
            dataIndex: 'zzhtffrq',
            width: 130,
          },
          {
            title: '最早合同到期日期',
            align: "center",
            dataIndex: 'zzhtdqrq',
            width: 130,
          },
          {
            title: '合同发放日期',
            align: "center",
            dataIndex: 'htffrq',
            width: 120,
          },
          {
            title: '合同到期日期',
            align: "center",
            dataIndex: 'htdqrq',
            width: 120,
          },
          {
            title: '产品信息',
            align: "center",
            dataIndex: 'cpxx'
          },
          {
            title: '营销人',
            align: "center",
            dataIndex: 'yxr_dictText'
          },
          {
            title: '营销比例',
            align: "center",
            dataIndex: 'yxbl'
          },
          {
            title: '管户人',
            align: "center",
            dataIndex: 'ghr_dictText'
          },
          {
            title: '管户比例',
            align: "center",
            dataIndex: 'ghbl'
          },
          {
            title: '包收人',
            align: "center",
            dataIndex: 'bsr_dictText'
          },
          {
            title: '包收比例',
            align: "center",
            dataIndex: 'bsbl'
          },
          {
            title: '审批人',
            align: "center",
            dataIndex: 'spr_dictText'
          },
          {
            title: '审批比例',
            align: "center",
            dataIndex: 'spbl'
          },
          {
            title: '调查人',
            align: "center",
            dataIndex: 'dcr_dictText'
          },
          {
            title: '调查比例',
            align: "center",
            dataIndex: 'dcbl'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 150,
          },
          //暂时去掉操作
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: {customRender: 'action'},
          //   fixed: 'right',
          //   width: 130,
          // }
        ],
        url: {
          list: "/dkkhzhxx/dkkhxxgl/list",
          delete: "/dkkhzhxx/dkkhxxgl/delete",
          deleteBatch: "/dkkhzhxx/dkkhxxgl/deleteBatch",
          exportXlsUrl: "dkkhzhxx/dkkhxxgl/exportXls",
          extract: "/dkkhzhxx/dkkhxxgl/extract",
          rldkkhxxExtract: "/dkkhzhxx/dkkhxxgl/rldkkhxx",
          exportClrlXlsUrl: "dkkhzhxx/dkkhxxgl/exportClrlXls",
          exportClrlResultXlsUrl: "dkkhzhxx/dkkhxxgl/exportClrlResultXls",
          exportClrlTemplateUrl: "dkkhzhxx/dkkhxxgl/exportClrlTemplateUrl",
          importExcelUrl: "dkkhzhxx/dkkhxxgl/importExcel",
        },
        exportClrlTemplateName: '贷款客户存量认领导入模板',
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      ...mapGetters(["nickname", "avatar", "userInfo"]),
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.beforeSearchQuery()
        this.loadData(1);
      },
      /**
       * 数据抽取
       */
      handleDataExtraction: function () {
        //var param = {"WorkNo":this.workNo};
        // console.info('param -',param);
        this.loading = true;
        putAction(this.url.extract).then((res) => {
          if (res.success) {
            console.info('res -', res);
            this.loadData();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message, 5);
          }
        }).finally(() => {
          this.loading = false;
        })
      },

      handleTransfer: function (val) {
        this.$refs.yjModalForm.showModal(val, this.queryParam);
      },
      closeWindow: function () {
        // console.info('closeWindow');
        this.loadData();
      },
      /**
       * 存量认领导出
       */
      handleDkInventoryClaimExport: function (fileName) {
        fileName = fileName+"_"+moment(new Date()).format("YYYYMMDDHHmmss")
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = this.getQueryParams();
        if (param.jgdm === null || param.jgdm === undefined) {
          notification.error({message: '系统提示', description: '请选择所属机构!', duration: 4})
          return false
        }
        console.info('当前选择所属机构', param.jgdm)
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        this.exportClrlLoading = true
        notification.info({message: '系统提示', description: '数据正在准备，请稍等!', duration: 4})
        putAction(this.url.rldkkhxxExtract, {'jgdm': param.jgdm}).then((res)=>{
          if (res.success) {
            notification.success({message: '系统提示', description: '数据准备完成，正在导出！', duration: 4})
            downFile(this.url.exportClrlXlsUrl, param).then((data) => {
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
          }
        }).catch((error)=>{
          console.error('数据提取失败，请联系系统管理员！',error)
          notification.error({message: '系统提示', description: '数据准备失败，请联系系统管理员！', duration: 4})
        }).finally(()=>{
          this.exportClrlLoading = false
        })
      },
      /**
       *
       */
      handleDkInventoryClaimImport: function () {
        let params = {}
        params.exportTemplateUrl = this.url.exportClrlTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
        params.exportTemplateName = this.exportClrlTemplateName+'_'+moment(new Date()).format("YYYYMMDDHHmmss")
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      },
      importComplete (filePath) {
        let fileName = '贷款客户存量认领导入结果'
        let param = this.getQueryParams();
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        downFile(this.url.exportClrlResultXlsUrl, param).then((data) => {
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
        this.loadData(1)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>