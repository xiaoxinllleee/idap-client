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
          label="日期">
          <a-input placeholder="请输入日期" v-decorator="['statDate', validatorRules.statDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价对象ID">
          <a-input placeholder="请输入评价对象ID" v-decorator="['evlObjId', validatorRules.evlObjId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础指标编号">
          <a-input placeholder="请输入基础指标编号" v-decorator="['indexId', validatorRules.indexId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标值">
          <a-input placeholder="请输入指标值" v-decorator="['indexValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="余额类型">
          <a-input placeholder="请输入余额类型" v-decorator="['balTypeId', validatorRules.balTypeId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价对象类型">
          <a-input placeholder="请输入评价对象类型" v-decorator="['evlObjType', validatorRules.evlObjType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['curTypeId', validatorRules.curTypeId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应用类型">
          <a-input placeholder="请输入应用类型" v-decorator="['applyTypeId', validatorRules.applyTypeId ]" />
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
    name: "PmaFBaseIndexResModal",
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
        statDate:{rules: [{ required: true, message: '请输入日期!' }]},
        evlObjId:{rules: [{ required: true, message: '请输入评价对象ID!' }]},
        indexId:{rules: [{ required: true, message: '请输入基础指标编号!' }]},
        balTypeId:{rules: [{ required: true, message: '请输入余额类型!' }]},
        evlObjType:{rules: [{ required: true, message: '请输入评价对象类型!' }]},
        curTypeId:{rules: [{ required: true, message: '请输入币种!' }]},
        applyTypeId:{rules: [{ required: true, message: '请输入应用类型!' }]},
        },
        url: {
          add: "/jczbjg/pmaFBaseIndexRes/add",
          edit: "/jczbjg/pmaFBaseIndexRes/edit",
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
          this.form.setFieldsValue(pick(this.model,'statDate','evlObjId','indexId','indexValue','balTypeId','evlObjType','curTypeId','applyTypeId'))
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