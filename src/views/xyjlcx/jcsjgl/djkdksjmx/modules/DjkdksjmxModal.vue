<template>
  <a-modal
    :title="title"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false">
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="业务机构">
                <j-tree-select
                  v-decorator="['ywjg',validatorRules.ywjg ]"
                  placeholder="请选择机构"
                  treeNodeFilterProp="title"
                  dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                  :sszh="true"
                  pid-field="sjywjgdm"
                  :showSearch="true"
                  :treeDefaultExpandAll=true
                  :disabled="this.disabled"
                />
              </a-form-item>
            </a-col>
            <!--</a-col>-->
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="卡号">
                <a-input placeholder="请输入卡号" v-decorator="['kh', validatorRules.kh ]" :disabled="this.disabled" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="卡种类">
                <!--<a-input placeholder="请输入卡种类" v-decorator="['kzl', {}]" />-->
                <j-dict-select-tag v-decorator="['kzl', validatorRules.kzl ]" :triggerChange="true" placeholder="请选择卡种类"
                                   dictCode="kzl" :disabled="this.disabled" />
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="证件类型">
                <!--<a-input placeholder="请输入证件类型" v-decorator="['zjlx', {}]" />-->
                <j-dict-select-tag v-decorator="['zjlx', validatorRules.zjlx ]" :triggerChange="true" placeholder="请选择证件类型"
                                   dictCode="dkjkpt_zjlx" :disabled="this.disabled" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="证件号码">
                <a-input placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm]" :disabled="this.disabled"/>
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="客户名称">
                <a-input placeholder="请输入客户名称" v-decorator="['khmc', validatorRules.khmc]" :disabled="this.disabled"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="性别">
                <!--<a-input placeholder="请输入性别" v-decorator="['xb', {}]" />-->
                <j-dict-select-tag v-decorator="['xb', {}]" :triggerChange="true" placeholder="请选择性别"
                                   dictCode="sex_djk"/>
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="婚姻状况">
                <!--<a-input placeholder="请输入婚姻状况" v-decorator="['hyzk', {}]" />-->
                <j-dict-select-tag v-decorator="['hyzk', {}]" :triggerChange="true" placeholder="请选择婚姻状况"
                                   dictCode="hyzk_ly"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="家庭住址">
                <a-input placeholder="请输入家庭住址" v-decorator="['jtzz', {}]"/>
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="手机号码">
                <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="发卡日期">
                <a-date-picker v-decorator="[ 'fkrq',validatorRules.fkrq ]" style="width: 100%" :disabled="this.disabled"/>
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="到期日期">
                <a-date-picker v-decorator="[ 'dqrq', {}]" style="width: 100%" :disabled="this.disabled"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="授信金额">
                <a-input placeholder="请输入授信金额" v-decorator="['sxje', {}]"/>
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="透支本金">
                <a-input placeholder="请输入透支本金" v-decorator="['tzbj', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="透支余额">
                <a-input placeholder="请输入透支余额" v-decorator="['tzye', {}]"/>
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="推广人工号">
                <a-input placeholder="请输入推广人工号" v-decorator="['tgrgh', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="卡状态标志">
                <j-dict-select-tag v-decorator="['kztbz', {}]" :triggerChange="true" placeholder="请选择卡状态标志"
                                   dictCode="kztbz"/>
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="员工工号">
                <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
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
    name: "DjkdksjmxModal",components: {
      JTreeSelect
    },
    data() {
      return {
        title: "操作",
        visible: false,
        disabled: false,
        disableSubmit: false,
        confirmLoading: false,
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },

        form: this.$form.createForm(this),
        validatorRules: {
          kh: {rules: [{required: true, message: '请输入卡号!'}]},
          fkrq: {rules: [{required: true, message: '请输入发卡日期!'}]},
          zjhm: {rules: [{required: true, message: '请输入证件号码!'}]},
          khmc: {rules: [{required: true, message: '请输入客户名称!'}]},
          kzl: {rules: [{required: true, message: '请输入卡种类！'}]},
          ywjg: {rules: [{required: true, message: '请选择业务机构！'}]},
          zjlx: {rules: [{required: true, message: '请选择证件类型！'}]},

        },
        url: {
          add: "/djkdksjmx/djkdksjmx/add",
          edit: "/djkdksjmx/djkdksjmx/edit",
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
          this.form.setFieldsValue(pick(this.model, 'ywjg', 'kh', 'kzl', 'zjlx', 'zjhm', 'khmc', 'xb', 'hyzk', 'jtzz', 'sjhm', 'sxje', 'tzbj', 'tzye', 'tgrgh', 'kztbz', 'yggh'))
          //时间格式化
          this.form.setFieldsValue({fkrq: this.model.fkrq ? moment(this.model.fkrq) : null})
          this.form.setFieldsValue({dqrq: this.model.dqrq ? moment(this.model.dqrq) : null})
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
            if (!this.model.kh && !this.model.fkrq) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.fkrq = formData.fkrq ? formData.fkrq.format() : null;
            formData.dqrq = formData.dqrq ? formData.dqrq.format() : null;
            /*formData.lrsj = formData.lrsj ? formData.lrsj.format() : null;*/

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