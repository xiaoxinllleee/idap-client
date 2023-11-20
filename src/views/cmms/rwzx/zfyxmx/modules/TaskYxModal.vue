<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :ok-button-props="{ props: { disabled: true } }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-divider orientation='left' style='color: #1890FF;margin-top: -20px;'>营销详情</a-divider>
        <a-row :gutter="24">
          <a-col  :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销结果">
              <j-dict-select-tag placeholder="请选择营销结果" v-decorator="['yxjg', {}]"    :triggerChange="true"  dict-code="yxjg" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col  :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销方式">
              <j-dict-select-tag placeholder="请选择营销方式" v-decorator="['yxfs', {}]"    :triggerChange="true"  dict-code="zfyxfs" :disabled="true"/>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24" v-show="row.yxjg=='2'">
          <a-col  :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销失败原因">
              <a-checkbox-group   v-model="sbyyList" :options="sbyyOptions" :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-show="row.yxjg=='1'">
          <a-col  :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销成功产品">
              <a-checkbox-group   v-model="yxcpList" :options="Options"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider orientation='left' style='color: #1890FF;margin-top: -20px;'>客户意向</a-divider>

        <a-row :gutter="24">
          <a-col  :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户意向需求">
              <a-checkbox-group   v-model="khyxList" :options="Options"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider orientation='left' style='color: #1890FF;margin-top: -20px;'>营销佐证</a-divider>
        <a-row>
          <a-col :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="佐证附件信息">
              <j-upload text="上传图片"
                        fileType="image"
                        listType="picture"
                        :disabled="true"
                        class="upload-list-inline"
                        :value="imagePaths"
                        @change="imageUploadChange"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col  :lg="24">
             <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col  :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="地址">
              <a-input placeholder="请输入地址" v-decorator="['dz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>



      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'

  import pick from 'lodash.pick'
  import moment from "moment"
  import Vue from 'vue'
  import JUpload from '@/components/jeecg/JUpload'
  import AFormItem from 'ant-design-vue/lib/form/FormItem'

  export default {
    name: "TaskZfyxmxModal",
    components:{  JUpload },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        headers:{},
        imagePaths:'',
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
          customerVisitFjxxImage: [{}], //图片
          customerVisitFjxxVideo: [{}], //视频
          customerVisitFjxxAudio: [{}], //音频
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
        let params = {id:record.id,fjlx:1}
         if(record.yxcp){
           this.yxcpList=record.yxcp.split(',');
         }
        if(record.khyx){
          this.khyxList=record.khyx.split(',');
        }
        if(record.yxsbyy){
          this.sbyyList=record.yxsbyy.split(',');
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'rwmc','mxsjid','yxlx','yxfs','yxjg','yxcp','yxsbyy','khyx','jd','wd','bz','yxzfr','dz'))
          getAction('/zfyxmx/taskZfyxmx/queryFjxx',params).then((res)=>{
            if(res.success){
              let path = ''
              let arr = [];
              arr=res.result;
              if(arr.length>0){
                path = arr.join(",")
              }
              this.imagePaths = path;
              this.$forceUpdate()
            }
          })
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化

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



          }
        })
      },
      handleCancel () {
        this.close()
      },
      imageUploadChange(data) {
        let path = data.path
        let deletePath = data.deletePath
        let paths = path.split(',');
        console.log("path")
        console.log(path)
        console.log(paths)
        if (deletePath.length > 0) {
          let deletePaths = deletePath.split(',')
          deletePaths.forEach((value, index)=>{
            let image = this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })
            if (image) {
              image.lrbz = 3
            }
          })
        }
        paths.forEach((value, index)=>{
          if (value.length > 0) {
            if(this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.fjlx = 1;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxImage.push(fjxx)
            }
          }

        })
      },

    }
  }
</script>

<style lang="less" scoped>

</style>