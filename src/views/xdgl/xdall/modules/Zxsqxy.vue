<template>
  <div>
    <div style="text-align:right;padding-right: 10px">
      <span class="btn btn_large wfull" style="margin-right: 10px;background-color:#243444; width:100px;border-radius: 20px; font-size:16px; color:#FFFFFF; line-height: 2.0em;"  @click="innerVisibleBr = true" >本人签字</span>
      <span class="btn btn_large wfull" style="background-color:#243444; width:100px;border-radius: 20px; font-size:16px; color:#FFFFFF; line-height: 2.0em;"  @click="innerVisiblePo = true" >配偶签字</span>
    </div>
    <div style="background-color:#F7F7F7;height:370px;">
      <div style="height:18px;"></div>
      <div style="background-color:#FFFFFF; margin-left:20px; margin-right:20px; padding-bottom:5px;">
        <div style="padding-left:20px; padding-right:20px;">
          <div style="overflow:auto;height: 330px;">
            <div style="font-size:16px; font-weight:bold; text-align:center; padding-bottom:20px; padding-top:20px;">信用信息查询、使用授权书</div>
            <div style="font-size:12px; padding-bottom:30px;"><span style="font-weight:bold">湖南浏阳农村商业银行股份有限公司（以下简称“贵行”）：</span><br>
              <br>
              <span>（选择在□内划“√”，不选择的划“×”，选择的人、单位统称“授权人”）</span><br>
              <br>
              <span><input type="checkbox" name='' value='' class='checkboxs' onClick="return false;" checked="checked"/> 本人（姓名：{{this.khmc}}，身份证号码：{{this.zjhm}}）；</span><br>
              <br>
              <span><input id="P_CHECK" type="checkbox" name='' value='' class='checkboxs' :checked="this.sfypo"/> 授权人配偶（姓名：{{this.pomc}}，身份证号码：{{this.pozjhm}}）；</span><br>
              <br>
              <span><input type="checkbox" name='' value='' class='checkboxs' onClick="return false;"/> 本单位：______________ </span><br>
              <br>
              <span><input type="checkbox" name='' value='' class='checkboxs' onClick="return false;"/> 本人（姓名：____________ ，身份证号码____________），作为（以下简称“授权人单位”）的法定代表人；</span><br>
              <br>
              <span><input type="checkbox" name='' value='' class='checkboxs' onClick="return false;"/> 本人（姓名：____________ ，身份证号码____________），作为（以下简称“授权人单位”）的财务控管人；</span><br>
              <br>
              一、授权人在贵行办理下述 贷款 业务（以下简称“授权业务”）：<br>
              <br>
              1、授信业务，具体业务品种以授信合同的约定为准；2、贷款；3、信用卡；4、保函；5、票据承兑；6、票据贴现；7、担保；8、保理；9、贸易融资业务，包括但不限于信用证、进口押汇、出口押汇、进口代付、打包贷款、提货担保；10、其他：<br>
              <br>
              二、为申请、审批、办理授权业务以及授权业务叙作期间监控授权人及其配偶（如有）信用和经营变化，授权人及其配偶（如有）在此不可撤销的授权贵行：<br>
              <br>
              1、向中国人民银行个人或企业信用信息基础数据库（以下简称“人行数据库”）查询及使用授权人及其配偶（如有）个人或企业信息，包括基本信息和信用报告。
              2、将授权人基本信息和信用记录发送给人行数据库。<br>
              <br>
              三、授权期间：自授权人向贵行提交授权业务申请之日起，至授权人或授权人单位在贵行叙作的授权业务额度到期及结清之日、或授权人履行完毕担保责任之日止。<br>
              <br>
              四、为了贵行能够履行上述受权事宜，授权人及其配偶（如有）同意向贵行指定经办人员提交有效身份证明、资信证明文件的原件及复印件。未经授权人及其配偶（如有）同意，贵行不得将前述证件用于其他用途。<br>
              <br>
              超出本授权书授权范围的后果由贵行承担。<br>
              <br>
              授权人及其配偶（如有）承诺已充分知悉并理解本授权书的内容。本授权书自授权人及其配偶（如有）签署之日起生效，至授权期间届满之日终止。
            </div>
            <div style="font-size:12px; text-align:right; padding-right:30px;padding-bottom:10px">授权人签字：
              <div id="myImg">
                <span @click="innerVisibleBr = true"><img :src="valueBr" width="120" height="50"></span>
              </div>
            </div>
            <div style="font-size:16px; text-align:right; padding-right:40px;padding-bottom:30px">{{this.today}}</div>
            <div style="font-size:12px; text-align:right; padding-right:30px;padding-bottom:10px">配偶签字：
              <div id="myImg2">
                <span @click="innerVisiblePo = true"><img :src="valuePo" width="120" height="50"></span>
              </div>
            </div>
            <div style="font-size:16px; text-align:right; padding-right:40px;padding-bottom:30px">{{this.today}}</div>
            <div style="font-size:10px; text-align:right; padding-right:30px;padding-bottom:30px; color:#CCCCCC">（自然人签字，单位法定代表人签字并加盖公章）</div>
            <div style="font-size:10px; text-align:left; padding-right:30px;padding-bottom:30px; color:#CCCCCC">备注：如上述选择7担保，系作为借款人 ${ETF.KHMC} 的担保人。</div>
            <div style="font-size:12px; padding-bottom:10px;"><span style="font-weight:bold">经办客户经理声明</span></div>
            <div style="font-size:10px; text-align:left; padding-right:30px;padding-bottom:30px;">该笔征信查询是本人面签办理的签署事宜，本人愿意对上述面签事实负责。</div>
            <div style="font-size:12px; text-align:right; padding-right:30px;padding-bottom:30px">经办客户经理签字：{{this.model.khjl}}</div>
          </div>
        </div>
      </div>
      <div style="height:20px;"></div>
    </div>
    <div class="item" style="text-align: center">
      <a-modal
        width="900px"
        title="确认书签名"
        :visible.sync="innerVisibleBr"
        @cancel = "innerVisibleBr = false"
        @ok="innerVisibleBr = false">
        <div id="appbr">
          <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="valueBr"/>
          <div class="sign-btns">
            <span id="clearBr" @click="canvasClear()">清空</span>
            <span id="saveBr" @click="saveAsImgBr()">生成</span>
          </div>
        </div>
      </a-modal>
    </div>
    <div class="item" style="text-align: center">
      <a-modal
        width="900px"
        title="确认书签名"
        :visible.sync="innerVisiblePo"
        @cancel="innerVisiblePo = false"
        @ok="innerVisiblePo = false">
        <div id="apppo">
          <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="valuePo"/>
          <div class="sign-btns">
            <span id="clearPo" @click="canvasClear()">清空</span>
            <span id="savePo" @click="saveAsImgPo()">生成</span>
          </div>
        </div>
      </a-modal>
    </div>

  </div>
