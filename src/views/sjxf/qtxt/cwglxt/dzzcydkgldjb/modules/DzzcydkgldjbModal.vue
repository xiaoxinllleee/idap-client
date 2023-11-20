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
          label="资产编号">
          <a-input placeholder="请输入资产编号" v-decorator="['capNo', validatorRules.capNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵债贷款账号">
          <a-input placeholder="请输入抵债贷款账号" v-decorator="['dkAcNo', validatorRules.dkAcNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户名">
          <a-input placeholder="请输入户名" v-decorator="['dkAcName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金">
          <a-input placeholder="请输入本金" v-decorator="['amt1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内利息">
          <a-input placeholder="请输入表内利息" v-decorator="['amt2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外利息">
          <a-input placeholder="请输入表外利息" v-decorator="['amt3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵债类型">
          <a-input placeholder="请输入抵债类型" v-decorator="['type', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲本金">
          <a-input placeholder="请输入冲本金" v-decorator="['amt11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲表内利息">
          <a-input placeholder="请输入冲表内利息" v-decorator="['amt22', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲表外利息">
          <a-input placeholder="请输入冲表外利息" v-decorator="['amt33', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲减合计">
          <a-input placeholder="请输入冲减合计" v-decorator="['sumAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="待定">
          <a-input placeholder="请输入待定" v-decorator="['devAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['curNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息">
          <a-input placeholder="请输入利息" v-decorator="['accrual', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还贷方式">
          <a-input placeholder="请输入还贷方式" v-decorator="['payType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款指令号">
          <a-input placeholder="请输入付款指令号" v-decorator="['payNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['edate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
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
    name: "DzzcydkgldjbModal",
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
        capNo:{rules: [{ required: true, message: '请输入资产编号!' }]},
        dkAcNo:{rules: [{ required: true, message: '请输入抵债贷款账号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/dzzcydkgldjb/dzzcydkgldjb/add",
          edit: "/dzzcydkgldjb/dzzcydkgldjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'capNo','dkAcNo','dkAcName','amt1','amt2','amt3','type','amt11','amt22','amt33','sumAmt','devAmt','curNo','accrual','payType','payNo','sdate','edate','loadDate','legalNo','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
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
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
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