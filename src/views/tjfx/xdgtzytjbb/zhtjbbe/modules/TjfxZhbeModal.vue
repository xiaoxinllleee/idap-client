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
          label="责任人">
          <a-input placeholder="请输入责任人" v-decorator="['zrre', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政村（居委会）">
          <a-input placeholder="请输入行政村（居委会）" v-decorator="['xzc', {}]" />
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
          label="当期存款余额">
          <a-input placeholder="请输入当期存款余额" v-decorator="['dqckye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款净增金额">
          <a-input placeholder="请输入存款净增金额" v-decorator="['ckjzje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量存款客户数">
          <a-input placeholder="请输入存量存款客户数" v-decorator="['clckkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期贷款余额">
          <a-input placeholder="请输入当期贷款余额" v-decorator="['dqdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款净增金额">
          <a-input placeholder="请输入贷款净增金额" v-decorator="['dkjzje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前存款客户数">
          <a-input placeholder="请输入当前存款客户数" v-decorator="['dqckkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期不良贷款余额">
          <a-input placeholder="请输入当期不良贷款余额" v-decorator="['dqbldkye', {}]" />
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
          label="存量不良贷款余额">
          <a-input placeholder="请输入存量不良贷款余额" v-decorator="['clbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良下降金额">
          <a-input placeholder="请输入不良下降金额" v-decorator="['blxjye', {}]" />
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
          label="存量贷款客户">
          <a-input placeholder="请输入存量贷款客户" v-decorator="['cldkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前贷款客户">
          <a-input placeholder="请输入当前贷款客户" v-decorator="['dydkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款客户增加数">
          <a-input placeholder="请输入存款客户增加数" v-decorator="['ckkhzjs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款客户增加数">
          <a-input placeholder="请输入贷款客户增加数" v-decorator="['dkkhjzs', {}]" />
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
          label="当期表外不良余额">
          <a-input placeholder="请输入当期表外不良余额" v-decorator="['dybwbldkye', {}]" />
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
          label="当前手机银行户数">
          <a-input placeholder="请输入当前手机银行户数" v-decorator="['dysjyhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行增加户数">
          <a-input placeholder="请输入手机银行增加户数" v-decorator="['sjyhjzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量ETC户数">
          <a-input placeholder="请输入存量ETC户数" v-decorator="['cletchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前ETC户数">
          <a-input placeholder="请输入当前ETC户数" v-decorator="['dyetchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ETC增加户数">
          <a-input placeholder="请输入ETC增加户数" v-decorator="['etchsjz', {}]" />
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
    name: "TjfxZhbeModal",
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
          add: "/tjfx.xdgtzytjbb.zhtjbbe/tjfxZhbe/add",
          edit: "/tjfx.xdgtzytjbb.zhtjbbe/tjfxZhbe/edit",
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
          this.form.setFieldsValue(pick(this.model,'zrre','xzc','clckye','dqckye','ckjzje','clckkhs','dqdkye','dkjzje','dqckkhs','dqbldkye','cldkye','clbldkye','blxjye','bwblxjje','cldkhs','dydkhs','ckkhzjs','dkkhjzs','clbwbldkye','dybwbldkye','clsjyhhs','dysjyhhs','sjyhjzhs','cletchs','dyetchs','etchsjz'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
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