<template>
  <a-modal :title="title"
           :width="700"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开户机构号">
          <a-input placeholder="请输入开户机构号" v-decorator="['branchNo', validatorRules.branchNo ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户名">
          <a-input placeholder="请输入户名" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['identNo', validatorRules.identNo ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['acctNo', validatorRules.acctNo ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="借款日期">
          <a-date-picker v-decorator="[ 'qxDate', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="到期日期">
          <a-date-picker v-decorator="[ 'endDate', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限(1 短期贷款 2 长期贷款)">
          <a-input placeholder="请输入贷款期限(1 短期贷款 2 长期贷款)" v-decorator="['dkqx', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="剩余天数">
          <a-input placeholder="请输入剩余天数" v-decorator="['syts', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额(元)">
          <a-input placeholder="请输入贷款余额(元)" v-decorator="['currBal', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款形态">
          <a-input placeholder="请输入贷款形态" v-decorator="['fiveClassType', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主客户经理">
          <a-input placeholder="请输入主客户经理" v-decorator="['zkhjl', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款日期1">
          <a-date-picker v-decorator="[ 'lxqkrqOne', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款期数1">
          <a-input placeholder="请输入利息欠款期数1" v-decorator="['lxqkqsOne', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款日期2">
          <a-date-picker v-decorator="[ 'lxqkrqTwo', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款期数2">
          <a-input placeholder="请输入利息欠款期数2" v-decorator="['lxqkqsTwo', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款日期3">
          <a-date-picker v-decorator="[ 'lxqkrqThree', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款期数3">
          <a-input placeholder="请输入利息欠款期数3" v-decorator="['lxqkqsThree', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款日期4">
          <a-date-picker v-decorator="[ 'lxqkrqFour', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款期数4">
          <a-input placeholder="请输入利息欠款期数4" v-decorator="['lxqkqsFour', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款日期5">
          <a-date-picker v-decorator="[ 'lxqkrqFive', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款期数5">
          <a-input placeholder="请输入利息欠款期数5" v-decorator="['lxqkqsFive', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款日期6">
          <a-date-picker v-decorator="[ 'lxqkrqSix', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利息欠款期数6">
          <a-input placeholder="请输入利息欠款期数6" v-decorator="['lxqkqsSix', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款逾期日期至">
          <a-date-picker v-decorator="[ 'dkyqrqz', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款逾期天数">
          <a-input placeholder="请输入贷款逾期天数" v-decorator="['dkyqts', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最近一次利息逾期四期及以上的日期">
          <a-date-picker v-decorator="[ 'zjlxyqrq', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="解除手工标记日期">
          <a-date-picker v-decorator="[ 'jcsgbjrq', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否需手工下调">
          <a-input placeholder="请输入是否需手工下调" v-decorator="['sfsgxt', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否一户多形态">
          <a-input placeholder="请输入是否一户多形态" v-decorator="['sfyhdxt', {}]" />
        </a-form-item>-->

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="建议解除手工标记">
          <j-dict-select-tag placeholder="请选择" v-decorator="['sfjcsgbj', validatorRules.sfjcsgbj]" dict-code="sfbz" :trigger-change="true"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea placeholder="备注" v-decorator="['bz', {}]" allow-clear :auto-size="{ minRows: 2, maxRows: 5 }"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import notification from 'ant-design-vue/es/notification'

  export default {
    name: "LxqkbjyqtzModal",
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
          sfjcsgbj:{rules: [{ required: true, message: '请选择!' }]}
        },
        url: {
          //add: "/yxbldkgl/dklxqkbjyqtz/add",
          edit: "/yxbldkgl/dklxqkbjyqtz/edit",
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
          this.form.setFieldsValue(pick(this.model,
            'branchNo','custName','identNo','acctNo','dkqx','syts','currBal','fiveClassType','zkhjl','lxqkqsOne','lxqkqsTwo','lxqkqsThree','lxqkqsFour','lxqkqsFive','lxqkqsSix','dkyqts','sfsgxt','sfyhdxt','lrbz','lrr',
            'sfjcsgbj','bz'
          ))

		      //时间格式化
          // this.form.setFieldsValue({qxDate:this.model.qxDate?moment(this.model.qxDate):null})
          // this.form.setFieldsValue({endDate:this.model.endDate?moment(this.model.endDate):null})
          // this.form.setFieldsValue({lxqkrqOne:this.model.lxqkrqOne?moment(this.model.lxqkrqOne):null})
          // this.form.setFieldsValue({lxqkrqTwo:this.model.lxqkrqTwo?moment(this.model.lxqkrqTwo):null})
          // this.form.setFieldsValue({lxqkrqThree:this.model.lxqkrqThree?moment(this.model.lxqkrqThree):null})
          // this.form.setFieldsValue({lxqkrqFour:this.model.lxqkrqFour?moment(this.model.lxqkrqFour):null})
          // this.form.setFieldsValue({lxqkrqFive:this.model.lxqkrqFive?moment(this.model.lxqkrqFive):null})
          // this.form.setFieldsValue({lxqkrqSix:this.model.lxqkrqSix?moment(this.model.lxqkrqSix):null})
          // this.form.setFieldsValue({dkyqrqz:this.model.dkyqrqz?moment(this.model.dkyqrqz):null})
          // this.form.setFieldsValue({zjlxyqrq:this.model.zjlxyqrq?moment(this.model.zjlxyqrq):null})
          // this.form.setFieldsValue({jcsgbjrq:this.model.jcsgbjrq?moment(this.model.jcsgbjrq):null})
          // this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            // let httpurl = '';
            // let method = '';
            // if (!this.model.id) {
            //   httpurl += this.url.add;
            //   method = 'post';
            // } else {
            //   httpurl += this.url.edit;
            //   method = 'put';
            // }
            let formData = Object.assign(this.model, values);
            //时间格式化
            // formData.qxDate = formData.qxDate?formData.qxDate.format():null;
            // formData.endDate = formData.endDate?formData.endDate.format():null;
            // formData.lxqkrqOne = formData.lxqkrqOne?formData.lxqkrqOne.format():null;
            // formData.lxqkrqTwo = formData.lxqkrqTwo?formData.lxqkrqTwo.format():null;
            // formData.lxqkrqThree = formData.lxqkrqThree?formData.lxqkrqThree.format():null;
            // formData.lxqkrqFour = formData.lxqkrqFour?formData.lxqkrqFour.format():null;
            // formData.lxqkrqFive = formData.lxqkrqFive?formData.lxqkrqFive.format():null;
            // formData.lxqkrqSix = formData.lxqkrqSix?formData.lxqkrqSix.format():null;
            // formData.dkyqrqz = formData.dkyqrqz?formData.dkyqrqz.format():null;
            // formData.zjlxyqrq = formData.zjlxyqrq?formData.zjlxyqrq.format():null;
            // formData.jcsgbjrq = formData.jcsgbjrq?formData.jcsgbjrq.format():null;
            // formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            console.log('formData:',formData)
            httpAction(this.url.edit, formData, 'put').then((res) => {
              if (res.success) {
                notification.success({message: '系统提示', description: res.message, duration: 4})
                that.$emit('ok');
              } else {
                notification.warning({message: '系统提示', description: res.message, duration: 4})
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
