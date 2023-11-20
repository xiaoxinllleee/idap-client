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
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "Qhzyb2Modal",
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
          add: "/tjfx.xdgtzyb.qhzyb2/qhzyb2/add",
          edit: "/tjfx.xdgtzyb.qhzyb2/qhzyb2/edit",
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
          this.form.setFieldsValue(pick(this.model,'clckye','dyckye','ckjzye','clhs','dyhs','ckjzhs','cldkye','dydkye','dkjzye','cldkhs','dydkhs','dkjzhs','clbldkye','dybldkye','blxjje','clbwbldkye','dybwbldkye','bwblxjje','clsjyhhs','dysjyhhs','sjyhjzhs','cletchs','dyetchs','etcjzhs'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({clrq:this.model.clrq?moment(this.model.clrq):null})
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