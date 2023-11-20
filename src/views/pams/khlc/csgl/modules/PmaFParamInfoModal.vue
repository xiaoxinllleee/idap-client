<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="参数编号">
              <a-input placeholder="参数编号自动生成"  v-decorator="['paramId', {}]" disabled="disabled" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="参数名称">
              <a-input placeholder="请输入参数名称" v-decorator="['paramName', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="参数值">
              <a-input placeholder="请输入参数值" v-decorator="['paramValue', {}]" />
            </a-form-item>
          </a-col>

          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="描述">
              <a-input placeholder="请输入描述" v-decorator="['remark', {}]" />
            </a-form-item>
          </a-col>

        </a-row>
        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="参数值下限">
              <a-input placeholder="请输入参数值下限" v-decorator="['minLimit', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="参数值上限">
              <a-input placeholder="请输入参数值上限" v-decorator="['maxLimit', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "PmaFParamInfoModal",
    data () {
      return {
        menuJdId:'',
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
          add: "/csgl/csxx/pmaFParamInfo/add",
          edit: "/csgl/csxx/pmaFParamInfo/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add (menuId) {
        this.menuJdId=menuId;
        this.edit({dirId:this.menuJdId});
      },
      edit (record) {
        console.log('record',record);
        this.menuJdId=record.dirId;
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'paramName','remark','orgId','statFlag','dirId','paramValue','paramId','minLimit','maxLimit','area','bussSysNo'))
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