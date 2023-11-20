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
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['hx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请编号">
          <a-input placeholder="请输入申请编号" v-decorator="['sqbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部账号">
          <a-input placeholder="请输入内部账号" v-decorator="['nbzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成交单编号">
          <a-input placeholder="请输入成交单编号" v-decorator="['cjdbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回购方向">
          <a-input placeholder="请输入回购方向" v-decorator="['hgfx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手方">
          <a-input placeholder="请输入交易对手方" v-decorator="['jydsf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手类别">
          <a-input placeholder="请输入交易对手类别" v-decorator="['jydslb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易品种">
          <a-input placeholder="请输入交易品种" v-decorator="['jypz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际占款天数（天）">
          <a-input placeholder="请输入实际占款天数（天）" v-decorator="['sjzkts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回购利率（%）">
          <a-input placeholder="请输入回购利率（%）" v-decorator="['hgll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="券面总额（万元）">
          <a-input placeholder="请输入券面总额（万元）" v-decorator="['qmze', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易日期">
          <a-date-picker v-decorator="[ 'jyrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额（元）">
          <a-input placeholder="请输入交易金额（元）" v-decorator="['jyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次结算日">
          <a-date-picker v-decorator="[ 'scjsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期结算金额（元）">
          <a-input placeholder="请输入到期结算金额（元）" v-decorator="['dqjsje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余天数">
          <a-input placeholder="请输入剩余天数" v-decorator="['syts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期结算日">
          <a-date-picker v-decorator="[ 'dqjsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报表日期">
          <a-date-picker v-decorator="[ 'bbrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收/付利息金额">
          <a-input placeholder="请输入应收/付利息金额" v-decorator="['ysflxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计计提利息（元）">
          <a-input placeholder="请输入累计计提利息（元）" v-decorator="['ljjtlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计结算金额（元）">
          <a-input placeholder="请输入累计结算金额（元）" v-decorator="['ljjsje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期利息（元）">
          <a-input placeholder="请输入到期利息（元）" v-decorator="['dqlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂账本金（元）">
          <a-input placeholder="请输入挂账本金（元）" v-decorator="['gzbj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂账利息（元）">
          <a-input placeholder="请输入挂账利息（元）" v-decorator="['gzlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类">
          <a-input placeholder="请输入五级分类" v-decorator="['wjfl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务状况">
          <a-input placeholder="请输入业务状况" v-decorator="['ywzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用债券质押比例（%）">
          <a-input placeholder="请输入用债券质押比例（%）" v-decorator="['yzqzybl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['jgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input placeholder="请输入机构名称" v-decorator="['jgmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产等级">
          <a-input placeholder="请输入资产等级" v-decorator="['zcdj', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "NyhgdjbModal",
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
        },
        url: {
          add: "/nyhgdjb/nyhgdjb/add",
          edit: "/nyhgdjb/nyhgdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'hx','sqbh','nbzh','cjdbh','hgfx','jydsf','jydslb','jypz','sjzkts','hgll','qmze','jyje','dqjsje','syts','ysflxje','ljjtlx','ljjsje','dqlx','gzbj','gzlx','wjfl','ywzk','yzqzybl','jgh','jgmc','zcdj'))
		  //时间格式化
          this.form.setFieldsValue({jyrq:this.model.jyrq?moment(this.model.jyrq):null})
          this.form.setFieldsValue({scjsr:this.model.scjsr?moment(this.model.scjsr):null})
          this.form.setFieldsValue({dqjsr:this.model.dqjsr?moment(this.model.dqjsr):null})
          this.form.setFieldsValue({bbrq:this.model.bbrq?moment(this.model.bbrq):null})
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
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.jyrq = formData.jyrq?formData.jyrq.format():null;
            formData.scjsr = formData.scjsr?formData.scjsr.format():null;
            formData.dqjsr = formData.dqjsr?formData.dqjsr.format():null;
            formData.bbrq = formData.bbrq?formData.bbrq.format():null;
            
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