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
          label="开始时间">
          <a-date-picker v-decorator="[ 'kssj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束时间">
          <a-date-picker v-decorator="[ 'jssj', {}]" />
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
          label="网格编号">
          <a-input placeholder="请输入网格编号" v-decorator="['wgbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="走访户数">
          <a-input placeholder="请输入走访户数" v-decorator="['zfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效走访户数">
          <a-input placeholder="请输入有效走访户数" v-decorator="['yxzfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评议户数">
          <a-input placeholder="请输入评议户数" v-decorator="['pyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评议金额">
          <a-input placeholder="请输入评议金额" v-decorator="['pyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评级授信户数">
          <a-input placeholder="请输入评级授信户数" v-decorator="['pjsxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预授信金额">
          <a-input placeholder="请输入预授信金额" v-decorator="['ysxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款户数">
          <a-input placeholder="请输入贷款户数" v-decorator="['dkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额">
          <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款转化户数">
          <a-input placeholder="请输入贷款转化户数" v-decorator="['dkzhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款转化率">
          <a-input placeholder="请输入贷款转化率" v-decorator="['dkzhl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款户数">
          <a-input placeholder="请输入存款户数" v-decorator="['ljhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款余额">
          <a-input placeholder="请输入存款余额" v-decorator="['ljye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="活期户数">
          <a-input placeholder="请输入活期户数" v-decorator="['hqhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="活期余额">
          <a-input placeholder="请输入活期余额" v-decorator="['hqye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期户数">
          <a-input placeholder="请输入定期户数" v-decorator="['dqhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期余额">
          <a-input placeholder="请输入定期余额" v-decorator="['dqye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款转化户数">
          <a-input placeholder="请输入存款转化户数" v-decorator="['ckzhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款转化率">
          <a-input placeholder="请输入存款转化率" v-decorator="['ckzhl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行户数">
          <a-input placeholder="请输入手机银行户数" v-decorator="['sjyhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行转化户数">
          <a-input placeholder="请输入手机银行转化户数" v-decorator="['sjyhzhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行转化率">
          <a-input placeholder="请输入手机银行转化率" v-decorator="['sjyhzhl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网上银行户数">
          <a-input placeholder="请输入网上银行户数" v-decorator="['wsyhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网上银行转化户数">
          <a-input placeholder="请输入网上银行转化户数" v-decorator="['wsyhzhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网上银行转化率">
          <a-input placeholder="请输入网上银行转化率" v-decorator="['wsyhzhl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ETC户数">
          <a-input placeholder="请输入ETC户数" v-decorator="['etchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ETC转化户数">
          <a-input placeholder="请输入ETC转化户数" v-decorator="['etzhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ETC转化率">
          <a-input placeholder="请输入ETC转化率" v-decorator="['etczhl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用卡户数">
          <a-input placeholder="请输入信用卡户数" v-decorator="['xykhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用卡转化户数">
          <a-input placeholder="请输入信用卡转化户数" v-decorator="['xykzhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用卡转化率">
          <a-input placeholder="请输入信用卡转化率" v-decorator="['xykzhl', {}]" />
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
    name: "WghzModal",
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
          add: "/khzhhz/wghz/add",
          edit: "/khzhhz/wghz/edit",
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
          this.form.setFieldsValue(pick(this.model,'sszh','wgbh','zfhs','yxzfhs','pyhs','pyje','pjsxhs','ysxje','dkhs','dkje','dkye','dkzhhs','dkzhl','ljhs','ljye','hqhs','hqye','dqhs','dqye','ckzhhs','ckzhl','sjyhhs','sjyhzhhs','sjyhzhl','wsyhhs','wsyhzhhs','wsyhzhl','etchs','etzhhs','etczhl','xykhs','xykzhhs','xykzhl'))
		  //时间格式化
          this.form.setFieldsValue({kssj:this.model.kssj?moment(this.model.kssj):null})
          this.form.setFieldsValue({jssj:this.model.jssj?moment(this.model.jssj):null})
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
            formData.kssj = formData.kssj?formData.kssj.format():null;
            formData.jssj = formData.jssj?formData.jssj.format():null;

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