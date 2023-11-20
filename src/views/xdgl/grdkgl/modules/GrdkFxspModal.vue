<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <!-- <div class="no-print" style="text-align: right">
       <a-button v-print="'#printContent'"  type="primary">打印</a-button>
     </div>-->
    <div class="no-print" style="text-align: right">
      <a-button @click="grdkfj()"  type="primary">资料预览</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p style="padding-top:10px;font-size: 22px;font-weight: 800">支行风险评价审查表</p>
      </div>
      <!--签字-->
      <div class="sign" style="text-align: left;height: inherit">
        <br/>
          <table align="center" border="1"  width="100%" >
            <thead>
            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                1、信贷资料基本要素的审查：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-indent:25px;text-align:left;width:50px ">
                <a-checkbox-group :disabled="!isfxjl" style="display: flex;flex-direction: column;" v-model="xdzljbyscheckedList" :options="xdzljbysOptions"  />
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                2、主体资格的审查：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-indent:25px;text-align:left;width:50px ">
                <a-checkbox-group :disabled="!isfxjl" style="display: flex;flex-direction: column;" v-model="ztzgsccheckedList" :options="ztzgscOptions"  />
              </td>
            </tr>

            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                3、政策规定的审查：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-indent:25px;text-align:left;width:50px ">
                <a-checkbox-group :disabled="!isfxjl" style="display: flex;flex-direction: column;" v-model="zcgdcheckedList" :options="zcgdOptions"  />
              </td>
            </tr>

            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                4、信贷风险的审查：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-indent:25px;text-align:left;width:50px ">
                <a-checkbox-group :disabled="!isfxjl" style="display: flex;flex-direction: column;" v-model="xdfxsccheckedList" :options="xdfxscOptions"  />
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                5、担保审查：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-indent:25px;text-align:left;width:50px ">
                <a-checkbox-group :disabled="!isfxjl" style="display: flex;flex-direction: column;" v-model="dbsccheckedList" :options="dbscOptions"  />
              </td>
            </tr>

            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                6、审核人员认为需要补充的其他资料：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-align:left;">
                <a-form-item>
                  <a-textarea placeholder="" :disabled="!isfxjl"  @change="onChangeQtzl"  v-decorator="['qtzl', { } ]"   :rows="3"/>
                </a-form-item>
              </td>
            </tr>

            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                7、风险点文字说明：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-align:left;">
                <a-form-item>
                  <a-textarea   :disabled="!isfxjl" v-decorator="['fxdwzsm', {} ]"  :rows="3"/>
                </a-form-item>
              </td>
            </tr>

            <tr>
              <td  colspan="1" style="font-size: 14px;font-weight: bold;text-align:left;width:50px ">
                8、审查结论：
              </td>
            </tr>
            <tr>
              <td  colspan="1" style="text-indent:25px;text-align:left;width:50px ">
                <a-checkbox-group :disabled="!isfxjl" style="display: flex;flex-direction: column;" v-model="scjlcheckedList" :options="scjlOptions" @change="scjlChange" />
              </td>
            </tr>
            <!-- <tr>
               <td colspan="1"  style="font-size: 14px;font-weight: bold;text-indent:30%;text-align:left;width:50px ">
                   审查人签名：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;年 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 月&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;日
               </td>
             </tr>-->
            </thead>
          </table>
      </div>
    </section>
  </a-card>
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
        isfxjl:false,
        disableSubmit:false,
        form: this.$form.createForm(this),
        model:{},
        visible:false,
        confirmLoading: false,
        previewVisible: false,
        xdzljbyscheckedList:[],
        xdzljbysOptions:[
          { label: '①借款人资料 ', value: '1' },
          { label: '②担保人（物）资料', value: '2' },
          { label: '③调查资料', value: '3' },
         ],
        ztzgsccheckedList:[],
        ztzgscOptions:[
          { label: '①借款人及担保人主体资格', value: '1' },
          { label: '②法定代表人有关证明材料是否符合规定', value: '2' },
          { label: '③借款人申请贷款是否履行了法律法规或公司章程规定的授权程序', value: '3' },
          { label: '④借款人股东的实力及注册资金到位情况', value: '4' },
          { label: '⑤借款人及担保人组织机构是否合理', value: '5' },
          { label: '⑥产权关系是否明晰', value: '6' },
          { label: '⑦借款人及担保人的法定代表人、股东、高管、主要部门负责人有无不良记录', value: '7' },
        ],
        zcgdcheckedList:[],
        zcgdOptions:[
          { label: '①贷款用途、期限、方式、利率等是否符合国家宏观经济政策、产业行业政策、土地、环保和节能政策以及国家货币信贷政策等规定', value: '1' },
          { label: '②是否符合监管限制性比例规定', value: '2' },
        ],
        xdfxsccheckedList:[],
        xdfxscOptions:[
          { label: '①审查测定的借款人信用等级', value: '1' },
          { label: '②授信额度与营运资金需求', value: '2' },
          { label: '③分析揭示借款人的生产风险', value: '3' },
          { label: '④交易风险', value: '4' },
          { label: '⑤财务风险', value: '5' },
          { label: '⑥经营管理风险', value: '6' },
          { label: '⑦市场风险', value: '7' },
          { label: '⑧其他风险', value: '8' },
          { label: '⑨提出风险防范措施', value: '9' },
        ],
        dbsccheckedList:[],
        dbscOptions:[
          { label: '①保证人的保证资格', value: '1' },
          { label: '②保证能力', value: '2' },
          { label: '③保证意愿', value: '3' },
          { label: '④抵（质）押担保的合法有效性', value: '4' },
          { label: '⑤抵（质）押物价值', value: '5' },
          { label: '⑥变现能力', value: '6' },
        ],
        scjlcheckedList:[],
        scjlOptions:[
          { label: '①风险审查无瑕疵，同意提交审批', value: '1' },
          { label: '②风险审查有瑕疵，同意提交审批', value: '2' },
          { label: '③风险审查有瑕疵，不同意提交审批', value: '3' },
        ],
        id:"",
        zjhm:"",
        hhbm:"",
        scjl:"3",
        url:{
          add:"/xdgl/grdkgl/grdksplc/addfxsc",
          edit:"/xdgl/grdkgl/grdksplc/editfxsc",
        }
      }
    },
    created() {
      this.fxjlQx();
    },

    methods: {
      fxjlQx(){
        let _this=this;
        putAction('/sys/user/getUserFxjlRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
              this.isfxjl=true;
            }else{
              this.isfxjl=false;
            }
            console.log('isfxjl:')
            console.log(this.isfxjl)
          }else{
            _this.$message.warning(res.message,5);
          }
        })
      },


      scjlChange(checkedList){
       if(checkedList.length>1){
         this.$message.warning("该选项只能选择一个结果")
         this.scjlcheckedList=[];
       }
      },
      onChangeQtzl(e){
      },
      edit (record) {
        this.scjl=record.scjl;
        this.model = Object.assign({}, record)
        this.zjhm=record.zjhm
        this.hhbm=record.hhbm
        console.log(record.hhbm)
        //加载家庭相关情况字表数据
        getAction("/xdgl/grdkgl/grdksplc/fxpjsc", {spid: record.spid}).then((res) => {
          if (res.success) {
            if(res.result!=null){
              this.model = Object.assign({}, res.result);
              this.$nextTick(() => {
                //时间格式化
                this.form.setFieldsValue(pick(this.model,'qtzl','fxdwzsm'))
              });
              this.id=res.result.id;
              this.xdzljbyscheckedList=res.result.xdzljbys==null?this.xdzljbyscheckedList:res.result.xdzljbys.split(',');
              this.ztzgsccheckedList=res.result.ztzg==null?this.ztzgsccheckedList:res.result.ztzg.split(',');
              this.zcgdcheckedList=res.result.zcgd==null?this.zcgdcheckedList:res.result.zcgd.split(',');
              this.xdfxsccheckedList=res.result.xdfx==null?this.xdfxsccheckedList:res.result.xdfx.split(',');
              this.dbsccheckedList=res.result.db==null?this.dbsccheckedList:res.result.db.split(',');
              this.scjlcheckedList=res.result.scjl==null?this.scjlcheckedList:res.result.scjl.split(',');

            }
          }
        });
        this.visible = true;
      },



      close () {
        this.xdzljbyscheckedList=[];
        this.ztzgsccheckedList=[];
        this.zcgdcheckedList=[];
        this.xdfxsccheckedList=[];
        this.dbsccheckedList=[];
        this.scjlcheckedList=[];
        this.model={};
        this.$emit('close');
        this.visible = false;
      },
      async handleOk (flag) {
        if( this.scjlcheckedList.length<1){
          this.$message.error("请选择审查结论！")
          return;
        }else{
          this.form.validateFields((err, values) => {
            if (!err) {
              this.confirmLoading = true;
              let httpurl=this.url.edit;
              let formData = {
                id:this.id,
                zjhm:this.zjhm,
                hhbm:this.hhbm,
                xdzljbys: this.xdzljbyscheckedList.join(','),
                ztzg: this.ztzgsccheckedList.join(','),
                zcgd: this.zcgdcheckedList.join(','),
                xdfx: this.xdfxsccheckedList.join(','),
                db: this.dbsccheckedList.join(','),
                qtzl: this.form.getFieldValue("qtzl"),
                fxdwzsm:this.form.getFieldValue("fxdwzsm"),
                scjl: this.scjlcheckedList.join(','),

              }
              putAction(httpurl,formData).then((res)=>{
                if(res.success){
                  flag=true;
                  return;
                }else{
                  this.$message.warning(res.message,5);
                  flag=false;
                  return;
                }
              })
            }
          })


        }



      },
      grdkfj(){
        let formData={};
        formData.zjhm=this.zjhm;
        formData.hhbm=this.hhbm;
        getAction('/wordinfo/camsZcsxWordinfo/grdkfujian',formData).then((res)=>{
          if(res.success){
            if (res.message == "fail"){
              this.$message.warning("该用户未上传资料");
              return;
            }

            if(res.message.indexOf("grdkfj") != -1){
              let url= `${window._CONFIG['staticDomainURL']}/`+ "grdkfj/"+res.message
              window.open(
                //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
            }

          }else{
            this.$message.warning(res.message,5);
          }
        })
      }
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
</style>

