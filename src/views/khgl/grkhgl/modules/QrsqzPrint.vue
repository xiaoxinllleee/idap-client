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
            信息提供者签字确认书
          </div>
          <div style="font-size:15px;font-family: '宋体'; padding-bottom:10px;"><span
            style="font-family: '宋体'; font-weight: bold;">以上信息本人自愿提供，仅用于浏阳农商行评级授信，浏阳农商行将严格保护您的个人信息安全。</span><br>
          </div>
          <div style="font-size:15px; text-align:right; padding-right:50px;padding-bottom:5px">
            <div id="myImg">
              <span style="font-family: 宋体">信息提供者签章：</span>
              <img ref="Imgsqr" id="Imgsqr" :src="photoPath2">
            </div>
          </div>
          <div style="font-size:15px; text-align:right; padding-right:10px;padding-bottom:5px">
            <span style="margin-right: 90px;font-family: 宋体"> {{this.model.date}}</span>
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
        console.log(record)
        if (record.sign1!=null){
          this.photoPath2 = window._CONFIG['staticDomainURL'] + '/' + record.sign1
        }
        let year = record.lrsj.substring(0, 4)
        let month = record.lrsj.substring(5, 7)
        let day = record.lrsj.substring(8, 10)
        let date = year + '年' + month + '月' + day + '日'
        this.model = Object.assign({ date }, record)
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