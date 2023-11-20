<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="目录/方案名称">
          <a-input hidden="true" placeholder="请输入上级id" v-decorator="['parentMenuId', validatorRules.parentMenuId ]" :disabled="!model.menuId"/>
          <a-input placeholder="请输入节点名称" v-decorator="['menuName', validatorRules.menuName ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="生效日期">
          <a-date-picker placeholder="请选择生效日期"  v-decorator="['validDate', validatorRules.validDate ]"  style="width: 100%"></a-date-picker>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="失效日期">
          <a-date-picker placeholder="请选择失效日期"  v-decorator="['invalidDate', validatorRules.invalidDate ]"  style="width: 100%"></a-date-picker>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="请输入方案描述" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附件">
<!--          <JUploadOne
            v-decorator="['uploadFile', {}]"
            :text="uploadText"
            class="upload-list-inline"
            biz-path="report"
          />-->
          <j-upload text="上传附件"
                    listType="text"
                    fileType="file"
                    :value="filePaths"
                    @change="UploadChange"
                    />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import JUpload from '@/components/jeecg/JUpload'

  export default {
    name: "MunuModal",
    components: {
      JUploadOne,JUpload
    },
    data () {
      return {
        title:"操作",
        filePaths:'',
        uploadText:'上传附件',
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          menuName:{rules: [{ required: true, message: '请输入目录名称!' }]},
          parentMenuId:{rules: [{ required: true, message: '请输入上级id!' }]},
          validDate:{rules: [{ required: true, message: '请选择生效日期!' }]},
          invalidDate:{rules: [{ required: true, message: '请选择失效日期!' }]},
        },
        url: {
          add: "/khlc/khfagl/pmaASchemeMenu/add",
          edit: "/khlc/khfagl/pmaASchemeMenu/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add (parentMenuId) {
        this.edit({parentMenuId:parentMenuId});
      },
      edit (record) {
        console.log('record',record)
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'menuName','parentMenuId','remark','fjlj'));
          this.form.setFieldsValue({validDate:this.model.validDate?moment(this.model.validDate):null})
          this.form.setFieldsValue({invalidDate:this.model.invalidDate?moment(this.model.invalidDate):null})
         // this.form.setFieldsValue({uploadFile:this.model.fjlj?{name:this.model.fjmc,path:this.model.fjlj}:{}})
          this.filePaths=this.model.fjlj;
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
            if(!this.model.menuId){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            //formData.fjmc = formData.uploadFile.name
            //formData.fjlj = formData.uploadFile.path
            //delete formData.uploadFile;
            formData.fjlj=this.filePaths;
            console.log(formData)

            formData.validDate = formData.validDate?formData.validDate.format("YYYY-MM-DD"):null;
            formData.invalidDate = formData.invalidDate?formData.invalidDate.format("YYYY-MM-DD"):null;

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
      UploadChange(data) {
        let path = data.path
        this.filePaths=path;
        console.log(path)
        console.log(this.filePaths);
        let deletePath = data.deletePath
        let paths = path.split(',');

       /* paths.forEach((value, index)=>{
          if (value.length > 0) {
            if(this.customerVisitModel.customerVisitFjxxVideo.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.fjlx = 2;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxVideo.push(fjxx)
            }
          }
        })*/
      }

    }
  }
</script>

<style lang="less" scoped>

</style>