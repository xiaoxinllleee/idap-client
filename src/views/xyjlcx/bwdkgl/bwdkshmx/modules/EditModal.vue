<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {postAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "EditModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        title:"调整表外贷款收回信息",
        visible: false,
        disabled: false,
        confirmLoading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
          rzwd: {rules: [{required: true, message: '请输入入账网点!'}]}
        },
        url: {
          save: "/bwdkshmx/bwdkshmx/editSave",
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
          this.form.setFieldsValue(pick(this.model, 'qsyggh', 'rzwd', 'zh', 'jkrxm', 'zjhm', 'shbxje', 'shbbbj', 'shhxbj', 'shhxlx', 'shlx', 'bz', 'qskhjl'))
          //时间格式化
          this.form.setFieldsValue({rzsj: this.model.rzsj ? moment(this.model.rzsj) : null})
        })
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
            let formData = Object.assign(this.model, values);
            //日期/时间格式化
            //入账时间
            //formData.rzsj = formData.rzsj ? formData.rzsj.format() : null;
            console.log('handlerOK formdata:',formData)
            postAction(this.url.save,formData).then((res)=>{
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
    }
  }
</script>

<style lang="less" scoped>
</style>