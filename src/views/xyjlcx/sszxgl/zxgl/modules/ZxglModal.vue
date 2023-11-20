<template>
  <a-modal
    :title="title"
    :width="1250"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号/卡号">
          <a-input placeholder="请输入账号/卡号" @blur="judgeCkzh" v-decorator="['zh', validatorRules.zh ]" :disabled="this.disabled" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务机构">
          <a-input placeholder="" v-decorator="['ywjg', {}]" :disabled="true" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="" v-decorator="['zjhm', {}]" :disabled="true" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人姓名">
          <a-input placeholder="" v-decorator="['jkrxm', {}]" :disabled="true" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请执行日期">
          <a-date-picker v-decorator="[ 'sqzxrq', validatorRules.sqzxrq ]" style="width: 100%" :disabled="this.disabled" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="执行本金">
          <a-input placeholder="请输入执行本金" v-decorator="['zxbj', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="执行利息">
          <a-input placeholder="请输入执行利息" v-decorator="['zxlx', {}]" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="待执行金额">
          <a-input placeholder="请输入待执行金额" v-decorator="['dzxje', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="执行案号">
          <a-input placeholder="请输入执行案号" v-decorator="['zxah', {}]" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前执行法院">
          <a-input placeholder="请输入当前执行法院" v-decorator="['dqzxfy', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可供执行财产额">
          <a-input placeholder="请输入可供执行财产额" v-decorator="['kgzxcce', {}]" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押担保人">
          <a-input placeholder="请输入抵押担保人" v-decorator="['dydbr', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>
          </a-col>
        </a-row>

		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction} from "../../../../../api/manage";

  export default {
    name: "ZxglModal",
    components:{
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
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
        ckzhflag:false,
        form: this.$form.createForm(this),
        validatorRules:{
        zh:{rules: [{ required: true, message: '请输入账号/卡号!' }]},
        sqzxrq:{rules: [{ required: true, message: '请输入申请执行日期!' }]},
        },
        url: {
          add: "/zxgl/zxgl/add",
          edit: "/zxgl/zxgl/edit",
          judgeCkzh: '/zxgl/zxgl/judgeCkzh'
        },
      }
    },
    created () {
    },
    methods: {
      judgeCkzh () {
        let zh=this.form.getFieldValue('zh');
        getAction(this.url.judgeCkzh, {zh:zh}).then((res)=>{
          if(!res.success){
            this.$message.warning("账号/卡号不存在，请核实！")
          }else {
            // this.queryParam.ywjg=res.result.ywjg;
            // this.queryParam.jkrxm=res.result.jkrxm;
            // this.queryParam.zjhm=res.result.zjhm;
            // this.queryParam.je=res.result.je;
            // this.queryParam.ye=res.result.ye;
            // this.model = Object.assign({}, this.queryParam)
            this.$nextTick(() => {
              this.form.setFieldsValue(pick(res.result, 'ywjg','jkrxm', 'zjhm'))  // loadsh的pick方法
            })
            this.ckzhflag=true;
          }
        })
      },

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'ywjg','zjhm','jkrxm','zh','zxbj','zxlx','dzxje','zxah','dqzxfy','kgzxcce','dydbr','bz'))
		  //时间格式化
          this.form.setFieldsValue({sqzxrq:this.model.sqzxrq?moment(this.model.sqzxrq):null})
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
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
            if(!this.model.zh && !this.model.sqzxrq){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.sqzxrq = formData.sqzxrq?formData.sqzxrq.format():null;
            /*formData.lrsj = formData.lrsj?formData.lrsj.format():null;*/
            
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