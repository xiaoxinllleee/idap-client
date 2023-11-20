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
          <a-date-picker v-decorator="[ 'tjrq', {}]" />
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
          label="乡镇">
          <a-input placeholder="请输入乡镇" v-decorator="['xz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="村社">
          <a-input placeholder="请输入村社" v-decorator="['xzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总潜在客户数">
          <a-input placeholder="请输入总潜在客户数" v-decorator="['qzzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理贷款业务客户数">
          <a-input placeholder="请输入潜在办理贷款业务客户数" v-decorator="['qzdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理存款业务客户数">
          <a-input placeholder="请输入潜在办理存款业务客户数" v-decorator="['qzckhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理网上银行客户数">
          <a-input placeholder="请输入潜在办理网上银行客户数" v-decorator="['qzwsyhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理手机银行客户数">
          <a-input placeholder="请输入潜在办理手机银行客户数" v-decorator="['qzsjyhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理ETC客户数">
          <a-input placeholder="请输入潜在办理ETC客户数" v-decorator="['qzetchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理E支付客户数">
          <a-input placeholder="请输入潜在办理E支付客户数" v-decorator="['qzezfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理E缴费客户数">
          <a-input placeholder="请输入潜在办理E缴费客户数" v-decorator="['qzejfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理POS机客户数">
          <a-input placeholder="请输入潜在办理POS机客户数" v-decorator="['qzposhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理助农终端客户数">
          <a-input placeholder="请输入潜在办理助农终端客户数" v-decorator="['qzznzdhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理理财业务客户数">
          <a-input placeholder="请输入潜在办理理财业务客户数" v-decorator="['qzlchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="潜在办理代理保险业务客户数">
          <a-input placeholder="请输入潜在办理代理保险业务客户数" v-decorator="['qzbxhs', {}]" />
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
    name: "XzckhqzywbbModal",
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
          add: "/tjfx.tjbb.khqzywbb/xzckhqzywbb/add",
          edit: "/tjfx.tjbb.khqzywbb/xzckhqzywbb/edit",
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
          this.form.setFieldsValue(pick(this.model,'sszh','xz','xzc','qzzhs','qzdkhs','qzckhs','qzwsyhhs','qzsjyhhs','qzetchs','qzezfhs','qzejfhs','qzposhs','qzznzdhs','qzlchs','qzbxhs'))
		  //时间格式化
          this.form.setFieldsValue({tjrq:this.model.tjrq?moment(this.model.tjrq):null})
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
            formData.tjrq = formData.tjrq?formData.tjrq.format():null;
            
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