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
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="走访户数">
          <a-input placeholder="请输入走访户数" v-decorator="['zfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中有效户数">
          <a-input placeholder="请输入其中有效户数" v-decorator="['qzyxzfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评议户数">
          <a-input placeholder="请输入评议户数" v-decorator="['pyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中电子评议">
          <a-input placeholder="请输入其中电子评议" v-decorator="['qzdzpy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中纸质评议">
          <a-input placeholder="请输入其中纸质评议" v-decorator="['qzzzpy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中开会评议">
          <a-input placeholder="请输入其中开会评议" v-decorator="['qzhypy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中电话评议">
          <a-input placeholder="请输入其中电话评议" v-decorator="['qzdhpy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中微信评议">
          <a-input placeholder="请输入其中微信评议" v-decorator="['qzwxpy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷系统授信户数">
          <a-input placeholder="请输入信贷系统授信户数" v-decorator="['xdxtsxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷系统授信金额">
          <a-input placeholder="请输入信贷系统授信金额" v-decorator="['xdxtsxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平板授信户数">
          <a-input placeholder="请输入平板授信户数" v-decorator="['pbdsxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平板端授信金额">
          <a-input placeholder="请输入平板端授信金额" v-decorator="['pbdsxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信工作评议户数">
          <a-input placeholder="请输入授信工作评议户数" v-decorator="['sxgzpyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公示户数">
          <a-input placeholder="请输入公示户数" v-decorator="['gshs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公示金额">
          <a-input placeholder="请输入公示金额" v-decorator="['gsje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信户数">
          <a-input placeholder="请输入用信户数" v-decorator="['yxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信金额">
          <a-input placeholder="请输入用信金额" v-decorator="['yxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="7月贷款净增户">
          <a-input placeholder="请输入7月贷款净增户" v-decorator="['qydkjzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他户数净增">
          <a-input placeholder="请输入其他户数净增" v-decorator="['qthsjz', {}]" />
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
    name: "TjfxJrphsjQhModal",
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
        },
        url: {
          add: "/TjfxJrphsjQh/tjfxJrphsjQh/add",
          edit: "/TjfxJrphsjQh/tjfxJrphsjQh/edit",
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
          this.form.setFieldsValue(pick(this.model,'zfhs','qzyxzfhs','pyhs','qzdzpy','qzzzpy','qzhypy','qzdhpy','qzwxpy','xdxtsxhs','xdxtsxje','pbdsxhs','pbdsxje','sxgzpyhs','gshs','gsje','yxhs','yxje','qydkjzh','qthsjz'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
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
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            
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