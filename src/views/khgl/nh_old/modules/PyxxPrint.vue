<template>
  <a-modal
    :width="1000"
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
        <p style="font-size: 24px;font-weight: 800">背靠背评议表</p>
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
                <a-input  style="border: black;width: 100px;text-align:left;" v-model="this.nhbkbpy.xzc"/>
              </td>
              <td colspan="1" style="text-align:center;">
                组:
              </td>
              <td colspan="1" style="text-align:left;">
                <a-input  style="border: black;width: 100px;text-align:left;" v-model="this.nhbkbpy.xzz"/>
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
              <td :rowspan="2" colspan="1"style="text-align:center;width:50px ">
                基
                本
                情
                况
              </td>
              <td  rowspan="1" colspan="1"style="text-align:center;">
                户号编码
              </td>
              <td rowspan="1" colspan="1"style="text-align:center ;width: 120px">
                姓名
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;width:160px ">
                身份证号码
              </td>

              <td rowspan="1" colspan="1" style="text-align:center;">
                年龄
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                性别
              </td>

            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align: center">
                <a-input v-model="this.nhbkbpy.hhbm" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.xm" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.zjhm" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nl" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.xb" />
              </td>

            </tr>

            <tr>
              <td rowspan="12" colspan="1" style="text-align:center;width:50px ">
                评议情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                婚姻情况
              </td>
              <td rowspan="1" colspan="1" style="text-align: center">
                年龄情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                健康状况情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                经营能力
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                房屋价值情况
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1" style="text-align: center">
                <a-input v-model="this.nhbkbpy.hyzk" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.nlqk" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jkzkqk" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jynl" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.fwjzjqk" />
              </td>

            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                大宗耐用消费品情况
              </td>
              <td rowspan="1" colspan="1" style="text-align: center">
                农机具情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                经营状况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                家庭纯收入情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                家庭总收入，总支出占比情况
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1" style="text-align: center">
                <a-input v-model="this.nhbkbpy.dznyxfqk"style="height: 50px" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.njjqk"style="height: 50px" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <textarea  style="border:none" rows="" cols="" v-model="this.nhbkbpy.jyqk" ></textarea>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jtcsrqk" style="height: 50px" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <textarea  style="border:none" rows="" cols="" v-model="this.nhbkbpy.jtzsr" ></textarea>
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                借款人还款意愿情况
              </td>
              <td rowspan="1" colspan="1" style="text-align: center">
                借款人本金逾期情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                借款人利息逾期情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                存款业务往来情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                职业情况
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1" style="text-align: center">
                <a-input v-model="this.nhbkbpy.jkrhkyy" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jkrbjyq" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jkrlxyq" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <textarea  style="border:none;height: 70px" rows="" cols="" v-model="this.nhbkbpy.ckywwl" ></textarea>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.zyqk" />
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                家庭成员关系
              </td>
              <td rowspan="1" colspan="1" style="text-align: center">
                家庭劳动力人数情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                信誉情况
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                社会声望及荣誉情况
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1" style="text-align: center">
                <textarea  style="border:none;text-align: center" rows="" cols="" v-model="this.nhbkbpy.jtcygx" ></textarea>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jtndlrsqk" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.xyzk" />
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.shsyjry" />
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1"style="text-align:center;">
                家庭人口素质和技能状况
              </td>
              <td rowspan="1" colspan="4" style="text-align:center;height: auto">
                <textarea  style="border:none;height: 60px" rows="" cols="85" v-model="this.nhbkbpy.jtrkszjn" ></textarea>

              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1"style="text-align:center;">
                社会关系状况
              </td>
              <td rowspan="1" colspan="4" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.shgxzk" style="height: 50px"/>
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                生活习惯情况
              </td>
              <td rowspan="1" colspan="1" style="text-align: center">
                交通运输情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                在民间是否有高息借款
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                其他金融机构贷款情况
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="1" style="text-align: center">
                <textarea  style="border:none;height: 60px" rows="" cols="" v-model="this.nhbkbpy.shxgqk" ></textarea>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jtysgjqk" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.zmjgxqk" />
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.qtjgdkqk" />
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="2" style="text-align:center;">
                评议得分
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.pydf"/>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                信用等级
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.xydj"/>
              </td>
            </tr>
            <tr>
              <td rowspan="1" colspan="2"style="text-align:center;">
                建议授信额度
              </td>
              <td rowspan="1" colspan="4" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.jysxed" style="height: 50px"/>
              </td>

            </tr>
            <tr>
              <td rowspan="1" colspan="2" style="text-align:center;">
                评议员姓名
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.pyyxm"/>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                评议员证件号码
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                <a-input v-model="this.nhbkbpy.pyyzjhm"/>
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="2" style="text-align:center;height: 150px">
                评议员签名
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;height: 150px">
                <a-input  style="height: 150px"/>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;height: 150px">
                评议时间
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;height: 150px">
                <a-input v-model="this.nhbkbpy.pysj" style="height: 150px"/>
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
        nl: "",
        xb: "",
        jtnsr:" ",
        jtnzc:" ",
        jtcsr:" ",
        zjhm:" ",
        pyyzjhm:" ",
        pysj:" ",
        sj:5,
        nhbkbpy:{},
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
        if(this.zjhm) {
          //alert(this.pysj)
          getAction("/nh/nhjbxx/nhbkbpy", { zjhm:this.zjhm, pyyzjhm:this.pyyzjhm,pysj:this.pysj}).then((res) => {
            if (res.success) {
              this.nhbkbpy = res.result;
              if(this.nhbkbpy.pysj != null){
                this.nhbkbpy.pysj=moment(this.nhbkbpy.pysj).format("YYYY-MM-DD")
              }
              console.log("---农户采集信息表-----")
              console.log('nhbkbpy', res.result)
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