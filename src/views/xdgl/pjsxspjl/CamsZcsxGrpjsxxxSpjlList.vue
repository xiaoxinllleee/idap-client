<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                             pidField="sjzzbz"
                             :tree-default-expand-all="true" treeNodeFilterProp="title" :filterTreeNode="true"
                             :isAll="isAll"></j-tree-select>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属网格">
              <JTreeSelectNotJg placeholder="请选择所属网格"
                                v-model="queryParam.qydm"
                                treeNodeFilterProp="title"
                                pidField="PARENT_ID"
                                dict="YXDYGL_MAIN,WGMC,ID"
                                pidValue="0"
                                :showSearch="true"
                                :treeDefaultExpandAll="true"/>
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
          <template v-if="toggleSearchStatus">

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="审批时间大于">
                <a-date-picker @change="dateChange" format="yyyy" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button icon="download" :loading="exportLoadingNs" @click="dcnsb()">导出年审表</a-button>-->

      <a-button icon="download" :loading="exportLoading" @click="handleExportXlsByUrl()" v-has="'CamsZcsxGrpjsxxxSpjl:xxcjb'">导出信息采集表
      </a-button>

      <a-button icon="download" :loading="exportLoadingKd" @click="handleExportXlsELaon()" v-has="'CamsZcsxGrpjsxxxSpjl:hnkd'">导出惠农快贷
      </a-button>

      <a-button icon="download" :loading="exportLoadingXd" @click="xdcjb()" v-has="'CamsZcsxGrpjsxxxSpjl:xdxx'">导出信贷信息</a-button>

      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel" v-has="'CamsZcsxGrpjsxxxSpjl:nsp'">
        <a-button icon="import">导入年审表</a-button>
      </a-upload>

      <a-tooltip  title="批量风控查询，1年内只能查询2次，每次间隔需要超过3个月" v-has="'CamsZcsxGrpjsxxxSpjl:plfkcx'">
        <a-button  :loading="batchQueryQxfkLoading"  @click="batchQueryQxfk()">批量风控查询</a-button>
      </a-tooltip>

    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        size="small"
        ref="table"
        bordered
        rowKey="spid"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 1200 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" @click="xybg(record)" v-has="'CamsZcsxGrpjsxxxSpjl:yxbg'"> 信用报告 </a-button>
          <a-divider type="vertical" />
           <a-tooltip  title="风控查询需要20秒左右时间，1年内只能查询2次，每次间隔需要超过3个月" v-has="'CamsZcsxGrpjsxxxSpjl:fkcx'">
              <a-button type="primary" size="small" :loading="loadFx" @click="qxfkQuery(record)"> 风控查询 </a-button>
           </a-tooltip>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="downcjxx(record)" v-has="'CamsZcsxGrpjsxxxSpjl:xzsxb'"> 下载授信表 </a-button>
<!--          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="wordEdit(record)"> 小额农贷 </a-button>-->
<!--          <a-divider type="vertical" />-->
<!--          <a-button type="primary" size="small" @click="pmkEdit(record)"> 便民卡</a-button>-->
          <a-divider type="vertical" />
          <a-dropdown>
             <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
             <a-menu slot="overlay">
                 <a-menu-item @click="wordEdit(record)" v-has="'CamsZcsxGrpjsxxxSpjl:xend'">小额农贷</a-menu-item>
                 <a-menu-item @click="pmkEdit(record)" v-has="'CamsZcsxGrpjsxxxSpjl:bmk'">便民卡</a-menu-item>
                 <a-menu-item @click="ViewXxxx(record)" v-has="'CamsZcsxGrpjsxxxSpjl:xq'">详情</a-menu-item>
                 <a-menu-item @click="view(record)" v-has="'CamsZcsxGrpjsxxxSpjl:ylwj'">预览文件</a-menu-item>
                 <a-menu-item @click="down(record)" v-has="'CamsZcsxGrpjsxxxSpjl:xzwj'">下载文件</a-menu-item>
                 <a-menu-item @click="downht(record)" v-has="'CamsZcsxGrpjsxxxSpjl:xzht'">下载合同</a-menu-item>
               <!--<a-button type="primary" icon="file-word"  @click="view(record)">-->
             </a-menu>
           </a-dropdown>
          <!--<a-divider type="vertical" />
          <a-button type="primary" icon="file-word"  @click="view(record)">
          预览
          </a-button>
          <a-divider type="vertical" />
          <a-button type="primary" icon="download"  @click="down(record)">
          下载
          </a-button>
          <a-divider type="vertical" />
          <a-button type="primary" icon="download"  @click="downcjxx(record)">
          下载授信表
          </a-button>-->

        </span>
        <span slot="detail" slot-scope="riskLevel,record">
            <a @click="qkfkView(record)">{{riskLevel}}</a>
          </span>
        <span slot="updateKhmc" slot-scope="khmc,record">
            <a @click="updateKhmc(record)">{{khmc}}</a>
          </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <grkhpjsx-modal ref="xqmodalForm" @ok="modalFormOk"></grkhpjsx-modal>
    <word-supplement ref="wordForm"></word-supplement>
    <pmk ref="pmkForm"></pmk>
    <report ref="report"></report>

    <a-modal v-model:visible="visible" title="修改客户名称" @ok="handleKhmc">
      <input v-model="updateKhmcxx"></input>
    </a-modal>


