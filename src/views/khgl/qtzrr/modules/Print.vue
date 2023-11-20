<template>
  <a-modal :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
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
        <p style="font-size: 24px;font-weight: 800">{{this.qtzrrxxcj.qydm}}其他自然人信息采集表</p>
      </div>
      <!--签字-->

        <div class="sign" style="text-align: left;height: inherit">

          <table   width="100%" >
            <tr>
              <td colspan="1"style="text-align:center;">

              </td>
              <td colspan="1" style="text-align:center;">
                村:
              </td>
              <td colspan="1" style="text-align:left;">
                <a-input  style="border: black;width: 75%;text-align:left;" v-model="this.model.xzc_dictText"/>
              </td>
              <td colspan="1" style="text-align:center;">
                组:
              </td>
              <td colspan="1" style="text-align:left;">
                <a-input  style="border: black;width: 75%;text-align:left;" v-model="this.model.xzz_dictText"/>
              </td>
              <td colspan="1" style="text-align:center;width: 70px">
                调查日期:
              </td>
              <td colspan="1"style="text-align:center;">
                <a-input  style="border: black;width: 100px;text-align:left;" />
              </td>
              <td colspan="1"style="text-align:center;">
                单位:元
              </td>
            </tr>
          </table>

          <table align="center" border="1"  width="100%" >
            <thead>
            <tr>
              <td :rowspan="this.sj" colspan="1"style="text-align:center;width:50px ">
                基本情况
              </td>
              <td  rowspan="1" colspan="1"style="text-align:center;width:90px ">
                户主姓名
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;width:140px ">
                身份证号码
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;width:50px ">
                性别
              </td>

              <td rowspan="1" colspan="1" style="text-align:center;">
                年龄
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width:70px ">
                家庭人口
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width:135px ">
                联系电话
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;width:170px ">
                经营项目
              </td>
            </tr>

            <tr>

              <td rowspan="1" colspan="1"style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.hzxm"/>
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">

                <!--<textarea  style="border:none" rows="" cols="" v-model="this.qtzrrxxcj.zjhm" ></textarea>-->
                <a-input  style="border: black;width: 170px" v-model="this.qtzrrxxcj.zjhm"/>
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.xb"/>
              </td>

              <td colspan="1" style="text-align:center;width: 60px">
                <a-input  style="border: black;width: 50px" v-model="this.qtzrrxxcj.nl"/>
              </td>
              <td colspan="1" style="text-align:center;">
                <a-input  style="border: black"  v-model="this.qtzrrxxcj.jtrk"/>
              </td>
              <td colspan="1" style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.lxdh"/>
              </td>
              <td colspan="2" style="text-align:center;">
                <textarea  style="border:none" rows="" cols="" v-model="this.qtzrrxxcj.jyqk" ></textarea>
                <!--<a-input  style="border: black" v-model="this.qtzrrxxcj.jyqk"/>-->
              </td>
            </tr>

            <tr >
              <td rowspan="1" colspan="1"style="text-align:center;">
                姓名
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;width: 120px">
                身份证号码
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;">
                年龄
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                与户主关系
              </td>

              <td rowspan="1" colspan="1" style="text-align:center;">
                文化程度
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;" >
                劳动力状况
              </td>

            </tr>


            <tr v-for='(list,index) in Jtcylist' v-bind:key='list.xm'>
              <td rowspan="1" colspan="1"style="text-align:center;">
                <a-input  style="border: black" v-model="list.xm"/>
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                <a-input  style="border: black" v-model="list.zjhm"/>
              </td>
              <td colspan="1" style="text-align:center;">
                <a-input  style="border: black" v-model="list.nl"/>
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                <a-input  style="border: black" v-model="list.yhzgx"/>
              </td>


              <td colspan="1" style="text-align:center;">
                <a-input  style="border: black" v-model="list.whcd"/>
              </td>
              <td colspan="1" style="text-align:center;">
                <a-input  style="border: black" v-model="list.ldnlzk"/>
              </td>
            </tr>


            <tr>
              <td rowspan=4 colspan="1"style="text-align:center;">
                家庭资产负债状况
              </td>
              <td rowspan="2" colspan="1"style="text-align:center;">
                家庭资产情况
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                家庭财产状况
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                家庭年收入
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                家庭年支出
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                年实现纯收入
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="2"style="text-align:left;">
                <textarea  style="border:none;height: 150px;width: 160px" rows="" cols="" v-model="this.qtzrrxxcj.jtzczk" ></textarea>
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.jyxmnsr"/>
              </td>
              <td rowspan="1"  colspan="2" style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.jyxmnzc"/>
              </td>
              <td  rowspan="1"  colspan="2" style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.jyxmncsr"/>
              </td>
            </tr>

           <tr>
              <td rowspan="2" colspan="1"style="text-align:center;">
                家庭负债情况
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                民间借贷
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                银行贷款
              </td>
              <td colspan="2" style="text-align:center;">
                其他金融机构借款
              </td>
              <td colspan="2" style="text-align:center;">
                合计
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="2"style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.mjjd"/>
              </td>
              <td rowspan="1" colspan="2"style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.yhdk"/>
              </td>
              <td colspan="2" style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.qtjrjgjk"/>
              </td>
              <td colspan="2" style="text-align:center;">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.hj"/>
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1"style="text-align:center;" height="110px">
                在我行支付结算情况
              </td>
              <td rowspan="1" colspan="5"style="text-align:center;">
                <a-input  style="border: black" />
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;">
                信贷需求
              </td>
              <td rowspan="1" colspan="3"style="text-align:center;">
                <a-input  style="border: black" />
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1"style="text-align:center;"  height="100px">
                被调查人签字
              </td>
              <td rowspan="1" colspan="5" align="right" valign="bottom">
                <a-input  style="border: black" v-model="this.qtzrrxxcj.bdcrqm"/>
                <p style="letter-spacing: 12px"  >年   月   日</p>
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;">
                信息采集人签字
              </td>
              <td rowspan="1" colspan="3" align="right" valign="bottom">
                <a-input  style="border: black" />
                <p style="letter-spacing: 12px"  >年   月   日</p>
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1"style="text-align:center;"  height="100px">
                支行调査人意见
              </td>
              <td rowspan="1" colspan="5"  align="right" valign="bottom">
                <a-input  style="border: black" />
                <p style="letter-spacing: 12px"  >年   月   日</p>
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;">
                支行行长意见
              </td>
              <td rowspan="1" colspan="3" align="right" valign="bottom">
                <a-input  style="border: black" />
                <p style="letter-spacing: 12px"  >年   月   日</p>
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1"style="text-align:center;" height="100px">
                备注
              </td>
              <td rowspan="1" colspan="9"style="text-align:center;">
                <a-input  style="border: black" />
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
        sj:5,
        qtzrrxxcj:{},
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

        url:{
          loadApplicant:"/sps/register/loadApplicants",
          loadRegisterFiles:"/sps/register/getRegisterFilesConfig",
          khxxcjportXlsUrl:"/qtzrr/qtzrrjbxx/khxxcjexportXls"
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
        if(record.zjhm) {
          getAction("/qtzrr/qtzrrjbxx/qtzrrxxcjb", { hhbm: record.hhbm,zjhm: record.zjhm, sszh:record.sszh}).then((res) => {
            if (res.success) {
              this.qtzrrxxcj = res.result.jcxx;
             /* this.jtnsr = this.qtzrrxxcj.zzxmsr+this.qtzrrxxcj.yzxmsr+this.qtzrrxxcj.syxmsr+this.qtzrrxxcj.nwxwsr;
              this.jtnzc = this.qtzrrxxcj.zzxmzc+this.qtzrrxxcj.yzxmzc+this.qtzrrxxcj.syxmzc+this.qtzrrxxcj.nwxwzc;
              this.jtcsr = this.qtzrrxxcj.zzxmcsr+this.qtzrrxxcj.yzxmcsr+this.qtzrrxxcj.syxmcsr+this.qtzrrxxcj.nwxwcsr;*/
              //获取家庭成员数量
              this.Jtcylist = res.result.jsonArray;
              this.sj=this.Jtcylist.length+3;
              console.log("---农户采集信息表-----")
              console.log('qtzrrxxcj', res.result)
              console.log("jcxx",res.result.jcxx)
              console.log("Jtcylist",this.Jtcylist)

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
        this.previewVisible = false;
        this.close();
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
        this.handleExportXls("客户信息采集表")
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        console.log("---------")
        console.log(this.model)
        let param = {"hhbm":this.model.hhbm};
        console.log("导出参数",param)
        downFile(this.url.khxxcjportXlsUrl,param).then((data)=>{
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