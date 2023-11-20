<template>
  <a-modal :width="980"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="提交"
           cancelText="关闭">


  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right">
      <a-button v-print="'#printContent'"  type="primary">打印</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p style="padding-top:12px;font-size: 22px;font-weight: 800">集体审批讨论记录及审批责任书</p>
      </div>
      <!--签字-->
        <div class="sign" style="text-align: left;height: inherit">
        <br/>
         <a-form >
           <table align="center" border="1"  class="tableCss" width="100%" >
             <thead>
            <tr align="center" >
               <td width="10%">时间</td>
               <td colspan="2">
                   <a-input    placeholder=""   v-model="model.jtspsj"   size="small" style="border: black;"/>
               </td>
               <td>地点</td>
               <td colspan="2">
                   <a-input    placeholder=""  v-model="model.jtspdd"     size="small" style="border: black;"/>
               </td>
               <td>记录人</td>
               <td colspan="3">
                   <a-input    placeholder=""   v-model="model.jtspjlr"    size="small" style="border: black;"/>
               </td>
             </tr>
             <tr align="center" >
               <td width="10%">上年授信总额</td>
               <td width="10%">
                   <a-input    placeholder=""  v-model="model.snsxze"    size="small" style="border: black;"/>
               </td>
               <td width="10%">其中：贷款</td>
               <td width="10%">
                   <a-input    placeholder=""  v-model="model.snsxzezdk"   size="small" style="border: black;"/>
               </td>
               <td width="10%">便民卡</td>
               <td width="10%">
                   <a-input    placeholder=""   v-model="model.snsxzezbmk"   size="small" style="border: black;"/>
               </td>
               <td width="10%">福农卡</td>
               <td width="10%">
                   <a-input    placeholder=""   v-model="model.snsxzezfnk"   size="small" style="border: black;"/>
               </td>
               <td width="10%">其他</td>
               <td width="10%">
                   <a-input    placeholder=""  v-model="model.snsxzezqt"    size="small" style="border: black;"/>
               </td>
             </tr>

             <tr align="center" >
               <td>现有用信余额</td>
               <td>
                   <a-input    placeholder=""   v-model="model.xyyxye"    size="small" style="border: black;"/>
               </td>
               <td>其中：现有贷款余额</td>
               <td>
                   <a-input    placeholder=""   v-model="model.xydkye"  size="small" style="border: black;"/>
               </td>
               <td>到期日期</td>
               <td>
                   <a-input    placeholder=""  v-model="model.xydkdqrq"     size="small" style="border: black;"/>
               </td>
               <td>福农卡余额</td>
               <td>
                   <a-input    placeholder=""  v-model="model.xydkfnkye"    size="small" style="border: black;"/>
               </td>
               <td>其他</td>
               <td>
                   <a-input    placeholder=""   v-model="model.xydkqt"   size="small" style="border: black;"/>
               </td>
             </tr>

             <tr align="center" >
               <td>现申请授信金额</td>
               <td>
                 <a-input    placeholder=""   v-model="model.xsqsxje"   size="small" style="border: black;"/>
               </td>
               <td>担保方式</td>
               <td> <a-input    placeholder=""   v-model="model.xdbfs"   size="small" style="border: black;"/></td>
               <td>抵押物价值</td>
               <td><a-input    placeholder=""   v-model="model.xdywjz"   size="small" style="border: black;"/></td>
               <td></td>
               <td></td>
               <td colspan="2"></td>
             </tr>

            <tr  align="center">
               <td >参审人员</td>
               <td colspan="9"> <a-input    placeholder=""   v-model="model.csry"    size="small" style="border: black;"/></td>
             </tr>

            <tr  align="center">
               <td >审贷记录</td>
               <td colspan="9">
                 <a-textarea placeholder=""   v-model="model.sdjl"   :rows="4"/>
               </td>
             </tr>
             <tr  align="center">
               <td > 调查责任人意见</td>
               <td colspan="9"  style="font-size: 14px;font-weight: bold;text-align:left; ">
                 <a-textarea placeholder=""   v-model="model.dczrryj"      :rows="3"/>
                 主调查人签名:<a-input    placeholder="主调查人签名"  v-model="model.ztcrqm"     size="small" style="border: black;width: 100px"/>
                 协调查人签名:<a-input    placeholder="协调查人签名"  v-model="model.xtcrqm"    size="small" style="border: black;width: 100px"/>&nbsp;&nbsp;
                   <a-input    placeholder=""  v-model="zdcrqmsjN"   size="small" style="border: black;width: 50px"/>年
                   <a-input    placeholder=""  v-model="zdcrqmsjY"   size="small" style="border: black;width: 30px"/> 月
                   <a-input    placeholder=""   v-model="zdcrqmsjR"   size="small" style="border: black;width: 30px"/> 日
               </td>
             </tr>

             <tr  align="center">
               <td > 审批责任人意见</td>
               <td colspan="9"  style="font-size: 14px;font-weight: bold;text-align:left; ">
                 <a-textarea placeholder=""  v-model="model.spzrryj"        :rows="3"/>
                 审批责任人签名:<a-input   v-model="model.spzrrqm"   placeholder="审批责任人签名"   size="small" style="border: black;width: 100px"/>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <a-input    placeholder=""   v-model="spzrrqmsjN"   size="small" style="border: black;width: 50px"/>年
                 <a-input    placeholder=""   v-model="spzrrqmsjY"    size="small" style="border: black;width: 30px"/> 月
                 <a-input    placeholder=""  v-model="spzrrqmsjR"     size="small" style="border: black;width: 30px"/> 日
               </td>
             </tr>



            <tr align="center">
              <td rowspan="6" colspan="1" > 贷款审批小组审批结论</td>
            </tr>
            <tr  >
              <td colspan="9" style="font-size: 14px;font-weight: bold;text-align:left;" >
                授信总额（大写）： <a-input    placeholder=""   v-model="model.sxze"   size="small" style="border: black;width: 60px"/>&nbsp;&nbsp;
                期限：<a-input    placeholder=""   v-model="model.sxqx"   size="small" style="border: black;width: 40px"/>&nbsp;&nbsp;&nbsp
                利率：按<a-input    placeholder=""   v-model="llnqText"  size="small" style="border: black;width: 80px"/>年期&nbsp;&nbsp;
                LPR<a-input    placeholder=""  v-model="model.lljd"    size="small" style="border: black;width: 50px"/>基点
              </td>
            </tr>


            <tr align="center" >
              <td colspan="9" style="font-size: 14px;font-weight: bold;text-align:left;" >
                其中：贷款授信：<a-input    placeholder=""   v-model="model.dksxed"    size="small" style="border: black;width: 100px"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                便民卡授信：<a-input    placeholder=""   v-model="model.bmksxed"    size="small" style="border: black;width: 100px"/>
              </td>
            </tr>
            <tr align="center" >
              <td colspan="9" style="font-size: 14px;font-weight: bold;text-align:left;" >
                担保授信： <a-input    placeholder=""   v-model="model.dbsxed"   size="small" style="border: black;width: 100px"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                福农卡授信：<a-input    placeholder=""  v-model="model.fnksxed"    size="small" style="border: black;width: 100px"/>
              </td>
            </tr>
            <tr align="center"  >
              <td colspan="9" style="font-size: 14px;font-weight: bold;text-align:left;" >
                附加条件：<a-textarea placeholder=""   v-model="model.fjtj"    :rows="1"/>
              </td>
            </tr>

            <tr align="center" >
              <td colspan="9"  style="font-size: 14px;font-weight: bold;text-align:right;">
                审批小组组长签字： <a-input    placeholder=""  v-model="model.spxzzzqz"   size="small" style="border: black;width: 120px"/>&nbsp;&nbsp;&nbsp;&nbsp;
              </td>
            </tr>

             </thead>
           </table>
           <h4>&nbsp;&nbsp;1、参审人员必须为支行贷款审批小组成员。</h4>
           <h4>&nbsp;&nbsp;2、贷款调查审批责任以此为依据，按照本行《不良贷款责任认定与处罚实施细则》进行认定与处罚。</h4>
         </a-form>
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
  import pick from 'lodash.pick'
  import moment from 'moment'

  export default {
    components: {
      ATextarea,
      ARow,
      ACol,
    },
    name: 'GrdkfxspModal',
    props:{
      reBizCode:{
        type: String,
        default: ''
      }
    },
    data(){
      return {
        spzrrqmsjN:"",
        spzrrqmsjY:"",
        spzrrqmsjR:"",
        zdcrqmsjN:"",
        zdcrqmsjY:"",
        zdcrqmsjR:"",
        llnqText:"",
        model:{},
        visible:false,
        confirmLoading: false,
        url:{
          edit:"/xdgl/grdkgl/grdkJtsp/edit",
        }
      }
    },
    created() {

    },

    methods: {
      edit (record) {
        //加载家庭相关情况字表数据
        if(record.id) {
          getAction("/xdgl/grdkgl/grdkJtsp/jtsp", {id: record.id}).then((res) => {
            if (res.success) {
              if(res.result!=null){
                this.model = Object.assign({}, res.result);
                console.log(res.result.spzrrqmsj)
                console.log(res.result.zdcrqmsj)

                if(res.result.llnq==1){
                  this.llnqText="五年以上";
                }else if(res.result.llnq==2){
                  this.llnqText=" 一至五年(含)";
                }else if(res.result.llnq==3) {
                  this.llnqText=" 一年(含)以内";
                }
                if(res.result.spzrrqmsj!=null){
                  this.spzrrqmsjN=res.result.spzrrqmsj.substr(0, 4);
                  this.spzrrqmsjY=res.result.spzrrqmsj.substr(5, 2);
                  this.spzrrqmsjR=res.result.spzrrqmsj.substr(8, 2);
                }
                if(res.result.zdcrqmsj!=null){
                  this.zdcrqmsjN=res.result.zdcrqmsj.substr(0, 4);
                  this.zdcrqmsjY=res.result.zdcrqmsj.substr(5, 2);
                  this.zdcrqmsjR=res.result.zdcrqmsj.substr(8, 2);
                  console.log(res.result.zdcrqmsj.substr(0, 4))
                }

              }
            }
          });
        }
        this.visible = true;
      },

      loadData(){

      },

      handleCancel () {
        this.previewVisible = false;
        this.close();
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        that.confirmLoading = true;
        let httpurl =this.url.edit;
        let method =  'put';
        console.log('model',this.model)

        let formData = Object.assign(this.model);
        //时间格式化
        if(this.zdcrqmsjN!=""&&this.zdcrqmsjY!=""&&this.zdcrqmsjR!=""){
          formData.zdcrqmsj = this.zdcrqmsjN+'-'+this.zdcrqmsjY+'-'+this.zdcrqmsjR;

        }
        if(this.spzrrqmsjN!=""&&this.spzrrqmsjY!=""&&this.spzrrqmsjR!=""){
          formData.spzrrqmsj = this.spzrrqmsjN+'-'+this.spzrrqmsjY+'-'+this.spzrrqmsjR;
        }

        if(this.llnqText=="五年以上"){
            formData.llnq="1";
        }else if(this.llnqText=="一至五年(含)"){
            formData.llnq="2";
        }else if(this.llnqText=="一年(含)以内"){
            formData.llnq="3";

        }
        console.log(formData)
        httpAction(httpurl,formData,method).then((res)=>{
          if(res.success){
            that.$message.success(res.message);
            that.$emit('ok');
          }else{
            that.$message.warning(res.message);
          }
        }).finally(() => {
          that.confirmLoading = false;
          that.close();
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
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
  table.tableCss {
    font-family: SimSun, sans-serif;
    font-size: 16px;
    color: #000000;
    border-width: 1px;
    border-color: #000000;
    border-collapse: collapse;
  }

  table.tableCss th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #000000;
    background-color: #FFFFFF;
  }

  table.tableCss td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #000000;
    background-color: #ffffff;
  }
</style>

