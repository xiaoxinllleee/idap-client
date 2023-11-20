<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,YWJGDM" pid-field="sjywjgdm" tree-node-filter-prop="title"
                           :sszh="true" :show-search="true" :tree-default-expand-all="true" :filter-tree-node="true" :is-all="isAll"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"></a-input>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户名称">
            <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"></j-input>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="jx_khlx"/>
          </a-form-item></a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="存款余额"><a-input-group compact>
              <a-input-number v-model="queryParam.ckye_begin" :min="0" style="width: 45%;text-align: center;"/>
              <a-input placeholder="~" style="text-align: center;width: 10%;border-left: 0;pointer-events: none;background-color: #FFF;" disabled/>
              <a-input-number v-model="queryParam.ckye_end" :min="0" style="width: 45%;text-align: center;border-left: 0;"/>
            </a-input-group></a-form-item></a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="存款月日平"><a-input-group compact>
              <a-input-number v-model="queryParam.ckrpye_begin" :min="0" style="width: 45%;text-align: center;"/>
              <a-input placeholder="~" style="text-align: center;width: 10%;border-left: 0;pointer-events: none;background-color: #FFF;" disabled/>
              <a-input-number v-model="queryParam.ckrpye_end" :min="0" style="width: 45%;text-align: center;border-left: 0;"/>
            </a-input-group></a-form-item></a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="存款年日平"><a-input-group compact>
              <a-input-number v-model="queryParam.cknrpye_begin" :min="0" style="width: 45%;text-align: center;"/>
              <a-input placeholder="~" style="text-align: center;width: 10%;border-left: 0;pointer-events: none;background-color: #FFF;" disabled/>
              <a-input-number v-model="queryParam.cknrpye_end" :min="0" style="width: 45%;text-align: center;border-left: 0;"/>
            </a-input-group></a-form-item></a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchQueryByUrl(url.listAll)" v-has="'ckkhxxgl:searchAll'" icon="search" style="margin-left: 8px">查询全部</a-button>
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
      <a-tooltip>
        <template slot="title">
          更新最新的管户人、存款余额日平信息
        </template>
        <a-button @click="handleDataExtraction" icon="area-chart" v-has="'Ckkhxxgl:init'">提取</a-button>
      </a-tooltip>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款客户信息管理')" v-has="'Ckkhxxgl:exp'">导出</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXlsByNameAndUrl('存款客户信息管理', url.exportAllXlsUrl)" v-has="'Ckkhxxgl:expAll'">导出全部</a-button>
      <a-button @click="handleTransfer" icon="export" v-has="'Ckkhxxgl:transfer'">移交</a-button>
      <a-button type="dashed" icon="export" @click="handleCkInventoryClaimExport('存款客户存量认领信息')" v-has="'ckinvenclaim:export'" :loading="exportClrlLoading"> 存量认领导出 </a-button>
      <a-button type="dashed" icon="import" @click="handleCkInventoryClaimImport" v-has="'ckinvenclaim:import'"> 存量认领导入 </a-button>
      <a-button type="dashed" icon="import" @click="handleCkAccountManagementInport" v-has="'ckaccmanagement:import'"> 管户信息导入 </a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="khbh"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="action" type="primary" slot-scope="text, record">
          <Button type="primary" size="small" @click="handleView(record)" v-has="'Ckkhxxgl:view'">查看</Button>
          <!--<a-divider type="vertical" />
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
    <ckkhxxgl-modal ref="modalForm"></ckkhxxgl-modal>
    <ckkhghyj-modal ref="yjModalForm" @ok="modalFormOk" @close="closeWindow()"></ckkhghyj-modal>
    <!--存量认领导入-->
    <excel-import ref="excelImportClrlModal" @ok="importCkrlComplete"/>
    <!--管户信息导入-->
    <excel-import ref="excelImportGhxxModal" @ok="importGhxxComplete"/>
  </a-card>
</template>

