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
          label="商户编码">
          <a-input placeholder="请输入商户编码" v-decorator="['shbm', validatorRules.shbm ]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户名称">
          <a-input placeholder="请输入商户名称" v-decorator="['shmc', validatorRules.shmc ]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['lxdh', {}]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', validatorRules.jgdm ]" :disabled="true"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input placeholder="请输入机构名称" v-decorator="['jgdm_dictText', {}]"  :disabled="true" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input placeholder="请输入员工姓名" v-decorator="['yggh_dictText', validatorRules.yggh ]" :disabled="true"/>
          <a-button @click="findback" type="primary" icon="plus">查找带回</a-button>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人代表">
          <a-input placeholder="请输入法人代表" v-decorator="['frdb', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import AccountInfo from './AccountInfo.vue'
  import moment from "moment"
  import JTreeSelect from "@/components/jeecg/JTreeSelect";

  export default {
    name: "ShjbxxModal",
    components: {JTreeSelect,AccountInfo},
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        flag: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        records:{
          zzbz:'',
          ywjgdm: '',
          ywjgdm_dictText: '',
          zzbz_dictText: '',
          yggh:'',
          yggh_dictText: '',
          khjlbz:'',
          rglx: '',
          gwbz: '',
        },


        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        shbm:{rules: [{ required: true, message: '请输入商户编码!' }]},
        shmc:{rules: [{ required: true, message: '请输入商户名称!' }]},
        },
        url: {
          add: "/shjbxx/shjbxx/add",
          edit: "/shjbxx/shjbxx/edit",
        },
      }
    },
    created () {
    },
    methods: {
      colseWindow(args){
        this.records.jgdm = args.ywjgdm
        this.records.jgdm_dictText = args.zzbz_dictText
        this.records.yggh = args.yggh
        this.records.yggh_dictText = args.yggh_dictText
        this.records.gwbz = args.gwbz
        this.model = Object.assign({}, this.records)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm','jgdm_dictText','yggh_dictText', 'yggh'))  // loadsh的pick方法
        })
      },
      findback() {
        this.$refs.accountInfo.visible = true
      },

      add () {
        this.flag=true;
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jgdm','jgdm_dictText','shbm','shmc','lxdh','yggh','yggh_dictText','frdb'))
		  //时间格式化
          /*this.form.setFieldsValue({lrrq:this.model.lrrq?moment(this.model.lrrq):null})
          this.form.setFieldsValue({xgrq:this.model.xgrq?moment(this.model.xgrq):null})*/
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.flag=false
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
            //formData.lrrq = formData.lrrq?formData.lrrq.format():null;
            //formData.xgrq = formData.xgrq?formData.xgrq.format():null;
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
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>