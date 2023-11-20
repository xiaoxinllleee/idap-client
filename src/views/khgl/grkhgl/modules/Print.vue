<template>
  <div>
  <a-modal :width="900"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    <a-card :bordered="false" :class="{'abcdefg':true}">
      <div class="no-print" style="text-align: right">
        <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
      </div>
      <section ref="print" id="printContent" class="abcdefg">
        <div style="overflow:auto;height: 80%;">
          <div
            style="font-size:25px;font-family: '宋体'; font-weight: bold; text-align:center; padding-bottom:20px; padding-top:20px;">
            信用信息查询、使用授权书
          </div>
          <div style="font-size:15px;font-family: '宋体'; padding-bottom:10px;"><span
            style="font-family: '宋体'; font-weight: bold;">湖南浏阳农村商业银行股份有限公司（以下简称“贵行”）：</span><br>
            <div style="padding-bottom: 8px">
              <span>（选择在□内划“√”，不选择的划“×”，选择的人、单位统称“授权人”）</span>
            </div>
            <div style="padding-bottom: 8px">
              <span >&nbsp;&nbsp;☑ 本人（姓名：<span style="text-decoration:underline;">&nbsp;&nbsp;{{this.model.khmc}}&nbsp;&nbsp;</span>，身份证号码：<span
                style="text-decoration:underline;">&nbsp;&nbsp;{{this.model.zjhm}}&nbsp;&nbsp;</span>）；</span>
            </div>
            <div style="padding-bottom: 8px" v-if="poxm==null">
              <span >&nbsp;&nbsp;{{flag}}  授权人配偶（姓名：<span style="text-decoration:underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>，身份证号码：<span
                style="text-decoration:underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>）；</span><br>
            </div>
            <div style="padding-bottom: 8px" v-else>
              <span >&nbsp;&nbsp;{{flag}}  授权人配偶（姓名：<span style="text-decoration:underline;">&nbsp;&nbsp;{{poxm}}&nbsp;&nbsp;</span>，身份证号码：<span
                style="text-decoration:underline;">&nbsp;&nbsp;{{pozjhm}}&nbsp;&nbsp;</span>）；</span><br>
            </div>
            <div style="padding-bottom: 8px">
              <span >&nbsp;&nbsp;□ 本单位：<span style="text-decoration:underline;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> </span>
            </div>

            <div style="padding-bottom: 8px">
              <span >&nbsp;&nbsp;□ 本人（姓名：<span style="text-decoration:underline;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，身份证号码<span
                style="text-decoration:underline;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ），作为（以下简称“授权人单位”）的法定代表人；</span>
            </div>
            <div style="padding-bottom: 1px">
              <span >&nbsp;&nbsp;□ 本人（姓名：<span style="text-decoration:underline;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  ，身份证号码<span
                style="text-decoration:underline;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ），作为（以下简称“授权人单位”）的财务控管人；</span>
            </div>

            <br>
            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">一、授权人在贵行办理下述<span
              style="text-decoration:underline;"> &nbsp;&nbsp;&nbsp;&nbsp;</span>业务（以下简称“授权业务”）：</span><br>
            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">1、授信业务，具体业务品种以授信合同的约定为准；2、贷款；3、信用卡；4、保函；5、票据承兑；6、票据贴现；7、担保；8、保理；9、贸易融资业务，包括但不限于信用证、进口押汇、出口押汇、进口代付、打包贷款、提货担保；10、其他：<span
              style="text-decoration:underline;"> &nbsp;&nbsp;&nbsp;&nbsp;</span></span><br>
            <br>
            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">二、为申请、审批、办理授权业务以及授权业务叙作期间监控授权人及其配偶（如有）信用和经营变化，授权人及其配偶（如有）在此不可撤销的授权贵行：</span><br>

            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">1、向中国人民银行个人或企业信用信息基础数据库（以下简称“人行数据库”）查询及使用授权人及其配偶（如有）个人或企业信息，包括基本信息和信用报告。</span><br>
            &nbsp;&nbsp;

            <span style="font-family: 宋体;line-height: 10px">2、将授权人基本信息和信用记录发送给人行数据库。</span><br>
            <br>
            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">三、授权期间：自授权人向贵行提交授权业务申请之日起，至授权人或授权人单位在贵行叙作的授权业务额度到期及结清之日、或授权人履行完毕担保责任之日止。</span><br>
            <br>
            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">四、为了贵行能够履行上述受权事宜，授权人及其配偶（如有）同意向贵行指定经办人员提交有效身份证明、资信证明文件的原件及复印件。未经授权人及其配偶（如有）同意，贵行不得将前述证件用于其他用途。</span><br>

            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">超出本授权书授权范围的后果由贵行承担。</span><br>
            <br>
            &nbsp;&nbsp;<span style="font-family: 宋体;line-height: 10px">授权人及其配偶（如有）承诺已充分知悉并理解本授权书的内容。本授权书自授权人及其配偶（如有）签署之日起生效，至授权期间届满之日终止。</span>

          </div>
          <div style="font-size:15px; text-align:right; padding-right:50px;padding-bottom:5px">
            <div id="myImg">
              <span style="font-family: 宋体">授权人签字：</span>
              <img ref="Imgsqr" id="Imgsqr" :src="photoPath2">
            </div>
          </div>
          <div style="font-size:15px; text-align:right; padding-right:10px;padding-bottom:5px">
            <span style="margin-right: 90px;font-family: 宋体"> {{this.model.date}}</span>
          </div>
          <div style="font-size:15px; text-align:right; padding-right:60px;padding-bottom:5px">
            <div id="myImg2">
              <span style="font-family: 宋体">配偶签字：</span>
              <img ref="Imgpo" id="Imgpo" :src="photoPath1">
            </div>
          </div>
          <div style="font-size:15px; text-align:right; padding-right:10px;padding-bottom:5px">
            <span style="margin-right: 90px;font-family: 宋体"> {{this.model.date}}</span>
          </div>
          <div style="font-size:15px;font-family: 宋体; text-align:right; padding-right:30px;padding-bottom:10px;">
            （自然人签字，单位法定代表人签字并加盖公章）
          </div>
      <!--    <div style="font-size:15px; font-family: 宋体;text-align:left; padding-right:30px;padding-bottom:30px; ">
            备注：如上述选择7担保，系作为借款人<span style="text-decoration:underline;">&nbsp;{{this.model.khmc}}&nbsp;</span> 的担保人。
          </div>-->
          <div style="font-size:20px; font-family: 宋体;padding-bottom:10px;text-align: center"><span
            style="font-family: '宋体';font-weight: bold;">经办客户经理声明</span></div>
          <div style="font-size:15px;font-family: 宋体; text-align:left; padding-right:30px;padding-bottom:30px;">
            该笔征信查询是本人面签办理的签署事宜，本人愿意对上述面签事实负责。
          </div>
          <div style="font-size:15px;font-family: 宋体; text-align:right; padding-right:130px;padding-bottom:30px">
            经办客户经理签字：{{this.model.khjl_dictText}}
          </div>
        </div>
      </section>
    </a-card>
    <!--</page-layout>-->
  </a-modal>
    <div ref="pronbit"/>

  </div>
