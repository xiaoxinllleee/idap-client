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

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务年份">
          <a-date-picker v-decorator="[ 'dataDate', validatorRules.dataDate ]" style="width: 100%;" :disabled="disabled" :format="format"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构编码">
          <!--<j-tree-select v-decorator="['jgbm', validatorRules.jgbm ]" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                         pid-field="sjywjgdm"
                         tree-node-filter-prop="title"
                         :disabled="disabled"
                         :showSearch="showSearch"
                         :tree-default-expand-all="true" />-->
          <a-input placeholder="机构编码" v-decorator="['jgbm', validatorRules.jgbm]" :disabled="disabled"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="全年贷款净投放任务">
          <a-input placeholder="请输入" v-decorator="['qndkjtfrw', {}]"/>
        </a-form-item>

        <a-divider orientation="left" style="color: #1890FF;">一季度</a-divider>
        <a-form-item :labelCol="{xs: {span: 24},sm: {span: 5}}" :wrapperCol="{xs: {span: 24},sm: {span: 16}}" label="开门红贷款净投放">
          <a-input placeholder="请输入" v-decorator="['kmhdkjtfQone', {}]"/>
        </a-form-item>

        <a-divider orientation="left" style="color: #1890FF;">二季度</a-divider>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务">
          <a-input placeholder="请输入" v-decorator="['kmhdkjtfQtwo', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：4月份">
          <a-input placeholder="请输入" v-decorator="['xsrwOneQtwo', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：5月份">
          <a-input placeholder="请输入" v-decorator="['xsrwTwoQtwo', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：6月份">
          <a-input placeholder="请输入" v-decorator="['xsrwThrQtwo', {}]"/>
        </a-form-item>

        <a-divider orientation="left" style="color: #1890FF;">三季度</a-divider>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务">
          <a-input placeholder="请输入" v-decorator="['kmhdkjtfQthr', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：7月份">
          <a-input placeholder="请输入" v-decorator="['xsrwOneQthr', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：8月份">
          <a-input placeholder="请输入" v-decorator="['xsrwTwoQthr', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：9月份">
          <a-input placeholder="请输入" v-decorator="['xsrwThrQthr', {}]"/>
        </a-form-item>

        <a-divider orientation="left" style="color: #1890FF;">四季度</a-divider>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务">
          <a-input placeholder="请输入" v-decorator="['kmhdkjtfQfou', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：10月份">
          <a-input placeholder="请输入" v-decorator="['xsrwOneQfou', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：11月份">
          <a-input placeholder="请输入" v-decorator="['xsrwTwoQfou', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序时任务：12月份">
          <a-input placeholder="请输入" v-decorator="['xsrwThrQfou', {}]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from "@/components/jeecg/JTreeSelect";

  export default {
    name: "DkyejzrwfpModal",
    components: {JTreeSelect},
    data() {
      return {
        title: "操作",
        visible: false,
        showSearch: true,
        disabled: true,
        format: 'YYYY',
        opType: '',
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
        validatorRules: {
          dataDate: {rules: [{required: true, message: '请选择数据日期!'}]},
          jgbm: {rules: [{required: true, message: '请选择所属机构!'}]},
        },
        url: {
          add: "/tjbb/tjfz/sgtzdr/dkyejzrwfp/add",
          edit: "/tjbb/tjfz/sgtzdr/dkyejzrwfp/edit",
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
          this.form.setFieldsValue(pick(this.model,
            'data_date', 'jgbm', 'qndkjtfrw', 'kmhdkjtfQone', 'kmhdkjtfQtwo', 'xsrwOneQtwo', 'xsrwTwoQtwo', 'xsrwThrQtwo', 'kmhdkjtfQthr', 'xsrwOneQthr', 'xsrwTwoQthr', 'xsrwThrQthr',
            'kmhdkjtfQfou', 'xsrwOneQfou', 'xsrwTwoQfou', 'xsrwThrQfou', 'bz'))
          //时间格式化
          this.form.setFieldsValue({dataDate: this.model.dataDate ? moment(this.model.dataDate) : null})
          // this.form.setFieldsValue({lrsj: this.model.lrsj ? moment(this.model.lrsj) : null})
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
            if (this.opType === 'add') {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dataDate = formData.dataDate ? formData.dataDate.format() : null;
            // formData.lrsj = formData.lrsj ? formData.lrsj.format() : null;

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


    }
  }
</script>

<style lang="less" scoped>

</style>