</template>

<script>
  import { getToken } from '@/utils/auth';

  export default {
    components: {  },
    bizPath: {
      type: String,
      required: false,
      default: " ",
    },
    props: {
      'xendId':String,
    },

    data() {
      return {
        imageBaseBr:'',
        imageBasePo:'',
        today:'',
        khmc:'',
        zjhm:'',
        pomc:'',
        pozjhm:'',
        sfypo:false,
        outerVisible: false,
        innerVisibleBr: false,
        innerVisiblePo: false,
        dialogVisible: false,
        valueBr: null,
        valuePo: null,
        options:{
          canvasWidth: 800, //canvas宽高 [Number] 可选
          canvasHeight: 300,  //高度  [Number] 可选
          isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
          isShowBorder: false, //是否显示边框 [可选]
        },
        model:{},
      }
    },

    created() {
      // 设置文件按上传请求头
      this.requestHeader = { 'Authorization': 'Bearer ' + getToken('token') }
      this.initDate();
    },
    computed: {

    },

    methods: {
      initDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        this.today = year + '-' + month + '-' + day;
      },
      edit(data){
        this.model = data;
        this.khmc=data.khmc
        this.zjhm=data.zjhm
        this.pomc=data.pomc==''?'____________':data.pomc
        this.pozjhm=data.pozjhm==''?'____________':data.pozjhm
        this.sfypo=data.pozjhm==''?false:true
      },
      /**
       * 清除画板
       */
      canvasClear(){
        this.$refs.SignCanvas.canvasClear();
      },

      /**
       * 保存图片
       */
      saveAsImgBr(){
        const img = this.$refs.SignCanvas.saveAsImg();
        this.innerVisibleBr=false;
        this.imageBaseBr=img;
        this.$emit('getSignBase64', { imageBaseBr: this.imageBaseBr==""?this.valueBr:this.imageBaseBr, imageBasePo: this.imageBasePo==""?this.valuePo:this.imageBasePo })
      },
      saveAsImgPo(){
        const img = this.$refs.SignCanvas.saveAsImg();
        this.innerVisiblePo=false;
        this.imageBasePo=img;

        this.$emit('getSignBase64', { imageBaseBr: this.imageBaseBr==""?this.valueBr:this.imageBaseBr, imageBasePo: this.imageBasePo==""?this.valuePo:this.imageBasePo })

      },
    }
  }
</script>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .sign-canvas{
    display: block;
    margin: 0 auto;
    border: 1px dashed #f00;
  }
  .view-image{
    display: block;
    margin: 20px auto;
  }
  .sign-btns{
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    #clearBr,
    #clearPo,
    #saveBr,
    #savePo{
      margin: 0 auto;
      display: inline-block;
      padding: 5px 10px;
      width: 150px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #eee;
      background: #e1e1e1;
      border-radius: 10px;
      text-align: center;
      margin: 20px auto;
      cursor: pointer;
    }
  }
</style>













