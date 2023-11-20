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
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量日期">
          <a-date-picker v-decorator="[ 'clrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属支行">
          <a-input placeholder="请输入所属支行" v-decorator="['sszh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政村">
          <a-input placeholder="请输入行政村" v-decorator="['xzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组">
          <a-input placeholder="请输入组" v-decorator="['xzz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任人">
          <a-input placeholder="请输入责任人" v-decorator="['zkhjl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户号编码">
          <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否户主">
          <a-input placeholder="请输入是否户主" v-decorator="['sfhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量存款余额">
          <a-input placeholder="请输入存量存款余额" v-decorator="['clckye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前存款余额">
          <a-input placeholder="请输入当前存款余额" v-decorator="['dyckye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款净增余额">
          <a-input placeholder="请输入存款净增余额" v-decorator="['ckjzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量户数">
          <a-input placeholder="请输入存量户数" v-decorator="['clhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前存款户数">
          <a-input placeholder="请输入当前存款户数" v-decorator="['dyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款净增户数">
          <a-input placeholder="请输入存款净增户数" v-decorator="['ckjzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款余额">
          <a-input placeholder="请输入存量贷款余额" v-decorator="['cldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前贷款余额">
          <a-input placeholder="请输入当前贷款余额" v-decorator="['dydkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款净增余额">
          <a-input placeholder="请输入贷款净增余额" v-decorator="['dkjzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款户数">
          <a-input placeholder="请输入存量贷款户数" v-decorator="['cldkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前贷款户数">
          <a-input placeholder="请输入当前贷款户数" v-decorator="['dydkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款净增户数">
          <a-input placeholder="请输入贷款净增户数" v-decorator="['dkjzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量不良贷款余额">
          <a-input placeholder="请输入存量不良贷款余额" v-decorator="['clbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前不良贷款余额">
          <a-input placeholder="请输入当前不良贷款余额" v-decorator="['dybldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良下降金额">
          <a-input placeholder="请输入不良下降金额" v-decorator="['blxjje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量表外不良贷款余额">
          <a-input placeholder="请输入存量表外不良贷款余额" v-decorator="['clbwbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前表外不良贷款余额">
          <a-input placeholder="请输入当前表外不良贷款余额" v-decorator="['dybwbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外不良下降金额">
          <a-input placeholder="请输入表外不良下降金额" v-decorator="['bwblxjje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量手机银行户数">
          <a-input placeholder="请输入存量手机银行户数" v-decorator="['clsjyhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行户数">
          <a-input placeholder="请输入手机银行户数" v-decorator="['dysjyhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行净增户数">
          <a-input placeholder="请输入手机银行净增户数" v-decorator="['sjyhjzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量etc户数">
          <a-input placeholder="请输入存量etc户数" v-decorator="['cletchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前etc户数">
          <a-input placeholder="请输入当前etc户数" v-decorator="['dyetchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ETC净增户数">
          <a-input placeholder="请输入ETC净增户数" v-decorator="['etcjzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早借款日期">
          <a-date-picker v-decorator="[ 'zzjkrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早开户日期">
          <a-date-picker v-decorator="[ 'zzkhrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行开户日期">
          <a-date-picker v-decorator="[ 'sjyhkhrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="etc开户日期">
          <a-date-picker v-decorator="[ 'zzetckhrq', {}]" />
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
    name: "Grxdgtzyb2Modal",
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
          add: "/tjfx.xdgtzyb.grxdgtzyb2/grxdgtzyb2/add",
          edit: "/tjfx.xdgtzyb.grxdgtzyb2/grxdgtzyb2/edit",
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
          this.form.setFieldsValue(pick(this.model,'sszh','xzc','xzz','zkhjl','hhbm','khmc','zjhm','sfhz','clckye','dyckye','ckjzye','clhs','dyhs','ckjzhs','cldkye','dydkye','dkjzye','cldkhs','dydkhs','dkjzhs','clbldkye','dybldkye','blxjje','clbwbldkye','dybwbldkye','bwblxjje','clsjyhhs','dysjyhhs','sjyhjzhs','cletchs','dyetchs','etcjzhs'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({clrq:this.model.clrq?moment(this.model.clrq):null})
          this.form.setFieldsValue({zzjkrq:this.model.zzjkrq?moment(this.model.zzjkrq):null})
          this.form.setFieldsValue({zzkhrq:this.model.zzkhrq?moment(this.model.zzkhrq):null})
          this.form.setFieldsValue({sjyhkhrq:this.model.sjyhkhrq?moment(this.model.sjyhkhrq):null})
          this.form.setFieldsValue({zzetckhrq:this.model.zzetckhrq?moment(this.model.zzetckhrq):null})
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
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            formData.clrq = formData.clrq?formData.clrq.format():null;
            formData.zzjkrq = formData.zzjkrq?formData.zzjkrq.format():null;
            formData.zzkhrq = formData.zzkhrq?formData.zzkhrq.format():null;
            formData.sjyhkhrq = formData.sjyhkhrq?formData.sjyhkhrq.format():null;
            formData.zzetckhrq = formData.zzetckhrq?formData.zzetckhrq.format():null;
            
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