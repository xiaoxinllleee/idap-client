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
          label="指标类型"
        >
          <a-select :value="selectValue" @select="selectValueFunction"  :disabled="selectDisable" v-decorator="['dirType', {}]">
            <a-select-option value="0">指标目录</a-select-option>
            <a-select-option value="1">指标分类</a-select-option>
          </a-select>

        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类型名称">
          <a-input placeholder="请输入类型名称" v-decorator="['typeName', {}]" />
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级类型编号">
          <a-input placeholder="请输入上级类型编号" v-decorator="['parentId', {}]" />
        </a-form-item>-->
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="叶节点标志">
          <a-input placeholder="请输入叶节点标志" v-decorator="['leafFlag', {}]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="层级"
        >
          <a-input v-model="level0" disabled=""/>
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类型标识">
          <a-input placeholder="请输入类型标识" v-decorator="['dirType', {}]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务条线编号">
          <a-input placeholder="总行-跨支行条线" v-decorator="['bussSysNo', {}]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属机构">
          <a-input placeholder="总行" v-decorator="['orgId', {}]" disabled/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'

  export default {
    name: "PmaFBaseIndexTypeModal",
    data () {
      return {
        selectValue:'',
        title:"操作",
        visible: false,
        selectDisable:true,
        model: {},
        level0: '',
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
          add: "/khlc/jczbgl/pmaFBaseIndexType/add",
          edit: "/khlc/jczbgl/pmaFBaseIndexType/edit",
        },
      }
    },
    created () {
    },
    methods: {
      selectValueFunction(value){
        console.log(value)
      },
      add (data) {
        this.form.resetFields();
        this.visible = true;
        this.selectDisable=false;
        this.selectValue="0";
        this.model.parentId = data.id;
        this.model.level0 = data.level0;
        this.level0 = data.level0+1;
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        console.log("===record")
        console.log(this.model)
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'typeName','parentId','leafFlag','level0','dirType','bussSysNo','orgId'))
		  //时间格式化
        });
        this.selectValue = record.dirType;

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
            if(this.model.id == null || this.model.id == ''){
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
      handleAdd(){
        console.log(this.model.dirType)
      }


    }
  }
</script>

<style lang="less" scoped>

</style>