<template>
  <a-modal
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: true} }"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="导出"
    cancelText="关闭">


  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right">
      <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p style="font-size: 24px;font-weight: 800">农户评级授信审批表</p>
      </div>
      <!--签字-->

        <div class="sign" style="text-align: left;height: inherit">
          <table   width="100%" >
            <tr>
              <td colspan="1" style="text-align:center;">
                住址:
              </td>
              <td colspan="1" style="text-align:left;">
                <a-input  style="border: black;width: 100px;text-align:left;" v-model="this.nhbkbpy.xzc"/>
              </td>
            </tr>
          </table>

          <table align="center" border="1"  width="100%" >
            <thead>
            <tr style="height: 60px">
              <td :rowspan="this.sj" colspan="1" style="text-align:center;width:40px ">
                户主及家庭成员
              </td>
              <td  rowspan="1" colspan="1"style="text-align:center;">
                与户主关系
              </td>
              <td rowspan="1" colspan="1"style="text-align:center ;">
                姓名
              </td>
              <td rowspan="1" colspan="1"style="text-align:center; ">
                性别
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;width: 8px">
                身份证号码
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;" >
                年龄
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                婚姻状况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                职业
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                电话号码
              </td>
            </tr>

            <tr v-for="(item,index) in jtcyxx" v-bind:key='item.zjhm' style="height: 40px">
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="item.yhzgx" style="height: 40px;width: 100px" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="item.khmc" style="height: 40px;width: 90px"/>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="item.xb" style="height: 40px;width: 60px"/>
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                <a-input v-model="item.zjhm" style="width: 170px;height: 40px" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="item.nl"style="height: 40px;width: 60px" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="item.hyzk" style="height: 40px;"/>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="item.zyzk" style="height: 40px" />
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                <a-input v-model="item.lxfs" style="height: 40px" />
              </td>
            </tr>
            <tr style="height: 50px">
              <td rowspan="4" colspan="1" style="text-align:center;width:40px ">
                额度测算
              </td>
              <td  rowspan="1" colspan="10">
                <a style="margin: 2%;">家庭易变现资产估价 {{this.ybxzc}} 元</a>
              </td>
            </tr>
            <tr style="height: 50px">
              <td  rowspan="1" colspan="10">
                <a style="margin-left: 2%;">家庭不易变现资产估价 {{this.bybxzc}} 元</a>
              </td>
            </tr>
            <tr style="height: 50px">
              <td  rowspan="1" colspan="10">
                <a style="margin-left: 2%;">家庭年纯收入 {{this.nhpjsxspb.nhcsr}} 元</a>
              </td>
            </tr>
            <tr style="height: 50px">
              <td  rowspan="1" colspan="1"style="text-align:center;">
               合计
              </td>
              <td  rowspan="1" colspan="9" >
                <a style="margin-left: 2%;">测算额度 {{this.nhpjsxspb.sszchj}} 元</a>
              </td>
            </tr>
            <tr style="height: 200px">
              <td rowspan="1" colspan="10" >
                <a style="margin: 10px 0px 0px 10px">村委会推荐意见:</a>
                <br>
                <br>
                <a style="margin: 10px 0px 0px 10px">
                  同意该户信用等级评定为（{{this.nhpjsxspb.xtcspddj}}）,授信额度为（{{this.nhpjsxspb.nhzzsxed}}）元。
                </a>
                <br>
                <br>
                <a style="margin: 10px 0px 0px 10px">评议小组成员签字： {{ }} </a>
                <br>
                <br>
                <a style="margin-left:60%;">村委会签章：  </a>
                <br>
                <p style="margin-left:88%;" >年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
                <br>
              </td>
            </tr>
            <tr style="height: 200px">
              <td rowspan="1" colspan="10" >
                <a style="margin: 10px 0px 0px 10px">{{this.BankName}}审核意见:</a>
                <br>
                <br>
                <a style="margin: 10px 0px 0px 10px">同意该户信用等级评定为_________, 授信额度为_________元。</a>
                <br>
                <br>
                <a style="margin: 10px 0px 0px 10px">信贷员签字：  </a>
                <br>
                <a style="margin-left:60%;">支行行长签字：  </a>
                <br>
                <p style="margin-left:88%;">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
                <br>
              </td>
            </tr>
            </thead>
          </table>


        </div>
    </section>
  </a-card>
  <!--</page-layout>-->
  </a-modal>
