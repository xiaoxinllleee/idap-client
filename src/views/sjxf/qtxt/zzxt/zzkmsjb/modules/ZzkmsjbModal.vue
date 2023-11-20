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
          label="机构编码">
          <a-input placeholder="请输入机构编码" v-decorator="['brhmNo', validatorRules.brhmNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种编码">
          <a-input placeholder="请输入币种编码" v-decorator="['currNo', validatorRules.currNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目编码">
          <a-input placeholder="请输入科目编码" v-decorator="['itemNo', validatorRules.itemNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日初借方金额">
          <a-input placeholder="请输入日初借方金额" v-decorator="['dayBeginDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日初贷方金额">
          <a-input placeholder="请输入日初贷方金额" v-decorator="['dayBeginCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日初借方笔数">
          <a-input placeholder="请输入日初借方笔数" v-decorator="['dayBeginDrCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日初贷方笔数">
          <a-input placeholder="请输入日初贷方笔数" v-decorator="['dayBeginCrCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日发生借方金额">
          <a-input placeholder="请输入日发生借方金额" v-decorator="['dayNetDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日发生贷方金额">
          <a-input placeholder="请输入日发生贷方金额" v-decorator="['dayNetCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日发生借方笔数">
          <a-input placeholder="请输入日发生借方笔数" v-decorator="['dayNetDrCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日发生贷方笔数">
          <a-input placeholder="请输入日发生贷方笔数" v-decorator="['dayNetCrCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日末借方金额">
          <a-input placeholder="请输入日末借方金额" v-decorator="['dayEndDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日末贷方金额">
          <a-input placeholder="请输入日末贷方金额" v-decorator="['dayEndCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日末借方笔数">
          <a-input placeholder="请输入日末借方笔数" v-decorator="['dayEndDrCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日末贷方笔数">
          <a-input placeholder="请输入日末贷方笔数" v-decorator="['dayEndCrCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月初借方金额">
          <a-input placeholder="请输入月初借方金额" v-decorator="['monthBeginDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月初贷方金额">
          <a-input placeholder="请输入月初贷方金额" v-decorator="['monthBeginCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月发生借方金额">
          <a-input placeholder="请输入月发生借方金额" v-decorator="['monthNetDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月发生贷方金额">
          <a-input placeholder="请输入月发生贷方金额" v-decorator="['monthNetCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季初借方金额">
          <a-input placeholder="请输入季初借方金额" v-decorator="['quarterBeginDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季初贷方金额">
          <a-input placeholder="请输入季初贷方金额" v-decorator="['quarterBeginCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季发生借方金额">
          <a-input placeholder="请输入季发生借方金额" v-decorator="['quarterNetDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季发生贷方金额">
          <a-input placeholder="请输入季发生贷方金额" v-decorator="['quarterNetCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年初借方金额">
          <a-input placeholder="请输入年初借方金额" v-decorator="['yearBeginDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年初贷方金额">
          <a-input placeholder="请输入年初贷方金额" v-decorator="['yearBeginCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年发生借方金额">
          <a-input placeholder="请输入年发生借方金额" v-decorator="['yearNetDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年发生贷方金额">
          <a-input placeholder="请输入年发生贷方金额" v-decorator="['yearNetCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['dataDate', validatorRules.dataDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载日期">
          <a-input placeholder="请输入加载日期" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
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
    name: "ZzkmsjbModal",
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
        brhmNo:{rules: [{ required: true, message: '请输入机构编码!' }]},
        currNo:{rules: [{ required: true, message: '请输入币种编码!' }]},
        itemNo:{rules: [{ required: true, message: '请输入科目编码!' }]},
        dataDate:{rules: [{ required: true, message: '请输入数据日期!' }]},
        },
        url: {
          add: "/zzkmsjb/zzkmsjb/add",
          edit: "/zzkmsjb/zzkmsjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'brhmNo','currNo','itemNo','dayBeginDr','dayBeginCr','dayBeginDrCount','dayBeginCrCount','dayNetDr','dayNetCr','dayNetDrCount','dayNetCrCount','dayEndDr','dayEndCr','dayEndDrCount','dayEndCrCount','monthBeginDr','monthBeginCr','monthNetDr','monthNetCr','quarterBeginDr','quarterBeginCr','quarterNetDr','quarterNetCr','yearBeginDr','yearBeginCr','yearNetDr','yearNetCr','dataDate','loadDate','legalNo'))
		  //时间格式化
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