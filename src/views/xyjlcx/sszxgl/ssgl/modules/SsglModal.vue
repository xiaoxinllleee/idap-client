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
          label="申请日期">
          <a-date-picker v-decorator="[ 'sqrq', validatorRules.sqrq]" style="width: 100%" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号/卡号">
          <a-input placeholder="请输入账号/卡号" @blur="judgeCkzh" v-decorator="['zh', validatorRules.zh ]" :disabled="this.disabled" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务机构">
          <a-input placeholder="" v-decorator="['ywjg', validatorRules.ywjg ]" :disabled="true" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="" v-decorator="['zjhm', {}]" :disabled="true" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人姓名">
          <a-input placeholder="" v-decorator="['jkrxm', {}]" :disabled="true" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金额">
          <a-input placeholder=""  v-decorator="['je', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="余额">
          <a-input placeholder="请输入余额" v-decorator="['ye', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合规审查日期">
          <a-date-picker v-decorator="[ 'hgscrq', {}]" style="width: 100%"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行联系人">
          <a-input placeholder="请输入支行联系人" v-decorator="['zhlxr', {}]" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="被申请执行人">
          <a-input placeholder="请输入被申请执行人" v-decorator="['bsqzxr', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起诉日期">
          <a-date-picker v-decorator="[ 'qsrq', {}]" style="width: 100%"/>
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="生效法律文书号">
          <a-input placeholder="请输入生效法律文书号" v-decorator="['sxflwsh', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件受理费">
          <a-input placeholder="请输入案件受理费" v-decorator="['ajslf', {}]" />
        </a-form-item>
          </a-col>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="律师费">
          <a-input placeholder="请输入律师费" v-decorator="['lsf', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核单位执行要求">
          <a-input placeholder="请输入考核单位执行要求" v-decorator="['khdwzxyq', {}]" />
        </a-form-item>
          </a-col>
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
    name: "SsglModal",
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
        sqrq:{rules: [{ required: true,message: '请输入申请日期！'}]},
        ywjg: {rules: [{ required: true,message: '请输入业务机构! '}]},
        },
        url: {
          add: "/ssgl/ssgl/add",
          edit: "/ssgl/ssgl/edit",
          judgeCkzh: '/ssgl/ssgl/judgeCkzh'
        },
      }
    },
    created () {
    },
    methods: {
      judgeCkzh () {
        let zh=this.form.getFieldValue('zh');
        getAction(this.url.judgeCkzh, {zh:zh}).then((res)=>{
          if(res.success){
            this.$nextTick(() => {
              this.form.setFieldsValue(pick(res.result, 'ywjg','jkrxm', 'zjhm', 'je', 'ye'))  // loadsh的pick方法
            })
            this.ckzhflag=true;
          }else {
            this.$message.warning("账号/卡号不存在，请核实！")
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
          this.form.setFieldsValue(pick(this.model,'ywjg','zhlxr','zjhm','jkrxm','zh','je','ye','bsqzxr','sxflwsh','ajslf','lsf','khdwzxyq','bz'))
		  //时间格式化
          this.form.setFieldsValue({sqrq:this.model.sqrq?moment(this.model.sqrq):null})
          this.form.setFieldsValue({hgscrq:this.model.hgscrq?moment(this.model.hgscrq):null})
          this.form.setFieldsValue({qsrq:this.model.qsrq?moment(this.model.qsrq):null})
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
            if(!this.model.zh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.sqrq = formData.sqrq?formData.sqrq.format():null;
            formData.hgscrq = formData.hgscrq?formData.hgscrq.format():null;
            formData.qsrq = formData.qsrq?formData.qsrq.format():null;
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