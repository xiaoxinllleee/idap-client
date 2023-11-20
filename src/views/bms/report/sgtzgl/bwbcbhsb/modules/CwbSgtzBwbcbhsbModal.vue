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
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['sjrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_项目名称">
          <a-input placeholder="请输入资产收益情况_项目名称" v-decorator="['zcxmmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_行号">
          <a-input placeholder="请输入资产收益情况_行号" v-decorator="['hh1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_平均余额(万元)">
          <a-input placeholder="请输入资产收益情况_平均余额(万元)" v-decorator="['zcpjye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_实收利息额(元)">
          <a-input placeholder="请输入资产收益情况_实收利息额(元)" v-decorator="['zcshlxe', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_收息率(百分比)">
          <a-input placeholder="请输入资产收益情况_收息率(百分比)" v-decorator="['zcshl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_比重(百分比)">
          <a-input placeholder="请输入资产收益情况_比重(百分比)" v-decorator="['zcbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_执行利率加权(百分比)">
          <a-input placeholder="请输入资产收益情况_执行利率加权(百分比)" v-decorator="['zczxlljq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产收益情况_应收利息额(元)">
          <a-input placeholder="请输入资产收益情况_应收利息额(元)" v-decorator="['zcyslxe', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_项目名称">
          <a-input placeholder="请输入负债支出及所有者权益情况_项目名称" v-decorator="['fzxmmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_行号">
          <a-input placeholder="请输入负债支出及所有者权益情况_行号" v-decorator="['hh2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_平均余额(万元)">
          <a-input placeholder="请输入负债支出及所有者权益情况_平均余额(万元)" v-decorator="['fzpjye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_实付利息额(元)">
          <a-input placeholder="请输入负债支出及所有者权益情况_实付利息额(元)" v-decorator="['fzsflxe', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_付息率(百分比)">
          <a-input placeholder="请输入负债支出及所有者权益情况_付息率(百分比)" v-decorator="['fzfxl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_比重(百分比)">
          <a-input placeholder="请输入负债支出及所有者权益情况_比重(百分比)" v-decorator="['fzbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_执行利率加权(百分比)">
          <a-input placeholder="请输入负债支出及所有者权益情况_执行利率加权(百分比)" v-decorator="['fzzxlljq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负债支出及所有者权益情况_应付利息额(元)">
          <a-input placeholder="请输入负债支出及所有者权益情况_应付利息额(元)" v-decorator="['fzyslxe', {}]" />
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
    name: "CwbSgtzBwbcbhsbModal",
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
          add: "/cwbsgtz/cwbSgtzBwbcbhsb/add",
          edit: "/cwbsgtz/cwbSgtzBwbcbhsb/edit",
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
          this.form.setFieldsValue(pick(this.model,'sjrq','zcxmmc','hh1','zcpjye','zcshlxe','zcshl','zcbz','zczxlljq','zcyslxe','fzxmmc','hh2','fzpjye','fzsflxe','fzfxl','fzbz','fzzxlljq','fzyslxe'))
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


    }
  }
</script>

<style lang="less" scoped>

</style>