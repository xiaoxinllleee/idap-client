<template>
  <a-modal :title="title"
           :width="500"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="destroyOnClose"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item v-if="zzbzflag" :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属机构" hasFeedback>
          <a-input :disabled="this.zzbzflag" placeholder="请输入所属机构" v-decorator="['zzbz_dictText', {} ]"/>
        </a-form-item>

        <a-form-item v-else :labelCol="labelCol" :wrapperCol="wrapperCol" :label="ZzbzFormItemLabel" hasFeedback>
          <j-tree-select placeholder="请选择机构" v-decorator="['zzbz', validatorRules.zzbz]" dict="hr_bas_organization,zzjc,zzbz"
                         :disabled="this.zzbzflag" :showSearch="true" :treeDefaultExpandAll="false"
                         pid-field="sjzzbz" treeNodeFilterProp="title" :getAllZzjg="allZzjg"/>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码" hasFeedback>
          <a-input :disabled="this.zjhmflag" placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm ]"/>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称" hasFeedback>
          <a-input :disabled="this.khmcflag" placeholder="请输入客户名称" v-decorator="['khmc', validatorRules.khmc]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型" hasFeedback>
          <j-dict-select-tag :disabled="this.khlxflag" placeholder="请输入客户类型" v-decorator="['khlx',validatorRules.khlx]" :triggerChange="true" dict-code="lldj_khlx" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人代表">
          <a-input :disabled="this.frdbflag" placeholder="请输入法人代表" v-decorator="['frdb', {}]" />
        </a-form-item>


      </a-form>
    </a-spin>


  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {notification} from "ant-design-vue";

  export default {
    name: "Rate_khjbxxbModal",components:{JTreeSelect,},
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
        allZzjg: '1',
        ZzbzFormItemLabel: '所属机构',
        zzbzflag: "false",
        frdbflag: "false",
        zjhmflag: "false",
        khmcflag: "false",
        khlxflag: "false",
        confirmLoading: false,
        destroyOnClose: true,
        form: this.$form.createForm(this),
        validatorRules: {
          zjhm: {rules: [{required: true, message: '请输入证件号码!'}]},
          khmc: {rules: [{required: true, message: '请输入客户名称!'}]},
          zzbz: {rules: [{required: true, message: '请选择所属机构!'}]},
          khlx: {rules: [{required: true, message: '请选择客户类型!'}]},
        },
        url: {
          add: "/dklldj.jbxxgl.khxxgl/rate_khjbxxb/add",
          edit: "/dklldj.jbxxgl.khxxgl/rate_khjbxxb/edit",
        },
        operationflag: 'add',
      }
    },
    created () {},
    methods: {
      add () {
        this.allZzjg = '2'
        this.zjhmflag = false
        this.zzbzflag = false
        this.khmcflag = false
        this.frdbflag = false
        this.khlxflag = false
        this.edit({})
      },
      edit (record,flag) {
        if (record.zjhm) {
          if (flag == 2) {
            this.ZzbzFormItemLabel = '转移机构'
            this.zzbzflag = false
            this.frdbflag = true
            this.zjhmflag = true
            this.khmcflag = true
            this.khlxflag = true
            delete record.zzbz
          }
          if (flag == 1) {
            this.zzbzflag = true
            this.frdbflag = false
            this.zjhmflag = true
            this.khmcflag = false
            this.khlxflag = false
          }
        }

        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zzbz','zjhm','khmc','khlx','frdb','zzbz_dictText'))
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (this.operationflag == 'add') {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                notification.success({ message: '系统提示', description: res.message,duration: 4})
                //that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              } else {
                //that.$message.warning(res.message);
                notification.warning({ message: '系统提示', description: res.message,duration: 4})
              }
            }).finally(() => {
              that.confirmLoading = false;
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