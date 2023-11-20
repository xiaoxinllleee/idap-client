<template>
  <a-modal
    :title="title"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
          <a-input placeholder="请输入客户名称" v-model="khmc" disabled/>
          <a-button type="primary" @click="handleAddUserDepart">选择被关联客户</a-button>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
          <a-input placeholder="请输入证件号码" v-model="zjhm" disabled/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人名称">
          <a-input placeholder="请输入关联人名称" v-decorator="['glrmc', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人证件号码">
          <a-input :disabled="glr" placeholder="请输入关联人证件号码" v-decorator="['glrzjhm', validatorRules.glrzjhm ]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人类型">
          <j-dict-select-tag placeholder="请选择关联人类型" v-decorator="['glrlx', {}]" :triggerChange="true"
                             dict-code="dklldj_glrlx"/>
        </a-form-item>

      </a-form>
    </a-spin>

    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>

  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import SelectUserModal from './SelectUserModal'

  export default {
    name: "Rate_khglrxxbModal",
    components: {SelectUserModal},
    data() {
      return {
        title: "操作",
        visible: false,
        model: {},
        zjhm: "",
        khmc: "",
        glr: false,
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          zjhm: {rules: [{required: true, message: '请输入证件号码!'}]},
          glrzjhm: {rules: [{required: true, message: '请输入关联人证件号码!'}]},
        },
        url: {
          add: "/dklldj.jbxxgl.glrxxgl/rate_khglrxxb/add",
          edit: "/dklldj.jbxxgl.glrxxgl/rate_khglrxxb/edit",
        },
      }
    },
    created() {
    },
    methods: {
      add() {
        this.glr = false;
        this.edit({});
      },
      edit(record) {
        if (record.zjhm) {
          this.glr = true;
        }
        this.zjhm = record.zjhm
        this.khmc = record.khmc
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'glrzjhm', 'glrmc', 'glrlx', 'scbz', 'lrczy', 'lrbz'));

          //时间格式化
          this.form.setFieldsValue({lrsj: this.model.lrsj ? moment(this.model.lrsj) : null})
        });

      },
      close() {
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
            if (!this.model.zjhm) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化

            formData.zjhm = this.zjhm;
            formData.khmc = this.khmc;
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
      handleAddUserDepart() {
        this.$refs.selectUserModal.onClearSelected();
        this.$refs.selectUserModal.visible = true;
      },
      selectOK: function (data) {
        this.zjhm = data[0].zjhm
        this.khmc = data[0].khmc
      },
    }
  }
</script>

<style lang="less" scoped>

</style>