<script>
  import CkkhghyjModal from "./modules/CkkhghyjModal";
  import CkkhxxglModal from "./modules/CkkhxxglModal"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import JInput from "@/components/jeecg/JInput";
  import {downFile, getAction, putAction} from "@/api/manage";
  import store from '@/store/'
  import {mapGetters} from "vuex";
  import {notification} from "ant-design-vue";
  import ExcelImport from '@comp/common/ExcelImport'
  import moment from "moment";

  export default {
    name: "WdyjCkkhghxxbList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      CkkhghyjModal,
      ExcelImport,
      CkkhxxglModal
    },
    data () {
      return {
        description: '存款客户管户信息 管理页面',
        exportClrlLoading: false,
        isAll: false,
        sszh: "",
        userId: "",
        workNo: "",
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 50,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          // {
          //   sorter: true,
          //   title: '机构代码',
          //   align: "center",
          //   dataIndex: 'jgdm'
          // },
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
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          // {
          //   title: '证件类型',
          //   align: "center",
          //   dataIndex: 'zjlx_dictText'
          // },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '联系方式',
            align: "center",
            dataIndex: 'lxfs'
          },
          // {
          //   title: '地址',
          //   align: "center",
          //   dataIndex: 'dz'
          // },
          {
            title: '产品信息',
            align: "center",
            dataIndex: 'cpxx'
          },
          {
            sorter: true,
            title: '存款余额',
            align: "center",
            dataIndex: 'ckye'
          },
          {
            sorter: true,
            title: '存款月日平',
            align: "center",
            dataIndex: 'ckrpye'
          },
          {
            sorter: true,
            title: '存款年日平',
            align: "center",
            dataIndex: 'cknrpye'
          },
          {
            title: '管户人',
            align: "center",
            dataIndex: 'ghr_dictText'
          },
          {
            sorter: true,
            title: '管户比例(%)',
            align: "center",
            dataIndex: 'ghbl'
          },
          // {
          //   title: '录入标志',
          //   align: "center",
          //   dataIndex: 'lrbz_dictText'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/performance/ckkhxxgl/list",
          listAll: "/performance/ckkhxxgl/listAll",
          delete: "/performance/ckkhxxgl/delete",
          deleteBatch: "/performance/ckkhxxgl/deleteBatch",
          exportXlsUrl: "performance/ckkhxxgl/exportXls",
          exportAllXlsUrl: "performance/ckkhxxgl/exportAllXls",
          importExcelUrl: "performance/ckkhxxgl/importExcel",
          extract: "/performance/ckkhxxgl/init",
          rlckkhxxExtract: "/performance/ckkhxxgl/rlckkhxx",
          exportClrlXlsUrl: "performance/ckkhxxgl/exportClrlXls",
          exportClrlTemplateUrl: "performance/ckkhxxgl/exportClrlTemplateXls",
          importClrlExcelUrl: "performance/ckkhxxgl/importClrlExcel",
          exportGhxxTemplateUrl: "performance/ckkhxxgl/exportGhxxTemplateXls",
          importGhxxExcelUrl: "performance/ckkhxxgl/importGhxxExcel",
        },
        exportClrlTemplateName: '存款客户存量认领导入模板',
        exportGhxxTemplateName: '存款客户管户信息导入模板',
        searchAll: false,
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.isAll  = store.getters.isRoot;
      this.sszh   = store.getters.userInfo.orgCode;
      this.userId = store.getters.userInfo.id;
      this.workNo = store.getters.userInfo.workNo;
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),

      /**
       * 数据抽取
       */
      handleDataExtraction: function () {
        var param = {"WorkNo":this.workNo};
        // console.info('param -',param);
        this.loading = true;
        putAction(this.url.extract, param).then((res) => {
          if (res.success) {
            console.info('res -',res);
            this.loadData();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message,5);
          }
        }).finally(() => {
          this.loading = false;
        })
      },
      closeWindow: function () {
        // console.info('closeWindow');
        this.loadData();
      },
      /**
       * 管户移交
       */
      handleTransfer: function () {
        this.$refs.yjModalForm.showModal();
      },
      /**
       * 存款客户信息：存量认领导出
       */
      handleCkInventoryClaimExport: function (fileName) {
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
        putAction(this.url.rlckkhxxExtract, {'jgdm': param.jgdm}).then((res)=>{
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
       * 存款客户信息：存量认领导入
       */
      handleCkInventoryClaimImport: function () {
        let params = {}
        params.exportTemplateUrl = this.url.exportClrlTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importClrlExcelUrl}`
        params.exportTemplateName = this.exportClrlTemplateName+'_'+moment(new Date()).format("YYYYMMDDHHmmss")
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportClrlModal.showModal(param);
      },
      importCkrlComplete (filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath',filePath)
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

        this.loadData(1)
      },
      /**
       * 存款客户信息：管户信息导入
       */
      handleCkAccountManagementInport: function () {
        let params = {}
        params.exportTemplateUrl = this.url.exportGhxxTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importGhxxExcelUrl}`
        params.exportTemplateName = this.exportGhxxTemplateName+'_'+moment(new Date()).format("YYYYMMDDHHmmss")
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportGhxxModal.showModal(param);
      },
      importGhxxComplete (filePath) {
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

        this.loadData(1)
      },
      beforeSearchQuery(url) {
        if (url) {
          //查询全部
          this.searchAll = true
        } else {
          this.searchAll = false
        }
      },
      searchReset () {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        if (this.searchAll) {
          this.loadDataByUrl(1, this.url.listAll)
        } else {
          this.loadData(1);
        }
      },
      handleTableChange (pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field
          this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        if (this.searchAll) {
          this.loadDataByUrl(undefined, this.url.listAll)
        } else {
          this.loadData();
        }
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>