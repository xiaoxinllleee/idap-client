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
          label="数据日期">
          <a-date-picker v-decorator="[ 'dataDate', validatorRules.dataDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户机构编号">
          <a-input placeholder="请输入开户机构编号" v-decorator="['jgbm', validatorRules.jgbm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款户名">
          <a-input placeholder="请输入贷款户名" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['identNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原账号">
          <a-input placeholder="请输入原账号" v-decorator="['oldAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新账号">
          <a-input placeholder="请输入新账号" v-decorator="['newAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款日期">
          <a-date-picker v-decorator="[ 'jkrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="（置换/核销）利息">
          <a-input placeholder="请输入（置换/核销）利息" v-decorator="['zhHxLx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="（置换/核销）日期">
          <a-date-picker v-decorator="[ 'zhHxRq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="（置换/核销）本金">
          <a-input placeholder="请输入（置换/核销）本金" v-decorator="['zhHxBj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前贷款余额">
          <a-input placeholder="请输入当前贷款余额" v-decorator="['dkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠息合计">
          <a-input placeholder="请输入欠息合计" v-decorator="['qxhj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人">
          <a-input placeholder="请输入第一责任人" v-decorator="['dyzrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目编码">
          <a-input placeholder="请输入科目编码" v-decorator="['kmbm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目名称">
          <a-input placeholder="请输入科目名称" v-decorator="['kmmc', {}]" />
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入标识(0 导入 1 录入 2 修改)">
          <a-input placeholder="请输入录入标识(0 导入 1 录入 2 修改)" v-decorator="['lrbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入人">
          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入时间">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DkhxdjbModal",
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
          dataDate:{rules: [{ required: true, message: '请输入数据日期!' }]},
          jgbm:{rules: [{ required: true, message: '请输入开户机构编号!' }]},
        },
        url: {
          add: "/tjbb/tjfz/sgtzdr/dkhxdjb/add",
          edit: "/tjbb/tjfz/sgtzdr/dkhxdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgbm','xh','custName','identNo','oldAcct','newAcct','zhHxLx','zhHxBj','dkye','qxhj','dyzrr','kmbm','kmmc','lrbz','lrr'))
		      //时间格式化
          this.form.setFieldsValue({dataDate:this.model.dataDate?moment(this.model.dataDate):null})
          this.form.setFieldsValue({jkrq:this.model.jkrq?moment(this.model.jkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
          this.form.setFieldsValue({zhHxRq:this.model.zhHxRq?moment(this.model.zhHxRq):null})
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
            let httpurl = '';
            let method = '';
            if(this.opType === 'add'){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dataDate = formData.dataDate?formData.dataDate.format():null;
            formData.jkrq = formData.jkrq?formData.jkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.zhHxRq = formData.zhHxRq?formData.zhHxRq.format():null;
            // formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            console.log(formData)
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