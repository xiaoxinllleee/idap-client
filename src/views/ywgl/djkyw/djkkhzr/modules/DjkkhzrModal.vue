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
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷记卡卡号">
              <a-input placeholder="请输入贷记卡卡号" v-decorator="['djkkh', validatorRules.djkkh ]" @blur="djkkhChange" :disabled="model.djkkh != undefined"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
              <a-input placeholder="请输入机构代码" v-decorator="['jgdm', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构名称">
              <a-input placeholder="请输入机构名称" v-decorator="['jgdm_dictText', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-decorator="['custid', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="责任人客户经理标识">
              <a-input placeholder="请输入责任人客户经理标识" v-decorator="['custidzr', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" v-decorator="['jobnumber', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-decorator="['jobnumber_dictText', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="责任人工号">
              <a-input placeholder="请输入责任人工号" v-decorator="['jobnumberzr', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="责任人姓名">
              <a-input placeholder="请输入责任人姓名" v-decorator="['jobnumberzr_dictText', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="追责标志">
              <j-dict-select-tag  v-decorator="['zzbz', {rules: []}]" :triggerChange="true" placeholder="请选择追责标志"
                                  dictCode="zzbs"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="追责日期">
              <a-date-picker v-decorator="[ 'zzrq', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DjkkhzrModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 9 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        djkkh:{rules: [{ required: true, message: '请输入贷记卡卡号!' }]},
        },
        url: {
          add: "/djkkhzr/djkkhzr/add",
          edit: "/djkkhzr/djkkhzr/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','jgdm_dictText','zjhm','djkkh','khmc','custid','jobnumber','jobnumber_dictText',
            'custidzr','jobnumberzr','jobnumberzr_dictText', 'zzbz','zbks'))
		  //时间格式化
          this.form.setFieldsValue({zzrq:this.model.zzrq?moment(this.model.zzrq):null})
        });

      },
      djkkhChange(e) {
        console.log('djkkhChange', e)
        let djkkh = e.target.value
        getAction('/djkxxgl/djkxxgl/queryByKh', {djkkh: djkkh}).then(res => {
          console.log('djkkhChange', res)
          if (res.success) {
            // this.model = Object.assign(this.model, res.result)
            this.form.setFieldsValue(pick(res.result,'jgdm','jgdm_dictText','zjhm','djkkh','khmc','custid','jobnumber','jobnumber_dictText',
              'custidzr','jobnumberzr','jobnumberzr_dictText','zzbz','zbks'))
          } else{
            this.$message.warning(res.message,5);
          }
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
            let httpurl = '';
            let method = '';
            if(!this.model.djkkh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.zzrq = formData.zzrq?formData.zzrq.format():null;

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