<!--    <a-modal v-model:visible="visible2" title="风控详情" @ok="handleQxJson" width="800px" length="800px">-->
<!--      <a-textarea  v-model="qxJson" :autosize="{ minRows: 5, maxRows: 20 }"></a-textarea>-->
<!--    </a-modal>-->

    <qxfk-pdf-img-xq ref="xqModal"></qxfk-pdf-img-xq>
  </a-card>
</template>

<script>
  import WordSupplement from './modules/WordSupplement'
  import pmk from './modules/pmk'
  import { JeecgListMixin } from '../../../mixins/JeecgListMixin'
  import { getAction, getActionOther, putAction, downFile } from '@api/manage'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import GrkhpjsxModal from '@/views/xdgl/grkhpjsx/modules/GrkhpjsxModal'
  import Report from '@/views/xyjlcx/xybg/xybgcx/module/report'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import QxfkPdfImgXq from '../../khgl/qxfk/modules/QxfkPdfImgXq'

  export default {
    name: 'CamsZcsxGrpjsxxxSpjlList',
    mixins: [JeecgListMixin],
    components: {
      WordSupplement, JTreeSelect, pmk, GrkhpjsxModal,Report,JTreeSelectNotJg,QxfkPdfImgXq
    },
    data () {
      return {
        description: '小额农贷-已审批',
        isAll: false,
        exportLoadingNs: false,
        exportLoadingKd: false,
        exportLoadingXd: false,
        visible:false,
        visible2:false,
        qxJson:'',
        // 表头
        columns: [

          {
            title: '申请日期',
            align: 'center',
            dataIndex: 'sqrq',
            customRender: function (text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }
          },
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'sszh_dictText'
          },
          {
            title: '所属网格',
            align: 'center',
            dataIndex: 'qydm_dictText'
          },

          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'updateKhmc' }
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm',
            width: 160
          },
          {
            title: '申请人',
            align: 'center',
            dataIndex: 'sqr'
          },
          {
            title: '评定等级',
            align: 'center',
            dataIndex: 'zzpddj'
          },
          {
            title: '授信额度',
            align: 'center',
            dataIndex: 'zzsxed'
          },
          {
            title: '表内不良贷款',
            align: 'center',
            dataIndex: 'bldkye'
          },{
            title: '表外不良贷款',
            align: 'center',
            dataIndex: 'bwbldkye'
          },
          ,{
            title: '逾期次数',
            align: 'center',
            dataIndex: 'yqcs'
          },
          {
            title: '七星风控建议',
            align: 'center',
            dataIndex: 'riskLevel',
            /*scopedSlots: { customRender: 'detail' }*/
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
            width: 360
          }
        ],
        url: {
          list: '/xdgl/pjsxspjl/camsZcsxGrpjsxxxSpjl/list',
          exportXlsUrl2: 'xdgl/grkhpjsx/downloadAlreadyApprovalYearAudit',
          exportXlsUrl3: 'xdgl/grkhpjsx/farmerRankInfo',
          commXls: 'xdgl/pjsxspjl/camsZcsxGrpjsxxxSpjl/downloadAlreadyApprovalYearAudit',
          dcxxcjb:'/xdgl/grkhpjsx/downloadAlreadyApprovalYearAuditParams',
          eLoanXls: 'xdgl/grkhpjsx/eLoan',
          eLoanParams: 'xdgl/grkhpjsx/downloadELoanParams',
          xdcjbParams: 'xdgl/grkhpjsx/xdcjbParams',
          zipUrl: 'xdgl/grkhpjsx/infoWord',
          importExcelUrl: 'xdgl/pjsxspjl/camsZcsxGrpjsxxxSpjl/importExcel'
        },
        loadFx:false,
        batchQueryQxfkLoading:false,
        updateZjhm:'',
        updateKhmcxx:'',
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created () {
      this.isAll = store.getters.isRoot
    },
    methods: {
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      initQueryParams () {
        if (!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
      },
      searchReset: function () {
        this.queryParam = {}
        if (!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1)
      },
      dateChange (date, dateString) {
        console.log(dateString)
        this.queryParam.yj = dateString.substring(0, 4)
      },
      qxfkQuery(val){
        this.loadFx = true
        getAction("/qxfk/qxfkPdfImg/queryQxfk",{zjhm:val.zjhm,sjhm:val.sjhm,khmc:val.khmc}).then(res=>{
            if (res.success){
              this.loadData();
              this.successInfo("查询成功")
              this.loadFx = false
            }else {
              this.errorInfo(res.message)
              this.loadFx = false
            }
        })
      },
      updateKhmc(val){
        this.updateZjhm = val.zjhm;
        this.visible = true;
      },
      handleKhmc(){
        console.log(this.updateKhmcxx)
        console.log(this.updateZjhm)
        putAction("/xdgl/pjsxspjl/camsZcsxGrpjsxxxSpjl/updateKhmc",{zjhm:this.updateZjhm,khmc:this.updateKhmcxx}).then(res=>{
            if (res.success){
              this.successInfo(res.message)
              this.loadData()
            }else {
              this.errorInfo(res.message)
            }
        })
        this.visible = false;
        this.updateKhmcxx='';
        this.updateZjhm='';
      },

      handleQxJson(){
        this.qxJson = ''
        this.visible2 = false;
      },
      qkfkView(val){
        if (val.riskLevel == null ||val.riskLevel =='' || val.riskLevel == undefined){
          this.$message.warning('未查询到风控数据')
          return
        }

        let formData = {}
        formData.zjhm = val.zjhm
        getAction('/qxfk/qxfkPdfImg/getByRepCode', formData).then((res) => {
          if (res.success) {
            let data = res.result.replace("\\","");
            this.$refs.xqModal.view(data)
          } else {
            this.$message.warning(res.message,5)
          }
        })

        // getAction('/qxfk/qxfkPdfImg/getByZjhm', formData).then((res) => {
        //   if (res.success) {
        //     let url = `${window._CONFIG['staticDomainURL']}/` + res.result.fwlj
        //     console.log(url)
        //     window.open(
        //       `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(url))
        //   } else {
        //     this.$message.warning(res.message,5)
        //   }
        // })
      },
      xybg(val){
        let formData = {}
        formData.bcxrzjhm = val.zjhm
        formData.cxyy = '1'
        getAction('/creditreportquery/query', formData).then((res) => {
          if (res.success){
            let bcxrxx = res.result.bcxrxx;
            let parameters = {
              'bgbh': bcxrxx.bgbh,
              'cxyy': '1',
              'cxyyDictText': '贷款审批',
              'zjhm':val.zjhm,
              'xm':''
            }

            getAction("/creditreportquery/report", parameters).then((res2) => {
              if (res2.success) {
                this.$message.success("客户内部信用记录报告生成成功！")
                let object = res2.result
                this.$refs['report'].cxyy = '1'
                this.$refs['report'].object = object
                this.$refs['report'].init({bgbh:bcxrxx.bgbh,xm:null})
              }
            }).catch((error) => {
              console.info('客户内部信用记录报告生成失败！', error)
              this.$message.error("客户内部信用记录报告生成失败，请联系系统管理员！")
            })
          }
        }).catch((error) => {
          console.info('客户内部信用记录报告生成失败！', error)
          this.$message.error("客户内部信用记录报告生成失败，请联系系统管理员！")
        })
      },
      dcnsb () {
        this.exportLoadingNs = true
        let this_=this;
        window.location.href = `${window._CONFIG['domianURL']}/` + this.url.commXls
        setTimeout(function () {
          this_.exportLoadingNs = false
        }, 3000)
      },

      xdcjb () {
        let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        this.exportLoadingXd = true
        getAction(this.url.xdcjbParams, param).then((res) => {
          if (res.success) {
            window.open(
              `${window._CONFIG['downloadDomainURL']}/` + res.message
            )
          } else {
            this.$message.warning(res.message,5)
          }
        }).finally(res => {
          this.exportLoadingXd = false
        })
      },

      handleExportXlsELaon () {
        let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        this.exportLoadingKd = true
        getAction(this.url.eLoanParams, param).then((res) => {
          //window.location.href = `${window._CONFIG['domianURL']}/`+this.url.eLoanXls
          var fileName = '惠农快贷'
          downFile(this.url.eLoanXls).then((data) => {
            if (!data) {
              this.$message.warning('文件下载失败')
              return
            }
            console.log(data)
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
            this.exportLoadingKd = false
          })
        })
      },

      down (record) {
        let formData = {}
        formData.zjhm = record.zjhm
        formData.hhbm = record.hhbm
        formData.name = record.khmc
        //http://127.0.0.1:3001/cmms/sys/common/download/demo_1594171157273.docx
        getAction('/xdgl/nhxe/nhxe/checkFile', formData).then((res) => {
          if (res.success) {
            window.open(
              `${window._CONFIG['staticDomainURL']}/` + res.message
            )
          } else {
            this.$message.warning(res.message,5)
          }

        })

      },
      downht (record) {
        let formData = {}
        formData.zjhm = record.zjhm
        formData.hhbm = record.hhbm
        formData.spid = record.spid
        formData.name = record.khmc
        //http://127.0.0.1:3001/cmms/sys/common/download/demo_1594171157273.docx
        getAction('/xdgl/nhxe/nhxe/checkHtFile', formData).then((res) => {
          if (res.success) {
            window.open(
              `${window._CONFIG['staticDomainURL']}/` + res.message
            )
          } else {
            this.$message.warning(res.message,5)
          }

        })

      },

      downcjxx (record) {
        let formData = {}
        formData.zjhm = record.zjhm
        formData.spid = record.spid
        formData.hhbm = record.hhbm
        formData.type = '2'
        getAction('/word/creditWord', formData).then((res) => {
          console.log(res)
          if (res.success) {
            window.open(
              `${window._CONFIG['staticDomainURL']}/` + res.message
            )
          } else {
            this.$message.warning(res.message,5)
          }
        })

      },

      ViewXxxx: function (record) {
        this.$refs.xqmodalForm.edit(record)
        this.$refs.xqmodalForm.title = '详情'
        this.$refs.xqmodalForm.disableSubmit = true
        this.$refs.xqmodalForm.dafactivekey = '7'
      },

      /*
      * view(record){

        let formData={};
        formData.zjhm=record.zjhm;
        formData.hhbm=record.hhbm;
        getAction('/xdgl/nhxe/nhxe/generate',formData).then((res)=>{
          if(res.success){
           if(res.message.indexOf("nhxe") != -1){
            let url= `${window._CONFIG['staticDomainURL']}/`+ "dkzl/"+res.message
            window.open(
              //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
              `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
            }else {
            let url= `${window._CONFIG['staticDomainURL']}/`+ "dkzl/"+res.message
            window.open(
              //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
              `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
            }
          }else{
            this.$message.warning(res.message,5);
          }
        })

      }
      * */

      view (record) {

        let formData = {}
        formData.zjhm = record.zjhm
        formData.hhbm = record.hhbm
        formData.name = record.khmc
        getAction('/xdgl/nhxe/nhxe/checkFile', formData).then((res) => {
          if (res.success) {
            let url = `${window._CONFIG['staticDomainURL']}/` + res.message
            window.open(
              `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(url))
          } else {
            this.$message.warning(res.message,5)
          }
        })

      }, wordEdit: function (record) {
        let params = { 'zjhm': record.zjhm, 'wordType': 'nhxe' }
        getAction('/wordinfo/camsZcsxWordinfo/queryByZjhm', params).then(res => {
          if (res.success) {
            res.result.hhbm = record.hhbm
            res.result.zzsxed = record.zzsxed
            res.result.spid = record.spid
            this.$refs.wordForm.edit(res.result)
            this.$refs.wordForm.title = '补录农户小额申请书'
            this.$refs.wordForm.disableSubmit = true

          }
        })

      },
      pmkEdit: function (record) {
        let params = { 'zjhm': record.zjhm, 'wordType': 'pmk' }
        getAction('/wordinfo/camsZcsxWordinfo/queryByZjhm', params).then(res => {
          if (res.success) {
            res.result.hhbm = record.hhbm
            res.result.zzsxed = record.zzsxed
            res.result.spid = record.spid
            this.$refs.pmkForm.edit(res.result)
            this.$refs.pmkForm.title = '补录农户小额申请书'
            this.$refs.pmkForm.disableSubmit = true

          }
        })

      },
      close () {
        this.$refs.wordForm.confirmLoading = true

      },
      downloadAlreadyApprovalYearAudit () {
        window.location.href = `${window._CONFIG['domianURL']}/` + '/xdgl/pjsxspjl/camsZcsxGrpjsxxxSpjl/downloadAlreadyApprovalYearAudit'

      },
      batchQueryQxfk(){
        this.batchQueryQxfkLoading = true
        var params = this.getQueryParams()//查询条件
        if (this.selectedRowKeys.length > 0){
          let spids = '';
          for (let i = 0; i < this.selectedRowKeys.length; i++) {
            spids += this.selectedRowKeys[i]+","
          }
          params.spid = spids
        }
        getAction("/xdgl/pjsxspjl/camsZcsxGrpjsxxxSpjl/batchQueryQxfk",params).then(res=>{
            if (res.success){
              this.successInfo("查询成功")
              this.loadData()
              this.batchQueryQxfkLoading = false
            }else {
              this.errorInfo(res.message)
              this.batchQueryQxfkLoading = false

            }
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>