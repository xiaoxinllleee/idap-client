<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-month-picker placeholder="请选择" v-model="queryParam.dataDate" style="width: 100%;" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择开户机构" v-model="queryParam.branchNo" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true">
              </j-tree-select>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账号">
                <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="户名">
                <j-input placeholder="模糊查询" v-model="queryParam.custName" type="likemore"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="第一责任人">
                <j-dict-select-tag placeholder="请输入第一责任人姓名" v-model="queryParam.dyzrr" dict-code="hr_bas_staff,ygxm,yggh" :showSearch="true" ><!--dict-code="hr_bas_staff,ygxm,yggh||ygxm"-->
                </j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="主客户经理">
                <j-dict-select-tag placeholder="请输入主客户经理姓名" v-model="queryParam.zkhjl" dict-code="hr_bas_staff,ygxm,yggh" :showSearch="true" ><!--dict-code="hr_bas_staff,ygxm,yggh||ygxm"-->
                </j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
              </a-form-item>
            </a-col>
            <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款类型">
                <j-dict-select-tag placeholder="请选择贷款类型" v-model="queryParam.dklx" dict-code="yxbldklx"></j-dict-select-tag>
              </a-form-item>
            </a-col>-->
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="最后交易日">
                <a-date-picker placeholder="请选择最后交易日" v-model="queryParam.lstFinDt" style="width: 100%;"/>
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
      <!--<a-button @click="handleExtraction" type="primary" icon="plus" v-has="'qbqxmx:extraction'">数据抽取</a-button>-->
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('欠本欠息信息')" v-has="'qbqxdjb:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel" v-has="'qbqxdjb:import'">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button type="primary" icon="import" @click="excelImport" v-has="'qbqxdjb:import'">导入</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="small"
               bordered
               :rowKey="rowKey"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{x:3000,y:500}"
               @change="handleTableChange">
        <span slot="xh" slot-scope="text"><j-ellipsis :value="text" :length="6"></j-ellipsis>
        </span>
        <span slot="branchName" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis>
        </span>
        <span slot="custName" slot-scope="text"><j-ellipsis :value="text" :length="12"></j-ellipsis>
        </span>
        <span slot="identNo" slot-scope="text"><j-ellipsis :value="text" :length="20"></j-ellipsis>
        </span>
        <span slot="acctNo" slot-scope="text"><j-ellipsis :value="text" :length="20"></j-ellipsis>
        </span>
