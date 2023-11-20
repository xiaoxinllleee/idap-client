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
          label="累计走访商户户数">
          <a-input placeholder="请输入累计走访商户户数" v-decorator="['ljshhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周走访企业户数">
          <a-input placeholder="请输入本周走访企业户数" v-decorator="['bzqyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计走访企业户数">
          <a-input placeholder="请输入累计走访企业户数" v-decorator="['ljqyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周合计走访户数">
          <a-input placeholder="请输入本周合计走访户数" v-decorator="['bzhjhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计合计走访户数">
          <a-input placeholder="请输入累计合计走访户数" v-decorator="['ljhjhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周采集信息">
          <a-input placeholder="请输入本周采集信息" v-decorator="['bzcjxx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计采集信息">
          <a-input placeholder="请输入累计采集信息" v-decorator="['ljcjxx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周评级户数">
          <a-input placeholder="请输入本周评级户数" v-decorator="['bzpjhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计评级户数">
          <a-input placeholder="请输入累计评级户数" v-decorator="['ljpjhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周授信金额">
          <a-input placeholder="请输入本周授信金额" v-decorator="['bzsxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计授信金额">
          <a-input placeholder="请输入累计授信金额" v-decorator="['ljsxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周用信金额">
          <a-input placeholder="请输入本周用信金额" v-decorator="['bzyxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计用信金额">
          <a-input placeholder="请输入累计用信金额" v-decorator="['ljyxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始日期">
          <a-date-picker v-decorator="[ 'ksrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-date-picker v-decorator="[ 'jsrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属支行">
          <a-input placeholder="请输入所属支行" v-decorator="['sszh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政村">
          <a-input placeholder="请输入行政村" v-decorator="['xzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组">
          <a-input placeholder="请输入组" v-decorator="['xzz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任人">
          <a-input placeholder="请输入责任人" v-decorator="['zkhjl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="辖内农户户数">
          <a-input placeholder="请输入辖内农户户数" v-decorator="['xnnhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="辖内商户户数">
          <a-input placeholder="请输入辖内商户户数" v-decorator="['xnshhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="辖内企业户数">
          <a-input placeholder="请输入辖内企业户数" v-decorator="['xnqyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周走访农户户数">
          <a-input placeholder="请输入本周走访农户户数" v-decorator="['bznhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计走访农户户数">
          <a-input placeholder="请输入累计走访农户户数" v-decorator="['ljnhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本周走访商户户数">
          <a-input placeholder="请输入本周走访商户户数" v-decorator="['bzshhs', {}]" />
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
    name: "ZgtModal",
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
          add: "/zgt/zgt/add",
          edit: "/zgt/zgt/edit",
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
          this.form.setFieldsValue(pick(this.model,'ljshhs','bzqyhs','ljqyhs','bzhjhs','ljhjhs','bzcjxx','ljcjxx','bzpjhs','ljpjhs','bzsxje','ljsxje','bzyxje','ljyxje','sszh','xzc','xzz','zkhjl','xnnhhs','xnshhs','xnqyhs','bznhhs','ljnhhs','bzshhs'))
		  //时间格式化
          this.form.setFieldsValue({ksrq:this.model.ksrq?moment(this.model.ksrq):null})
          this.form.setFieldsValue({jsrq:this.model.jsrq?moment(this.model.jsrq):null})
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
            formData.ksrq = formData.ksrq?formData.ksrq.format():null;
            formData.jsrq = formData.jsrq?formData.jsrq.format():null;
            
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