</template>
<script>
  import ACol from "ant-design-vue/es/grid/Col";
  import ARow from "ant-design-vue/es/grid/Row";
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import { httpAction,putAction,getAction,downFile } from '@/api/manage'
  import moment from 'moment'


  export default {
    components: {
      ATextarea,
      ARow,
      ACol,
    },
    name: 'Printgzsld',
    props:{
      reBizCode:{
        type: String,
        default: ''
      }
    },
    data(){
      return {
        jtnsr:" ",
        jtnzc:" ",
        jtcsr:" ",
        zjhm:" ",
        ybxzc:" ",
        bybxzc:" ",
        pyyzjhm:" ",
        pysj:" ",
        sj:2,
        nhpjsxspb:{fczchj:"",nhcsr:"",sszchj:"",xtcspddj:"",nhzzsxed:""},
        nhbkbpy:{},
        jtcyxx:[],
        model:{},
        visible:false,
        confirmLoading: false,
        lists:[
          {id:1, xm:"张三",nl:22},{id:2,xm:"王五",nl:21},{id:3,xm:"赵柳",nl:23}
        ],
        Jtcylist:[],

        columns: [{
        }
        ],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        previewVisible: false,
        previewImage: '',
        BankName: "",
        url:{
          loadApplicant:"/sps/register/loadApplicants",
          loadRegisterFiles:"/sps/register/getRegisterFilesConfig",
          exportXlsUrl:"/nh/nhjbxx/nhbkbpyexpor"
        }
      }
    },
    created() {
      this.getDate();
    },
    /*mounted() {
      this.sj=this.Jtcylist.length+3;
    },*/
    methods: {

      edit (record) {
        this.model = Object.assign({}, record)
        console.log("--------")
        console.log(record)
        //加载家庭相关情况字表数据
        if(this.model.hhbm) {
          getAction("/nh/nhjbxx/querynhpssxxx", { hhbm:this.model.hhbm}).then((res) => {
            if (res.success) {
              this.nhpjsxspb = res.result.jcxx;
              this.sj = res.result.jtcyxx.length+1
              this.jtcyxx = res.result.jtcyxx
              this.ybxzc = res.result.ybxzc
              this.bybxzc = res.result.bybxzc

              /*if(this.nhbkbpy.pysj != null){
                this.nhbkbpy.pysj=moment(this.nhbkbpy.pysj).format("YYYY-MM-DD")
              }*/
              console.log("---农户评级授信审批表-----")
              console.log(res.result)
            }
          });
        }
        this.visible = true;
      },

      loadData(){

      },
      getDate(){
        // 当前时间
      },
      handleCancel () {
        this.previewVisible = false
        this.close()
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange ({ fileList }) {
        this.fileList = fileList
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.handleExportXls("农户背靠背评议表")
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        /*let param = this.model;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }*/
        /*if (param.pjrq != null ){
          this.model.pjrq=this.param.pjrq.format("YYYY-MM-DD")
        }*/
        var param  ={zjhm:this.zjhm, pyyzjhm:this.pyyzjhm,pysj:this.pysj }
        console.log("导出参数",param)
        downFile(this.url.exportXlsUrl,param).then((data)=>{
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

      getBankName: function() {
        getAction("/nh/nhjbxx/getBankName").then((res) => {
          if (res.success) {
            this.BankName = res.result;
          } else {
            this.BankName = "农商行";
          }
        })
      },

    }
  }
</script>
<style scoped>
  .abcdefg .ant-card-body{
    margin-left: 0%;
    margin-right: 0%;
    margin-bottom: 1%;
    border:0px solid black;
    min-width: 800px;
  }
  .explain{
    text-align: left;
    margin-left: 50px;
  }
  .explain .ant-input,.sign .ant-input{
    font-weight:bolder;
    text-align:center;
    border-left-width:0px!important;
    border-top-width:0px!important;;
    border-right-width:0px!important;;
  }
  .explain div{
    margin-bottom: 10px;
  }
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>