<!--        <span slot="dklx" slot-scope="dklx">-->
<!--          <a-tag :key="dklx" :color="dklx==='普通贷款'?'#FB6241':dklx==='按揭贷款'?'#8A2BE2':'white'">-->
<!--            {{ dklx }}-->
<!--          </a-tag>-->
<!--        </span>-->
<!--        <span slot="ztbs" slot-scope="ztbs">-->
<!--          <a-tag :key="ztbs" :color="ztbs==='未结清'?'#FF2A17':ztbs==='已结清'?'#38D267':'white'">-->
<!--            {{ ztbs }}-->
<!--          </a-tag>-->
<!--        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import JInput from "@/components/jeecg/JInput";
  import {downFile, getAction, postAction} from "@/api/manage";
  import notification from 'ant-design-vue/es/notification'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import moment from "moment"
  import {filterObj} from "@/utils/util";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "DkQbqxdjbList",
    mixins:[JeecgListMixin],
    components: {JEllipsis, JInput, JTreeSelect, ExcelImport},
    data () {
      return {
        description: '贷款欠本欠息登记薄管理页面',
        dateFormat: 'YYYY-MM',
        // 表头
        columns: [
          {
            title: '数据日期',
            align: "center",
            dataIndex: 'dataDate',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 10) : text)
            },
            width: 95,
          },
          {
            title: '序号',
            align: "center",
            dataIndex: 'xh',
            scopedSlots: { customRender: 'xh' },
            width: 85,
          },
          {
            title: '开户机构号',
            align: "center",
            dataIndex: 'branchNo',
            width: 95,
          },
          {
            title: '开户机构名称',
            align: "center",
            dataIndex: 'branchNo_dictText',
            width: 105,
            scopedSlots: { customRender: 'branchName' },
          },
          {
            title: '户名',
            align: "center",
            dataIndex: 'custName',
            scopedSlots: { customRender: 'custName' },
            width: 200,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'identNo',
            scopedSlots: { customRender: 'identNo' },
            width: 180,
          },
          {
            title: '账号',
            align: "center",
            dataIndex: 'acctNo',
            scopedSlots: { customRender: 'acctNo' },
            width: 180,
          },
          {
            title: '最后交易日',
            align: "center",
            dataIndex: 'lstFinDt',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 10) : text)
            },
          },
          {
            title: '贷款余额(元)',
            align: "center",
            dataIndex: 'currBal',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '期数',
            align: "center",
            dataIndex: 'qs'
          },
          {
            title: '结欠本金(元)',
            align: "center",
            dataIndex: 'jqbj',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '结欠利息(元)',
            align: "center",
            dataIndex: 'jqlx',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '结欠罚息(元)',
            align: "center",
            dataIndex: 'jqfx',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '第一责任人',
            align: "center",
            dataIndex: 'dyzrr_dictText'
          },
          {
            title: '主客户经理',
            align: "center",
            dataIndex: 'zkhjl_dictText'
          },
          {
            title: '贷款类型',
            align: "center",
            dataIndex: 'dklx_dictText',
            /*scopedSlots: { customRender: 'dklx' },*/
          },
          {
            title: '计息起始日',
            align: "center",
            dataIndex: 'jxqsr',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 10) : text)
            },
          },
          {
            title: '计息终止日',
            align: "center",
            dataIndex: 'jxzzr',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 10) : text)
            },
          },
          {
            title: '欠息次数',
            align: "center",
            dataIndex: 'qxcs'
          },
          /*{
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },*/
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          /*{
            title: '状态标识',
            align: "center",
            dataIndex: 'ztbs_dictText',
            scopedSlots: { customRender: 'ztbs' },
            fixed: 'right',
            width: 150
          },*/
        ],
        url: {
          list: "/yxbldkgl/dkqbqxdjb/list",
          //Extraction: "/yxbldkgl/dkqbqxdjb/extraction",
          exportXlsUrl: "yxbldkgl/dkqbqxdjb/exportXls",
          importExcelUrl: "yxbldkgl/dkqbqxdjb/importExcel",
          exportTemplateUrl: "yxbldkgl/dkqbqxdjb/exportTemplateXls",
        },
        exportTemplateName: '贷款欠本欠息登记薄导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      moment,

      getCurrentMonth() {
        this.queryParam = {
          dataDate: undefined
        }
        this.queryParam.dataDate = moment(this.getCurrentDataFront()).format(this.dateFormat)
        console.info('默认当前日期:',this.queryParam.dataDate)
      },

      getCurrentDataFront () {
        var date = new Date()
        date.setDate(21)
        var month = parseInt(date.getMonth() + 1)
        var day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        console.log('year',date.getFullYear(),'month',month,'day',day)
        const time = date.getFullYear() + '-' + month + '-' + day
        return time
      },

      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();
        if (params.dataDate !== undefined && params.dataDate !== null && params.dataDate !== '') {
          params.dataDate = moment(params.dataDate).format(this.dateFormat)+'-21'
        }
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            this.dataSource = [];
            this.ipagination.total = 0;
            this.loading = false;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },

      getQueryParams() {
        let datadatemoment = '';
        if (this.queryParam.dataDate) {
          datadatemoment = moment(this.queryParam.dataDate).format(this.dateFormat)+'-21'
        }
        let lstFinDt = '';
        if (this.queryParam.lstFinDt) {
          lstFinDt = moment(this.queryParam.lstFinDt).format("YYYY-MM-DD")
        }
        var param      = Object.assign({},this.queryParam,this.isorter)
        param.field    = this.getQueryField()
        param.pageNo   = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (param.dataDate) {
          param.dataDate = datadatemoment
        }
        if (param.lstFinDt) {
          param.lstFinDt = lstFinDt
        }
        return filterObj(param)
      },

      searchReset() {
        this.queryParam = {
          dataDate: undefined
        }
        this.getCurrentMonth()
        this.loadData(1)
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = Object.assign({}, this.queryParam)
        let dataDate = ''
        if (param.dataDate !== undefined && param.dataDate !== null && param.dataDate !== '') {
          dataDate = moment(param.dataDate).format(this.dateFormat)+'-21'
        }
        param.dataDate = dataDate;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        param.paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        console.log('下载参数:', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            notification.error({message: '系统提示', descriptions: '文件下载失败！', duration: 4})
            return
          }
          console.log('handleExportXls data:', data)
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },

      importComplete (filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath:', filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            notification.error({message: '系统提示', descriptions: '文件下载失败！', duration: 4})
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
        // TDDO-因导入效率原因，此处在导入完成以后进行数据去重: 根据数据日期、账号、期数
        this.loadData(1)
      },

      // handleExtraction() {
      //   var params = this.getQueryParams();
      //   if (!params.tjyf) {
      //     notification.warning({message: '系统提示', description: '请选择统计月份！', duration: 4})
      //     return
      //   }
      //   this.loading = true
      //   postAction(this.url.Extraction,{'tjyf': params.tjyf}).then((res) => {
      //     if (res.success) {
      //       notification.success({message: '系统提示', description: '提取成功！', duration: 4})
      //     } else {
      //       notification.warning({message: '系统提示', description: '提取失败！[INFO] '+res.message, duration: 4})
      //     }
      //   }).catch((error) => {
      //     notification.error({message: '系统提示', description: '提取失败！[ERROR] '+error, duration: 4})
      //   }).finally(() => {
      //     this.loading = false
      //   })
      // },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>