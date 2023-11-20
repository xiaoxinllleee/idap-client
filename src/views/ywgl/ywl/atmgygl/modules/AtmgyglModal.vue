<template>
  <a-modal
    :title="title"
    :width="500"
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
          label="机构代码">
          <j-tree-select
            v-decorator="['jgdm',{}]"
            placeholder="请选择机构"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM柜员号">
          <a-input placeholder="请输入ATM柜员号" v-decorator="['atmgyh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="AMT类型">
          <a-input placeholder="请输入AMT类型" v-decorator="['atmbh', {}]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "AtmgyglModal",
    components: {
      JTreeSelect
    },
    data() {
      return {
        title: "操作",
        visible: false,
        model: {},
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
        validatorRules: {},
        url: {
          add: "/atmgygl/atmgygl/add",
          edit: "/atmgygl/atmgygl/edit",
        },
      }
    },
    created() {
    },
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm', 'atmbh', 'atmgyh'))
          //时间格式化
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
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
            let httpurl = '';
            let method = '';
            if (!this.model.atmgyh) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            console.log('表单数据', httpurl, method, formData)
            that.confirmLoading = true;
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
    }
  }
</script>

<style lang="less" scoped>
</style>