</template>

<script>
  import ACol from 'ant-design-vue/es/grid/Col'
  import ARow from 'ant-design-vue/es/grid/Row'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import { httpAction, putAction, getAction, downFile } from '@/api/manage'

  export default {
    components: {
      ATextarea,
      ARow,
      ACol
    },
    name: 'Printgzsld',
    props: {
      reBizCode: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        photoPath2: '',
        photoPath1: '',
        nbsp: '',
        poxm: '',
        pozjhm: '',
        jtnsr: ' ',
        jtnzc: ' ',
        jtcsr: ' ',
        sj: 5,
        nhxxcj: {},
        model: {},
        flag: '□',
        visible: false,
        confirmLoading: false,
        lists: [
          { id: 1, xm: '张三', nl: 22 }, { id: 2, xm: '王五', nl: 21 }, { id: 3, xm: '赵柳', nl: 23 }
        ],

        columns: [{}
        ],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        previewVisible: false,
        previewImage: '',

        url: {
          loadApplicant: '/sps/register/loadApplicants',
          loadRegisterFiles: '/sps/register/getRegisterFilesConfig',
          khxxcjportXlsUrl: '/nh/nhjbxx/khxxcjexportXls'
        }
      }
    },
    created() {
      this.getDate()
    },
    mounted () {

    },
    methods: {
      int(){
        let _that=this;

        _that.$refs['pronbit'].scrollIntoView(true)
      },
      edit(record) {
        if (record.sign2!=null){
          this.photoPath2 = window._CONFIG['staticDomainURL'] + '/' + record.sign2
        }else {
          this.photoPath2 = " ";
        }

        if (record.sign3!=null){
          this.photoPath1 = window._CONFIG['staticDomainURL'] + '/' + record.sign3
        }else {
          this.photoPath1 = " ";
        }

        let year = record.lrsj.substring(0, 4)
        let month = record.lrsj.substring(5, 7)
        let day = record.lrsj.substring(8, 10)
        let date = year + '年' + month + '月' + day + '日'
        this.model = Object.assign({ date }, record)
        if (record.zjhm) {
          console.log('加载家庭相关情况字表数据')
          getAction('/khgl/vKhglKrkhgl/family', { hhbm: record.hhbm, zjhm: record.zjhm }).then((res) => {
            if (res.success) {
              console.log('---家庭信息-----')
              console.log(res.result)
              if (res.result.xm != null) {
                this.flag = '☑'
                this.poxm = res.result.xm
                this.pozjhm = res.result.zjhm
              } else {
                this.flag = '□'
                this.poxm = null
              }


            }
          })
        }
        this.visible = true
      },

      loadData() {

      },
      getDate() {
        // 当前时间
      },
      handleCancel() {
        this.previewVisible = false
        this.close()
      },
      handleOk() {
        this.previewVisible = false
        this.close()
      },
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange({ fileList }) {
        this.fileList = fileList
      },

      close() {
        this.$emit('close')
        this.visible = false
      }


    }
  }
</script>
<style scoped>
  img {
    width: 70px;
  }

  .abcdefg .ant-card-body {
    margin-left: 0%;
    margin-right: 0%;
    margin-bottom: 1%;
    border: 0px solid black;
    min-width: 800px;
  }

  .explain {
    text-align: left;
    margin-left: 50px;
  }

  .explain .ant-input, .sign .ant-input {
    font-weight: bolder;
    text-align: center;
    border-left-width: 0px !important;
    border-top-width: 0px !important;;
    border-right-width: 0px !important;;
  }

  .explain div {
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