<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标识">
          <a-input placeholder="请输入组织标识" v-decorator="['sszh', validatorRules.sszh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', validatorRules.tjyf ]" />
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
          label="其中电子评议人数">
          <a-input placeholder="请输入其中电子评议人数" v-decorator="['qzdzpyrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中纸质评议人数">
          <a-input placeholder="请输入其中纸质评议人数" v-decorator="['qzzzpyrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中开会评议人数">
          <a-input placeholder="请输入其中开会评议人数" v-decorator="['qzhypyrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中电话评议人数">
          <a-input placeholder="请输入其中电话评议人数" v-decorator="['qzdhpyrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其中微信评议人数">
          <a-input placeholder="请输入其中微信评议人数" v-decorator="['qzwxpyrs', {}]" />
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
          label="评议户数排名">
          <a-input placeholder="请输入评议户数排名" v-decorator="['pyhspm', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "TjfxKhbkbpyZkhjlModal",
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
        sszh:{rules: [{ required: true, message: '请输入组织标识!' }]},
        tjyf:{rules: [{ required: true, message: '请输入统计月份!' }]},
        },
        url: {
          add: "/TjfxKhbkbpyZkhjl/tjfxKhbkbpyZkhjl/add",
          edit: "/TjfxKhbkbpyZkhjl/tjfxKhbkbpyZkhjl/edit",
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
          this.form.setFieldsValue(pick(this.model,'sszh','pyhs','qzdzpyrs','qzzzpyrs','qzhypyrs','qzdhpyrs','qzwxpyrs','zkhjl','pyhspm'))
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
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>