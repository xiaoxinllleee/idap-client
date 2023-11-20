<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-divider orientation='left' style='color: #1890FF;margin-top: -20px;'>上传录音</a-divider>
        <a-row>
          <a-col :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="录音">
              <j-upload text="上传录音"
                        fileType="file"
                        listType="text"
                        class="upload-list-inline"
                        :value="audioPaths"
                        @change="videoUploadChange"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction,putAction  } from '@/api/manage'

  import pick from 'lodash.pick'
  import moment from "moment"
  import Vue from 'vue'
  import JUpload from '@/components/jeecg/JUpload'
  import AFormItem from 'ant-design-vue/lib/form/FormItem'

  export default {
    name: "TaskSclyModal",
    components:{  JUpload },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        headers:{},
        imagePaths:'',
        audioPaths:'',
        videoPaths: "",
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        yxcpList:[],
        sbyyList:[],
        khyxList:[],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        Options : [
          { label: '存款', value: '1' },
          { label: '贷款', value: '2' },
          { label: 'ETC', value: '3' },
          { label: '手机银行', value: '4' },
          { label: '社保卡', value: '9' },
          { label: '福祥E支付', value: '6' },
          { label: '信用卡', value: '7' },
          { label: 'POS机', value: '8' }
        ],
        sbyyOptions : [
          { label: '产品无优势', value: '1' },
          { label: '直接拒绝', value: '2' },
          { label: '他行已开通', value: '3' },
          { label: '其他', value: '4' },
        ],
        row:{

        },
        customerVisitModel: {
          customerVisitFjxxAudio: [], //音频
        },
        url: {
          add: "/zfyxmx/taskZfyxmx/add",
          edit: "/zfyxmx/taskZfyxmx/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        console.log(record)
        this.row=record;
        let params = {id:record.id,fjlx:3}
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          getAction('/zfyxmx/taskZfyxmx/queryFjxx',params).then((res)=>{
            if(res.success){
              let path = ''
              let arr = [];
              arr=res.result;
              if(arr.length>0){
                path = arr.join(",")
              }
              this.audioPaths = path;
            }
          })
		  //时间格式化
        });

      },
      close () {
        this.audioPaths='';
        this.customerVisitModel.customerVisitFjxxAudio=[];
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        console.log(this.customerVisitModel.customerVisitFjxxAudio)
        if(!this.customerVisitModel.customerVisitFjxxAudio){
          that.errorInfo('请上传录音');
          return
        }
        //时间格式化
       let formdata= Object.assign({}, this.row,{fjxxList:this.customerVisitModel.customerVisitFjxxAudio});
         putAction('/zfyxmx/taskZfyxmx/addLycl',formdata).then((res)=>{
           if(res.success){
             that.$message.success(res.message);
             that.$emit('ok');
           }else{
             that.$message.warning(res.message);
           }
         }).finally(() => {

           that.close();
         })
      },
      handleCancel () {
        this.close()
      },
      errorInfo (val) {
        this.$message.error(val)
      },
      videoUploadChange(data) {
        this.customerVisitModel.customerVisitFjxxAudio=[];
        let path = data.path
        let deletePath = data.deletePath
        let paths = path.split(',');
        if (deletePath.length > 0) {
          let deletePaths = deletePath.split(',')
          deletePaths.forEach((value, index)=>{
            let image = this.customerVisitModel.customerVisitFjxxAudio.find((item)=>{
              return item.fwlj===value;
            })
            if (image) {
              image.lrbz = 3
            }
          })
        }
        paths.forEach((value, index)=>{
          if (value.length > 0) {
            if(this.customerVisitModel.customerVisitFjxxAudio.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.zllx = 3;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxAudio.push(fjxx)
            }
          }
        })

        console.log( this.customerVisitModel.customerVisitFjxxAudio)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>