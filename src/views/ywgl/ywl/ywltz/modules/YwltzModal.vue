<template>
  <a-modal :title="title"
           :width="600"
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
          label="组织标识">
          <a-input placeholder="组织标识" v-decorator="['zzbz', validatorRules.zzbz ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织名称">
          <a-input placeholder="组织名称" v-decorator="['zzbz_dictText', validatorRules.zzbz ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标识">
          <a-input placeholder="岗位标识" v-decorator="['gwbz', validatorRules.gwbz ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位名称">
          <a-input placeholder="岗位名称" v-decorator="['gwbz_dictText', validatorRules.gwbz ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="员工工号" v-decorator="['yggh', validatorRules.yggh ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input placeholder="员工姓名" v-decorator="['yggh_dictText', validatorRules.yggh]" :disabled="true"/>
          <a-button @click="FindBack" type="primary" icon="plus" v-show="model.tzyf === undefined">查找带回</a-button>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整月份">
          <a-month-picker placeholder="调整月份" v-decorator="[ 'tzyf', validatorRules.tzyf ]" style="width: 100%" :disabled="this.disabled"
                          :defaultValue="defaultMonthOpera" :format="monthFormat"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整业务量">
          <a-input placeholder="请输入调整业务量" v-decorator="['tzywl', validatorRules.tzywl]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整原因">
          <a-input placeholder="请输入调整原因" v-decorator="['tzyy', {}]"/>
        </a-form-item>

      </a-form>
    </a-spin>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import AccountInfo from './AccountInfo'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "YwltzModal",
    components: {
      JTreeSelect, AccountInfo
    },
    data() {
      return {
        title: "操作",
        flag: false,
        visible: false,
        disabled: false,
        monthFormat: 'YYYY-MM',
        defaultMonthOpera: '',
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        record: {
          zzbz: '',
          zzbz_dictText: '',
          gwbz: '',
          gwbz_dictText: '',
          yggh: '',
          yggh_dictText: '',
          khjlbz: '',
          rglx: '',
          jgdm: '',
          gyh: '',
        },
        confirmLoading: false,
        ckzhflag: false,
        form: this.$form.createForm(this),
        validatorRules: {
          zzbz: {rules: [{required: true, message: '请输入组织标识!'}]},
          gwbz: {rules: [{required: true, message: '请输入岗位标识!'}]},
          yggh: {rules: [{required: true, message: '请输入员工工号!'}]},
          tzyf: {rules: [{required: true, message: '请输入调整月份!'}]},
          tzywl: {rules: [{required: true, message: '请输入调整业务量!'}]},
        },
        url: {
          add: "/ywltz/ywltz/add",
          edit: "/ywltz/ywltz/edit",
        },
      }
    },
    created() {
    },
    methods: {
      FindBack() {
        this.$refs.accountInfo.init()
      },
      add() {
        this.flag = true;
        this.visible = true
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'zzbz', 'zzbz_dictText', 'gwbz', 'gwbz_dictText', 'yggh', 'yggh_dictText', 'tzywl', 'tzyy'))
          this.form.setFieldsValue({tzyf: this.model.tzyf ? moment(this.model.tzyf) : null})
        });

      },
      close() {
        this.$emit('close');
        this.visible = false;
        this.ckzhflag = false;
        this.form.resetFields();
        this.flag = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (this.flag) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.tzyf = formData.tzyf ? formData.tzyf.format() : null;

            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })

          }
        })
      },
      handleCancel() {
        this.close()
      },
      colseWindow(args) {
        this.record.zzbz = args.zzbz
        this.record.zzbz_dictText = args.zzbz_dictText
        this.record.gwbz = args.gwbz
        this.record.gwbz_dictText = args.gwbz_dictText
        this.record.yggh = args.yggh
        this.record.yggh_dictText = args.yggh_dictText
        this.record.khjlbz = args.khjlbz
        this.record.rglx = args.rglx
        this.record.jgdm = args.ywjgdm
        this.record.gyh = args.gyh;
        this.model = Object.assign({}, this.record)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'zzbz', 'zzbz_dictText', 'gwbz', 'gwbz_dictText', 'yggh', 'yggh_dictText'))  // loadsh的pick方法
        })
      }


    }
  }
</script>

<style lang="less" scoped>

</style>