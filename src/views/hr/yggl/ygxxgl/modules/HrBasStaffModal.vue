<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" :disabled="model.yggh != undefined" v-decorator="['yggh', validatorRules.yggh ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-decorator="['ygxm', {rules: [{ required: true, message: '请输入员工姓名!' }]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="柜员号">
              <a-input placeholder="请输入柜员号" v-decorator="['gyh', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-decorator="['khjlbh', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工类型">
              <j-dict-select-tag  v-decorator="['yglx', {rules: [{ required: true, message: '请选择员工类型!' }],initialValue:'1'}]" :triggerChange="true" placeholder="请选择员工类型"
                                  dictCode="yglx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工状态">
              <j-dict-select-tag  v-decorator="['ygzt', {rules: [{ required: true, message: '请选择员工状态!' }],initialValue:'1'}]" :triggerChange="true" placeholder="请选择员工状态"
                                  dictCode="ygzt"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="性别">
              <j-dict-select-tag  v-decorator="['xb', {}]" :triggerChange="true" placeholder="请选择性别"
                                  dictCode="sex"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="身份证号">
              <a-input placeholder="请输入身份证号" v-decorator="['sfzh', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="手机号码">
              <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工资卡号">
              <a-input placeholder="请输入工资卡号" v-decorator="['gzkh', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="入职日期">
              <j-date v-decorator="['rzrq',{}]"></j-date>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="转正日期">
              <j-date v-decorator="['zzrq',{}]"></j-date>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="离职日期">
              <j-date v-decorator="['lzrq',{}]"></j-date>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="退休日期">
              <j-date v-decorator="['txrq',{}]"></j-date>
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
  import JDate from '@/components/jeecg/JDate'
  import { duplicateCheck } from '@/api/api'

  export default {
    name: "HrBasStaffModal",
    components: {
      JDate
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        disableSubmit: false,
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
          yggh:{rules: [{ required: true, message: '请输入员工工号!' }, {validator:this.validateInputYggh}]},
        },
        url: {
          add: "/ygxxgl/hrBasStaff/add",
          edit: "/ygxxgl/hrBasStaff/edit",
        },
      }
    },
    created () {
    },
    methods: {
      validateInputYggh(rule, value, callback){
        console.log("value",value)
        if (!this.model.yggh && value) {
          var params = {
            tableName: "HR_BAS_STAFF",
            fieldName: "yggh",
            fieldVal: value,
          };
          duplicateCheck(params).then((res)=>{
            if(res.success){
              callback();
            }else{
              callback(res.message);
            }
          })
        } else {
          callback();
        }
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'yggh','ygxm','yglx','ygzt','xb','sfzh','sjhm','gzkh','gyh','khjlbh','rzrq','zzrq','lzrq','post','orgCode','roles','activitiSync','password','salt','avatar','email','status','delFlag','pcFlag','appFlag','identity','departIds','pwdFreeTm','pwdErrTm','pwdErrNum','txrq'))
          //时间格式化
          // this.form.setFieldsValue({rzrq:this.model.rzrq?moment(this.model.rzrq):null})
          // this.form.setFieldsValue({zzrq:this.model.zzrq?moment(this.model.zzrq):null})
          // this.form.setFieldsValue({lzrq:this.model.lzrq?moment(this.model.lzrq):null})
          // this.form.setFieldsValue({txrq:this.model.txrq?moment(this.model.txrq):null})
          // this.form.setFieldsValue({birthday:this.model.birthday?moment(this.model.birthday):null})
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
            if(!this.model.yggh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log('formData', formData)
            //时间格式化
            // formData.rzrq = formData.rzrq?formData.rzrq.format():null;
            // formData.zzrq = formData.zzrq?formData.zzrq.format():null;
            // formData.lzrq = formData.lzrq?formData.lzrq.format():null;
            // formData.scsj = formData.scsj?formData.scsj.format():null;
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