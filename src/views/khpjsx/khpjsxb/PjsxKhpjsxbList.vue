<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


       <!--   <a-col :md="6" :sm="8"><a-form-item label="评级维度">
            <j-dict-select-tag placeholder="请选择评级维度" v-model="queryParam.khwd" dictCode="rqwd" :change="PjwdChange()"/>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="组织机构">
            <j-tree-select placeholder="请选择组织机构" v-model="queryParam.zzbz"
                           pid-field="sjzzbz" treeNodeFilterProp="title" dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ"
                           :showSearch="true" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
          </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="khlx"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">

            <a-col :md="6" :sm="8"><a-form-item label="评级等级">
              <j-dict-select-tag placeholder="请选择评级等级" v-model="queryParam.pjdj" dictCode="PJSX_KHDJSZ,DJMC,DJBH"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>

              <a-button @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px;">
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
<!--      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>-->
      <a-button icon="area-chart"  @click="initDataPjsx" v-has="'PjsxKhpjsxb:xtcssx'">系统测算授信</a-button>
      <a-button icon="download" @click="handleExportXls('客户评级授信表')" v-has="'PjsxKhpjsxb:exp'">导出</a-button>
<!--      <a-button type="primary" icon="download" @click="pjmxhandleExportXls('导出评级明细')">评级明细导出</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 1600 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <!-- 字符串超长截取省略号显示 -->
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handlePjmxEdit(record)" v-has="'PjsxKhpjsxb:view'">明细查看</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxKhpjsxb-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import PjsxKhpjsxbModal from './modules/PjsxKhpjsxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction,putAction,downFile } from '@/api/manage'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import JInput from '../../../components/jeecg/JInput'
  export default {
    name: "PjsxKhpjsxbList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      JTreeSelect,
      PjsxKhpjsxbModal,JInput
    },
    data () {
      return {
        description: '客户评级授信表管理页面',
        queryParam: { khwd: "DD" },
        pjwdD: null,
        pjwdM: null,
        pjwdQ: null,
        pjwdY: null,
        khlxQueryFlag:"",
        pjjdSsnf: '',
        pjjd: '',
        pjnf: '',
        yearValue: '',
        years: [],
        // 表头
        columns: [
        /*  {
            title: '评级维度',
            align: "center",
            dataIndex: 'khwd_dictText',
            width: 100
          },*/
          {
            title: '评级日期',
            align: "center",
            dataIndex: 'pjrq',
            width: 120
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz_dictText',
            width: 120
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'zjhm' },
            width: 120
          },
          {
            title: '评级得分',
            align: "center",
            dataIndex: 'pjdf',
            width: 100
          },
          {
            title: '评级等级',
            align: "center",
            dataIndex: 'pjdj_dictText',
            width: 100
          },
          {
            title: '授信额度',
            align: "center",
            dataIndex: 'sxed',
            width: 100
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 100
          },
          {
            title: '等级系数',
            align: "center",
            dataIndex: 'djxs',
            width: 100
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr',
            width: 100
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 120
          },
          {
            title: '录入标志',
            align: "center",
            dataIndex: 'lrbz_dictText',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
            width: 120
          }
        ],
        url: {
          list: "/khpjsx.khpjsxb/pjsxKhpjsxb/list",
          delete: "/khpjsx.khpjsxb/pjsxKhpjsxb/delete",
          deleteBatch: "/khpjsx.khpjsxb/pjsxKhpjsxb/deleteBatch",
          exportXlsUrl: "khpjsx.khpjsxb/pjsxKhpjsxb/exportXls",
          pjmxexportXlsUrl:"/khpjsx.khpjsxb/pjsxKhpjsxb/exportTemplateXls",
          importExcelUrl: "khpjsx.khpjsxb/pjsxKhpjsxb/importExcel",
        },
      }
    },
    created() {
      this.init();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      PjwdChange() {
        let param = this.queryParam.khwd
        if (param == "DD"){
          this.pjwdD=true
          this.pjwdM=false
          this.pjwdQ=false
          this.pjwdY=false
        } else if (param == "MM"){
          this.pjwdD=false
          this.pjwdM=true
          this.pjwdQ=false
          this.pjwdY=false
        } else if (param == "Q"){
          this.pjwdD=false
          this.pjwdM=false
          this.pjwdQ=true
          this.pjwdY=false
        } else if (param == "YYYY"){
          this.pjwdD=false
          this.pjwdM=false
          this.pjwdQ=false
          this.pjwdY=true
        }
      },
      PJWDChange(value){
        let val = value;
        this.$emit('change', val);
      },
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear()
        this.initSelectYear(year)
      },
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      searchReset() {
        this.queryParam = {}
        this.pjjdSsnf = ''
        this.pjjd = ''
        this.pjnf = ''
        this.loadData(1)
      },
      /**
       * 评级明细
       * @param record
       */
      handlePjmxEdit: function(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "评级明细";
        this.$refs.modalForm.disableSubmit = true;
      },
      pjmxhandleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.pjrq ==null || param.pjrq=='undefined'){
          this.$message.error("评级日期不能为空!")
          return
        }
        if (param.pjrq != null ){
          param.pjrq=param.pjrq.format("YYYY-MM-DD")
        }
        var dcsj  ={"pyrq":param.pjrq }
        console.log("导出参数",param)
        downFile(this.url.pjmxexportXlsUrl,dcsj).then((data)=>{
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
      },
      initDataPjsx() {
        this.loading=true;



          if(this.queryParam.khlx==""||this.queryParam.khlx==null){
            this.khlxQueryFlag=0
          }else{
            this.khlxQueryFlag=this.queryParam.khlx
          }
          putAction("/khpjsx.khpjsxb/pjsxKhpjsxb/extractPjsx",{"khlx": this.khlxQueryFlag}).then((res) => {
            if (res.success) {
              alert("计算成功")
            } else {
              this.$message.warning(res.message,5)
            }
          });



        this.loading=false;
      },
      initData(){
        /*var params = this.queryParam;
        if( params.ksrq==null || params.jsrq==null || params.ksrq=='undefined'){
          this.$message.error("开始日期或者接受日期不能为空!")
          return
        }

        let ksrqstr=params.ksrq.format("YYYYMMDD");
        let jsrqstr=params.jsrq.format("YYYYMMDD");
        this.loading = true;
        //let formData = Object.assign(ksrqstr, jsrqstr);

        putAction(this.url.init, {"ksrq":ksrqstr,"jsrq":jsrqstr},'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })*/
      },
      // 查询条件[pdrq]格式化Func
      /*getQueryParams() {
        console.log('KhdjpdList => getQueryParams()')
        console.log(this.pdnf)
        let pdzq=this.queryParam.pdzq
        let pdrqMoment=""
        if (this.queryParam.pdzq  || this.queryParam.pdrq) {
          if (pdzq=="MM") {
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined') {
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM") + '-01'
            }
          } else if (pdzq=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              let day = new Date(this.jdssnf,this.pdjd,0)
              let dayCount = day.getDate()
              pdrqMoment=this.jdssnf + '-' + this.pdjd + '-' + dayCount
            }
          } else if (pdzq=="YYYY") {
            if (this.pdnf != '') {
              pdrqMoment=this.pdnf + '-12-01'
            }
          }
        }
        console.log('查询 => pdzq::::::::::' + pdzq)
        console.log('查询 => pdrqMoment::::' + pdrqMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.pdrq=pdrqMoment;
        return filterObj(param);
      },*/
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>