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
                <a-input  style="border: black;width: 100px;text-align:left;" v-model="this.nhjbxx.xzc_dictText"/>
              </td>
              <td colspan="1" style="text-align:center;">
                组:
              </td>
              <td colspan="1" style="text-align:left;">
                <a-input  style="border: black;width: 100px;text-align:left;" v-model="this.nhjbxx.xzz_dictText"/>
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
              <td :rowspan="2" colspan="1"style="text-align:center;width:60px ">
                基
                本
                情
                况
              </td>
              <td  rowspan="1" colspan="1"style="text-align:center;width:200px">
                户号编码
              </td>
              <td rowspan="1" colspan="1"style="text-align:center ;width: 120px">
                姓名
              </td>
              <td rowspan="1" colspan="1"style="text-align:center;width:200px ">
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
                <a-input v-model="this.nhjbxx.hhbm" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhjbxx.khmc" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nhjbxx.zjhm" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.nl" />
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.xb" />
              </td>

            </tr>

            <tr>
              <td rowspan="1" colspan="2" style="text-align:center;">
                评议平均得分
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                <a-input v-model="this.model.pypjdf"/>
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                信用等级
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                <a-input v-model="this.model.cxd_dictText"/>
              </td>
            </tr>
            <tr>
              <td rowspan="1" colspan="2"style="text-align:center;">
                建议授信额度
              </td>
              <td rowspan="1" colspan="4" style="text-align:center;">
                <a-input v-model="this.model.jysxed" style="height: 50px"/>
              </td>

            </tr>
            <tr>
              <td colspan="6">
                <table align="center" border="1"  width="100%">
                  <thead>
                  <tr>
                    <td style="text-align:center;width: 120px">
                      评议员姓名
                    </td>
                    <td style="text-align:center;width: 140px">
                      评议员证件号码
                    </td>
                    <td style="text-align:center;width: 120px">
                      评议得分
                    </td>
                    <td style="text-align:center;width: 120px">
                      建议授信额度
                    </td>
                    <td style="text-align:center;width: 120px">
                      评议时间
                    </td>
                  </tr>
                  </thead>
                  <tr v-for="item in pyxxList" style="align: center;">
                    <td>{{item.pyyxm}}</td>
                    <td>{{item.pyyzjhm}}</td>
                    <td>{{item.pydf}}</td>
                    <td>{{item.jysxed}}</td>
                    <td>{{item.pysj}}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <!--<tr>-->
              <!--<td rowspan="1" colspan="2" style="text-align:center;">-->
                <!--评议员姓名-->
              <!--</td>-->
              <!--<td rowspan="1" colspan="1" style="text-align:center;">-->
                <!--<a-input v-model="this.nhbkbpy.pyyxm"/>-->
              <!--</td>-->
              <!--<td rowspan="1" colspan="1" style="text-align:center;">-->
                <!--评议员证件号码-->
              <!--</td>-->
              <!--<td rowspan="1" colspan="2" style="text-align:center;">-->
                <!--<a-input v-model="this.nhbkbpy.pyyzjhm"/>-->
              <!--</td>-->
            <!--</tr>-->

            <!--<tr>-->
              <!--<td rowspan="1" colspan="2" style="text-align:center;height: 150px">-->
                <!--评议员签名-->
              <!--</td>-->
              <!--<td rowspan="1" colspan="1" style="text-align:center;height: 150px">-->
                <!--<a-input  style="height: 150px"/>-->
              <!--</td>-->
              <!--<td rowspan="1" colspan="1" style="text-align:center;height: 150px">-->
                <!--评议时间-->
              <!--</td>-->
              <!--<td rowspan="1" colspan="2" style="text-align:center;height: 150px">-->
                <!--<a-input v-model="this.nhbkbpy.pysj" style="height: 150px"/>-->
              <!--</td>-->
            <!--</tr>-->

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
        nhjbxx:{},
        pyxxList:{},
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

      edit (record, nhjbxx, pyxxList) {
        this.model = Object.assign({}, record)
        this.nhjbxx = Object.assign({}, nhjbxx)
        this.pyxxList = pyxxList
        console.log("--------")
        console.log(pyxxList)
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