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
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款总余额">
          <a-input placeholder="请输入存款总余额" v-decorator="['ckzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有余额户数">
          <a-input placeholder="请输入有余额户数" v-decorator="['yyehs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="储蓄户数">
          <a-input placeholder="请输入储蓄户数" v-decorator="['cxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="储蓄余额">
          <a-input placeholder="请输入储蓄余额" v-decorator="['cxye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对公户数">
          <a-input placeholder="请输入对公户数" v-decorator="['dghs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对公余额">
          <a-input placeholder="请输入对公余额" v-decorator="['dgye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="30岁以下户数">
          <a-input placeholder="请输入30岁以下户数" v-decorator="['sssyxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="30岁以下余额">
          <a-input placeholder="请输入30岁以下余额" v-decorator="['sssyxye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="30-50岁户数">
          <a-input placeholder="请输入30-50岁户数" v-decorator="['sszwsshs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="30-50岁余额">
          <a-input placeholder="请输入30-50岁余额" v-decorator="['sszwssye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="50-65岁户数">
          <a-input placeholder="请输入50-65岁户数" v-decorator="['wszlsshs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="50-65岁余额">
          <a-input placeholder="请输入50-65岁余额" v-decorator="['wszlssye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="65岁以上户数">
          <a-input placeholder="请输入65岁以上户数" v-decorator="['lswsyshs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="65岁以上余额">
          <a-input placeholder="请输入65岁以上余额" v-decorator="['lswsysye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="1万元至5万元户数">
          <a-input placeholder="请输入1万元至5万元户数" v-decorator="['ywzwwyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="1万元至5万元余额">
          <a-input placeholder="请输入1万元至5万元余额" v-decorator="['ywzwwyye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="5万元至10万元户数">
          <a-input placeholder="请输入5万元至10万元户数" v-decorator="['wwzswyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="5万元至10万元余额">
          <a-input placeholder="请输入5万元至10万元余额" v-decorator="['wwzswyye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="10万元至50万元户数">
          <a-input placeholder="请输入10万元至50万元户数" v-decorator="['swzwswyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="10万元至50万元余额">
          <a-input placeholder="请输入10万元至50万元余额" v-decorator="['swzwswyye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="50万元以上户数">
          <a-input placeholder="请输入50万元以上户数" v-decorator="['wswyyshs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="50万元以上余额">
          <a-input placeholder="请输入50万元以上余额" v-decorator="['wswyysye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="1万元以下户数">
          <a-input placeholder="请输入1万元以下户数" v-decorator="['ywyyxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="1万元以下余额">
          <a-input placeholder="请输入1万元以下余额" v-decorator="['ywyyxye', {}]" />
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
    name: "RepYwbbZhckjgqkbModal",
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
          add: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/add",
          edit: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','ckzye','yyehs','cxhs','cxye','dghs','dgye','sssyxhs','sssyxye','sszwsshs','sszwssye','wszlsshs','wszlssye','lswsyshs','lswsysye','ywzwwyhs','ywzwwyye','wwzswyhs','wwzswyye','swzwswyhs','swzwswyye','wswyyshs','wswyysye','ywyyxhs','ywyyxye'))
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