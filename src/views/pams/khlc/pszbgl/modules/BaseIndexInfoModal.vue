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
        <a-divider orientation="left">指标信息 </a-divider>
        <a-row :gutter="[16,16]">
        <a-col :span="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="基础指标编号">
            <a-input placeholder="请输入基础指标编号" :disabled="true" v-decorator="['id', {}]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="基础指标名称">
            <a-input placeholder="请输入基础指标名称"  :disabled="true" v-decorator="['typeName', {}]" />
          </a-form-item>
        </a-col>
      </a-row>
        <a-divider orientation="left">指标维度信息 </a-divider>
        <a-row :gutter="[16,16]">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="余额类型">
              <j-dict-select-tag placeholder="请选择余额类型" style="width: 100%;" v-decorator="['yelx', {rules: [{ required: true, message: '请选择余额类型!' }]}]" :triggerChange="true" dictCode="YE_TYPE"/>

            </a-form-item>
          </a-col>
          <a-col :span="12">

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="币种">
              <j-dict-select-tag :disabled='true' placeholder="请选择币种" style="width: 100%;"   v-decorator="['bz', {rules: [{ required: true, message: '请选择币种!'  }]}]" :triggerChange="true" dictCode="BZ_TYPE"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[16,16]">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="应用类型">
              <j-dict-select-tag placeholder="请选择应用类型" style="width: 100%;" v-decorator="['yylx', {rules: [{ required: true, message: '请选择应用类型!'  }]}]" :triggerChange="true" dictCode="INDEX_APPLY_TYPE"/>

            </a-form-item>
          </a-col>
          <a-col :span="12">

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评价对象">
              <j-dict-select-tag placeholder="请选择评价对象" style="width: 100%;" v-decorator="['pjdx', {rules: [{required: true, message: '请选择评价对象!' }]}]" :triggerChange="true" dictCode="OBJ"/>

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
  import { duplicateCheck, duplicateCheckPams } from '@api/api'

  export default {
    name: "PmaFBaseIndexInfoModal",
    data () {
      return {
        title:"指标信息",
        visible: false,
        model: {},
        id:'',
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          Id:{
            rules: [{
              required: true, message: '请输入指标编号!'
            },{
              validator: this.validateId,
            }]
          },
          indexName:{rules: [{ required: true, message: '请输入派生指标名称!' }]},
        },
        url: {
          add: "/jczbgl/pmaFBaseIndexInfo/add",
          edit: "/jczbgl/pmaFBaseIndexInfo/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add (data) {
        this.model.indexId = data
        this.form.resetFields();
        this.visible = true;
        this.selectDisable=false;
      },
      edit (record) {
        console.log(record)
        record.bz='01'
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'id','typeName','bz'))
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
            let formData = Object.assign(this.model, values);
            console.log("1======>"+formData)

            var data=formData.id+'['+formData.yelx+'.'+formData.bz+'.'+formData.yylx+'.'+formData.pjdx+']'+'=' + formData.typeName
            console.log("1======>"+data)
            that.$emit('ok',data);
            that.close();
            that.confirmLoading = false;
          }
        })
      },
      validateId(rule, value, callback){
        var params = {
          tableName: 'PMA_F_BASE_INDEX_INFO',
          fieldName: 'ID',
          fieldVal: value,
          dataId: this.Id
        };
        duplicateCheckPams(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            if(!this.flag){
              callback("用户名已存在!")
            }else{
              callback()
            }
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