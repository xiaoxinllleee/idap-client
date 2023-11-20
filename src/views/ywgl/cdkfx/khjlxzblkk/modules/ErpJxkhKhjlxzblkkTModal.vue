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
          label="考核月份">
          <a-month-picker
           disabled   v-decorator="[ 'khyf', {} ]"  format='YYYY-MM' style="width: 100%;"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input disabled v-decorator="['jgdm_dictText', {}]"  />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input disabled  v-decorator="['yggh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input disabled  v-decorator="['yggh_dictText', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理标识">
          <a-input  disabled v-decorator="['khjlbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期实扣（元）">
          <a-input   v-decorator="['bqsk', validatorRules.khyf]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "ErpJxkhKhjlxzblkkTModal",
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

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          bqsk:{rules:[{required:true,message:'本期时扣（元）不能为空'}]}
        },
        url: {
          add: "/khjlxzblkk/erpJxkhKhjlxzblkkT/add",
          edit: "/khjlxzblkk/erpJxkhKhjlxzblkkT/edit",
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
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
         this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jgdm_dictText','yggh','yggh_dictText','khjlbz','bqsk'))
		  // //时间格式化
          this.form.setFieldsValue({khyf:this.model.khyf?moment(this.model.khyf):null})
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
              httpurl+=this.url.edit;
               method = 'put';
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.khyf = formData.khyf?formData.khyf.format():null;
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


    }
  }
</script>

<style lang="less" scoped>

</style>