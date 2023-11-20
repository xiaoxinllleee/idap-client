<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款账号">
              <a-input-search placeholder="请输入贷款账号" v-decorator="['dkzh', validatorRules.dkzh ]" enter-button @search="onSearch" :disabled="model.dkzh"/>
            </a-form-item>

          </a-col>
          <a-col :span="12" >
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
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" disabled/>
            </a-form-item>

          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-decorator="['custName', {}]" disabled/>
            </a-form-item>

          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款金额">
              <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款余额">
              <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="借款日期">
              <a-date-picker v-decorator="[ 'jkrq', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="到期日期">
              <a-date-picker v-decorator="[ 'dqrq', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款标签">
              <j-dict-select-tag placeholder="请选择贷款标签" v-decorator="['dkbq', validatorRules.dkbq]" :trigger-change="true" dictCode="dkbq" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "TsdkglModal",
    components: {
      JTreeSelect
    },
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
        dkzh:{rules: [{ required: true, message: '请输入贷款账号!' }]},
          dkbq:{rules: [{ required: true, message: '请选择贷款标签!' }]},
        },
        url: {
          add: "/tsdkgl/tsdkgl/add",
          edit: "/tsdkgl/tsdkgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','zjhm','dkzh','custName','dkbq','dkje','dkye','bz'))
		      //时间格式化
          this.form.setFieldsValue({jkrq:this.model.jkrq?moment(this.model.jkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
        });

      },
      onSearch(value) {
        if (value) {
          getAction('/dkkh/cbsBormBase/list', {acctNo: value}).then(res => {
            console.log('res', res)
            if (res.success && res.result.records && res.result.records.length > 0) {
              let data = res.result.records[0]
              this.form.setFieldsValue({jgdm: data.brNo, zjhm: data.identNo, custName: data.custName, dkje: data.applicAmount, dkye: data.loanBal})
              this.form.setFieldsValue({jkrq:data.qxDate?moment(data.qxDate):null})
              this.form.setFieldsValue({dqrq:data.endDate?moment(data.endDate):null})
            } else {
              this.$message.warning('未找到输入的贷款账号信息，请确认账号是否正确');
            }
          });
        }
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
            if(!this.model.dkzh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.jkrq = formData.jkrq?formData.jkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.message);
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