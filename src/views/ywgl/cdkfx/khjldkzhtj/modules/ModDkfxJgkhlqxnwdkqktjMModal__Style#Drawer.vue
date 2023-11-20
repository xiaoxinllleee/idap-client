<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="权限外贷款笔数">
          <a-input placeholder="请输入权限外贷款笔数" v-decorator="['dbqxwdkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dbqxwdkhs">
          <a-input placeholder="请输入dbqxwdkhs" v-decorator="['dbqxwdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhdkje">
          <a-input placeholder="请输入dhdkje" v-decorator="['dhdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhdkye">
          <a-input placeholder="请输入dhdkye" v-decorator="['dhdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhdkbs">
          <a-input placeholder="请输入dhdkbs" v-decorator="['dhdkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款户数">
          <a-input placeholder="请输入贷款户数" v-decorator="['dhdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhqxndkje">
          <a-input placeholder="请输入dhqxndkje" v-decorator="['dhqxndkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhqxndkye">
          <a-input placeholder="请输入dhqxndkye" v-decorator="['dhqxndkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhqxndkbs">
          <a-input placeholder="请输入dhqxndkbs" v-decorator="['dhqxndkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="权限内贷款户数">
          <a-input placeholder="请输入权限内贷款户数" v-decorator="['dhqxndkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhqxwdkje">
          <a-input placeholder="请输入dhqxwdkje" v-decorator="['dhqxwdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhqxwdkye">
          <a-input placeholder="请输入dhqxwdkye" v-decorator="['dhqxwdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dhqxwdkbs">
          <a-input placeholder="请输入dhqxwdkbs" v-decorator="['dhqxwdkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="权限外贷款户数">
          <a-input placeholder="请输入权限外贷款户数" v-decorator="['dhqxwdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放贷款金额(元)">
          <a-input placeholder="请输入发放贷款金额(元)" v-decorator="['ffdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放贷款笔数">
          <a-input placeholder="请输入发放贷款笔数" v-decorator="['ffdkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放权限内贷款金额(元)">
          <a-input placeholder="请输入发放权限内贷款金额(元)" v-decorator="['ffqxndkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放权限内贷款笔数">
          <a-input placeholder="请输入发放权限内贷款笔数" v-decorator="['ffqxndkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放权限外贷款金额(元)">
          <a-input placeholder="请输入发放权限外贷款金额(元)" v-decorator="['ffqxwdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放权限外贷款笔数">
          <a-input placeholder="请输入发放权限外贷款笔数" v-decorator="['ffqxwdkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收回利息(元)">
          <a-input placeholder="请输入收回利息(元)" v-decorator="['shlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收回本金(元)">
          <a-input placeholder="请输入收回本金(元)" v-decorator="['shbj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lrsj">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lrbz">
          <a-input placeholder="请输入lrbz" v-decorator="['lrbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lrczy">
          <a-input placeholder="请输入lrczy" v-decorator="['lrczy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', validatorRules.jgdm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理标识">
          <a-input placeholder="请输入客户经理标识" v-decorator="['custid', validatorRules.custid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', validatorRules.tjyf ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始日期">
          <a-date-picker v-decorator="[ 'beginday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-date-picker v-decorator="[ 'endday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额(元)">
          <a-input placeholder="请输入贷款金额(元)" v-decorator="['dbdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额(元)">
          <a-input placeholder="请输入贷款余额(元)" v-decorator="['dbdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款笔数">
          <a-input placeholder="请输入贷款笔数" v-decorator="['dbdkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dbdkhs">
          <a-input placeholder="请输入dbdkhs" v-decorator="['dbdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dbqxndkje">
          <a-input placeholder="请输入dbqxndkje" v-decorator="['dbqxndkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dbqxndkye">
          <a-input placeholder="请输入dbqxndkye" v-decorator="['dbqxndkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="权限内贷款笔数">
          <a-input placeholder="请输入权限内贷款笔数" v-decorator="['dbqxndkbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dbqxndkhs">
          <a-input placeholder="请输入dbqxndkhs" v-decorator="['dbqxndkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dbqxwdkje">
          <a-input placeholder="请输入dbqxwdkje" v-decorator="['dbqxwdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dbqxwdkye">
          <a-input placeholder="请输入dbqxwdkye" v-decorator="['dbqxwdkye', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "ModDkfxJgkhlqxnwdkqktjMModal",
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
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        custid:{rules: [{ required: true, message: '请输入客户经理标识!' }]},
        tjyf:{rules: [{ required: true, message: '请输入统计月份!' }]},
        },
        url: {
          add: "/khjldkzhtj/modDkfxJgkhlqxnwdkqktjM/add",
          edit: "/khjldkzhtj/modDkfxJgkhlqxnwdkqktjM/edit",
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
          this.form.setFieldsValue(pick(this.model,'dbqxwdkbs','dbqxwdkhs','dhdkje','dhdkye','dhdkbs','dhdkhs','dhqxndkje','dhqxndkye','dhqxndkbs','dhqxndkhs','dhqxwdkje','dhqxwdkye','dhqxwdkbs','dhqxwdkhs','ffdkje','ffdkbs','ffqxndkje','ffqxndkbs','ffqxwdkje','ffqxwdkbs','shlx','shbj','lrbz','lrczy','jgdm','custid','dbdkje','dbdkye','dbdkbs','dbdkhs','dbqxndkje','dbqxndkye','dbqxndkbs','dbqxndkhs','dbqxwdkje','dbqxwdkye'))
		  //时间格式化
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({beginday:this.model.beginday?moment(this.model.beginday):null})
          this.form.setFieldsValue({endday:this.model.endday?moment(this.model.endday):null})
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
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            formData.beginday = formData.beginday?formData.beginday.format():null;
            formData.endday = formData.endday?formData.endday.format():null;
            
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
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>