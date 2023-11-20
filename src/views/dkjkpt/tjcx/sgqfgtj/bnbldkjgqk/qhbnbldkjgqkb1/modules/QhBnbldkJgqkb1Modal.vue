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
          label="单户50万元以下户数">
          <a-input placeholder="请输入单户50万元以下户数" v-decorator="['dhqj1hs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户50万元以下金额">
          <a-input placeholder="请输入单户50万元以下金额" v-decorator="['dhqj1je', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户50万元至500万元户数">
          <a-input placeholder="请输入单户50万元至500万元户数" v-decorator="['dhqj2hs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户50万元至500万元金额">
          <a-input placeholder="请输入单户50万元至500万元金额" v-decorator="['dhqj2je', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户500万元至1000万元户数">
          <a-input placeholder="请输入单户500万元至1000万元户数" v-decorator="['dhqj3hs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户500万元至1000万元金额">
          <a-input placeholder="请输入单户500万元至1000万元金额" v-decorator="['dhqj3je', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户1000万元以上户数">
          <a-input placeholder="请输入单户1000万元以上户数" v-decorator="['dhqj4hs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户1000万元以上金额">
          <a-input placeholder="请输入单户1000万元以上金额" v-decorator="['dhqj4je', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外贷款总户数">
          <a-input placeholder="请输入表外贷款总户数" v-decorator="['bwdkzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外贷款总额">
          <a-input placeholder="请输入表外贷款总额" v-decorator="['bwdkzje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农商银行改制前户数">
          <a-input placeholder="请输入农商银行改制前户数" v-decorator="['nshgzqhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农商银行改制前金额">
          <a-input placeholder="请输入农商银行改制前金额" v-decorator="['nshgzqje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农商银行改制后户数">
          <a-input placeholder="请输入农商银行改制后户数" v-decorator="['nshgzhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农商银行改制后金额">
          <a-input placeholder="请输入农商银行改制后金额" v-decorator="['nshgzhje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用户数">
          <a-input placeholder="请输入信用户数" v-decorator="['xyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用金额">
          <a-input placeholder="请输入信用金额" v-decorator="['xyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押户数">
          <a-input placeholder="请输入抵押户数" v-decorator="['dyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押金额">
          <a-input placeholder="请输入抵押金额" v-decorator="['dyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证户数">
          <a-input placeholder="请输入保证户数" v-decorator="['bzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金额">
          <a-input placeholder="请输入保证金额" v-decorator="['bzje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="质押户数">
          <a-input placeholder="请输入质押户数" v-decorator="['zyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="质押金额">
          <a-input placeholder="请输入质押金额" v-decorator="['zyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组合户数">
          <a-input placeholder="请输入组合户数" v-decorator="['zhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组合金额">
          <a-input placeholder="请输入组合金额" v-decorator="['zhje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农业类贷款户数">
          <a-input placeholder="请输入农业类贷款户数" v-decorator="['nyldkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农业类贷款金额">
          <a-input placeholder="请输入农业类贷款金额" v-decorator="['nyldkdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="制造业贷款户数">
          <a-input placeholder="请输入制造业贷款户数" v-decorator="['zzykhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="制造业贷款金额">
          <a-input placeholder="请输入制造业贷款金额" v-decorator="['zzydkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务业贷款户数">
          <a-input placeholder="请输入服务业贷款户数" v-decorator="['fwydkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务业贷款金额">
          <a-input placeholder="请输入服务业贷款金额" v-decorator="['fwydkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="房地产开发贷款户数">
          <a-input placeholder="请输入房地产开发贷款户数" v-decorator="['fdckfdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="房地产开发贷款金额">
          <a-input placeholder="请输入房地产开发贷款金额" v-decorator="['fdckfdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府公共服务类贷款户数">
          <a-input placeholder="请输入政府公共服务类贷款户数" v-decorator="['zfggfwldkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府公共服务类贷款金额">
          <a-input placeholder="请输入政府公共服务类贷款金额" v-decorator="['zfggfwldkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础设施建设贷款户数">
          <a-input placeholder="请输入基础设施建设贷款户数" v-decorator="['jcssjsdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础设施建设贷款金额">
          <a-input placeholder="请输入基础设施建设贷款金额" v-decorator="['jcssjsdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府重点项目贷款户数">
          <a-input placeholder="请输入政府重点项目贷款户数" v-decorator="['zfzdxmdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府重点项目贷款金额">
          <a-input placeholder="请输入政府重点项目贷款金额" v-decorator="['zfzdxmdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他贷款户数">
          <a-input placeholder="请输入其他贷款户数" v-decorator="['qtdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他贷款金额">
          <a-input placeholder="请输入其他贷款金额" v-decorator="['qtdkje', {}]" />
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
    name: "QhBnbldkJgqkb1Modal",
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
          add: "/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb1/qhBnbldkJgqkb1/add",
          edit: "/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb1/qhBnbldkJgqkb1/edit",
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
          this.form.setFieldsValue(pick(this.model,'dhqj1hs','dhqj1je','dhqj2hs','dhqj2je','dhqj3hs','dhqj3je','dhqj4hs','dhqj4je','bwdkzhs','bwdkzje','nshgzqhs','nshgzqje','nshgzhhs','nshgzhje','xyhs','xyje','dyhs','dyje','bzhs','bzje','zyhs','zyje','zhhs','zhje','nyldkhs','nyldkdkje','zzykhs','zzydkje','fwydkhs','fwydkje','fdckfdkhs','fdckfdkje','zfggfwldkhs','zfggfwldkje','jcssjsdkhs','jcssjsdkje','zfzdxmdkhs','zfzdxmdkje','qtdkhs','qtdkje'))
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