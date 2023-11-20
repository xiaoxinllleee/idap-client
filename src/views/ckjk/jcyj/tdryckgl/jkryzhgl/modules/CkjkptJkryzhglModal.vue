<template>
  <a-modal :title="title"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构代码">
          <a-input placeholder="" v-model="this.branchNo" disabled></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户姓名">
          <a-input placeholder="" v-model="this.custName" disabled></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
          <a-input placeholder="" v-model="this.identNo" disabled></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款账号">
          <a-input placeholder="" v-model="this.subAcctNo" disabled></a-input>
          <a-button @click="findAndBringBack" type="primary" icon="plus" size="small">查找带回</a-button>
        </a-form-item>

      </a-form>
    </a-spin>

    <find-and-bring-back ref="findandbringback" @selectFinished="selectOK"></find-and-bring-back>

  </a-modal>
</template>

<script>
  import FindAndBringBack from "@/views/ckjk/jcyj/tdryckgl/tdrqckzhgl/modules/FindAndBringBack";
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {notification} from "ant-design-vue";

  export default {
    name: "CkjkptJkryzhglModal",
    components: {
      FindAndBringBack,
      JTreeSelect,
    },
    data () {
      return {
        title:"操作",
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
        branchNo: "",
        custName: "",
        identNo: "",
        subAcctNo: "",
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          add: "/CkjkptJkryzhgl/ckjkptJkryzhgl/add",
          edit: "/CkjkptJkryzhgl/ckjkptJkryzhgl/edit",
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
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'subAcctNo','identNo','branchNo','custName'))
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
            formData.branchNo = this.branchNo
            formData.custName = this.custName
            formData.identNo = this.identNo
            formData.subAcctNo = this.subAcctNo
            if (formData.identNo === null || formData.identNo === "") {
              notification.warning({message: '系统提示', description: '证件号码不能为空！', duration: 4})
              return
            }
            if (formData.subAcctNo === null || formData.subAcctNo === "") {
              notification.warning({message: '系统提示', description: '账号不能为空！', duration: 4})
              return
            }
            console.log(formData)
            that.confirmLoading = true;
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
      //查找带回
      findAndBringBack() {
        this.$refs.findandbringback.onClearSelected()
        this.$refs.findandbringback.visible = true
      },
      selectOK: function (data) {
        console.info('selectOK-data:',data)
        this.branchNo = data[0].branchNo
        this.custName = data[0].custName
        this.identNo = data[0].identNo
        this.subAcctNo = data[0].subAcctNo
        console.info('查找带回的客户信息:',this.branchNo,this.custName,this.identNo,this.subAcctNo)
      },
    }
  }
</script>

<style lang="less" scoped>

</style>