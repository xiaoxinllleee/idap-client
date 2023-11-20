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
          label="是否代发工资">
          <a-input placeholder="请输入是否代发工资" v-decorator="['sfdfgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通POS机">
          <a-input placeholder="请输入是否开通POS机" v-decorator="['sfktpos', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通聚合支付">
          <a-input placeholder="请输入是否开通聚合支付" v-decorator="['sfktjhzf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否办理E支付">
          <a-input placeholder="请输入是否办理E支付" v-decorator="['sfblezf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否办理E缴费">
          <a-input placeholder="请输入是否办理E缴费" v-decorator="['sfblejf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否办理助农终端">
          <a-input placeholder="请输入是否办理助农终端" v-decorator="['sfblznzd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否办理理财业务">
          <a-input placeholder="请输入是否办理理财业务" v-decorator="['sfbllcyw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否办理代理保险业务">
          <a-input placeholder="请输入是否办理代理保险业务" v-decorator="['sfbldlbx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否关注我行公众号">
          <a-input placeholder="请输入是否关注我行公众号" v-decorator="['sfgzgzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通信用卡">
          <a-input placeholder="请输入是否开通信用卡" v-decorator="['sfktxyk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通福民卡">
          <a-input placeholder="请输入是否开通福民卡" v-decorator="['sfktfmk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开扫码付">
          <a-input placeholder="请输入是否开扫码付" v-decorator="['sfktsmf', {}]" />
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
          label="花名册id">
          <a-input placeholder="请输入花名册id" v-decorator="['hmcId', {}]" />
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
          label="是否开通存款业务">
          <a-input placeholder="请输入是否开通存款业务" v-decorator="['sfktckyw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款余额">
          <a-input placeholder="请输入存款余额" v-decorator="['ckye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款日平余额">
          <a-input placeholder="请输入存款日平余额" v-decorator="['ckrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款年日平余额">
          <a-input placeholder="请输入存款年日平余额" v-decorator="['cknrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="活期存款余额">
          <a-input placeholder="请输入活期存款余额" v-decorator="['hqckye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期存款余额">
          <a-input placeholder="请输入定期存款余额" v-decorator="['dqckye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="活期存款日平余额">
          <a-input placeholder="请输入活期存款日平余额" v-decorator="['hqckrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期存款日平余额">
          <a-input placeholder="请输入定期存款日平余额" v-decorator="['dqckrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="活期存款年日平余额">
          <a-input placeholder="请输入活期存款年日平余额" v-decorator="['hqcknrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期存款年日平余额">
          <a-input placeholder="请输入定期存款年日平余额" v-decorator="['dqcknrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通贷款业务">
          <a-input placeholder="请输入是否开通贷款业务" v-decorator="['sfktdkyw', {}]" />
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
          label="最近贷款到期日期">
          <a-date-picker v-decorator="[ 'zjdkdqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良贷款余额">
          <a-input placeholder="请输入不良贷款余额" v-decorator="['bldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外不良贷款余额">
          <a-input placeholder="请输入表外不良贷款余额" v-decorator="['bwbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通手机银行业务">
          <a-input placeholder="请输入是否开通手机银行业务" v-decorator="['sfktsjyhyw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通网上银行业务">
          <a-input placeholder="请输入是否开通网上银行业务" v-decorator="['sfktwsyhyw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否办理etc业务">
          <a-input placeholder="请输入是否办理etc业务" v-decorator="['sfbletcyw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通社保卡">
          <a-input placeholder="请输入是否开通社保卡" v-decorator="['sfktsbk', {}]" />
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
    name: "YwhywwlxxModal",
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
          add: "/khgl.nh/ywhywwlxx/add",
          edit: "/khgl.nh/ywhywwlxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'sfdfgz','sfktpos','sfktjhzf','sfblezf','sfblejf','sfblznzd','sfbllcyw','sfbldlbx','sfgzgzh','sfktxyk','sfktfmk','sfktsmf','khmc','hmcId','zjhm','sfktckyw','ckye','ckrpye','cknrpye','hqckye','dqckye','hqckrpye','dqckrpye','hqcknrpye','dqcknrpye','sfktdkyw','dkje','dkye','bldkye','bwbldkye','sfktsjyhyw','sfktwsyhyw','sfbletcyw','sfktsbk'))
		  //时间格式化
          this.form.setFieldsValue({zjdkdqrq:this.model.zjdkdqrq?moment(this.model.zjdkdqrq):null})
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
            formData.zjdkdqrq = formData.zjdkdqrq?formData.zjdkdqrq.format():null;
            
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