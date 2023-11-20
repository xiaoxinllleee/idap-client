<template>
  <a-modal
    :title="title"
    width="75%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务类别代码">
              <a-input placeholder="请输入业务类别代码" v-decorator="['ywlbdm', validatorRules.ywlbdm ]" :disabled="this.model.ywlbdm"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务类别名称">
              <a-input placeholder="请输入业务类别名称" v-decorator="['ywlbmc', validatorRules.ywlbmc ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="对应交易码">
              <a-input placeholder="请输入对应交易码" v-decorator="['dyjym', validatorRules.dyjym ]" :disabled="this.model.ywlbdm"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折算笔数">
              <a-input placeholder="请输入折算笔数" v-decorator="['zsbs', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折算计算式">
              <a-input placeholder="请输入折算计算式" v-decorator="['zsbseval', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="分配标志">
              <j-dict-select-tag placeholder="请选择分配标志" v-decorator="['fpbz', {}]" :triggerChange="true"
                                 dictCode="fpbz"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="分配比例">
              <a-input placeholder="请输入分配比例" v-decorator="['fpbl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="有效标志">
              <j-dict-select-tag placeholder="请选择有效标志" v-decorator="['yxbz', {}]" :triggerChange="true"
                                 dictCode="sfqy"/>
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
    name: "YwlbglModal",
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
        ywlbdm:{rules: [{ required: true, message: '请输入业务类别代码!' }]},
        ywlbmc:{rules: [{ required: true, message: '请输入业务类别名称!' }]},
        dyjym:{rules: [{ required: true, message: '请输入对应交易码!' }]},
        },
        url: {
          add: "/ywlbgl/ywlbgl/add",
          edit: "/ywlbgl/ywlbgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({zsbs: '1', zsbseval: 'YWBS*ZSBS', fpbz: '0', yxbz: '1'});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'ywlbdm','ywlbmc','dyjym','zsbs','zsbseval','fpbz','fpbl','yxbz'))
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
            if(!this.model.ywlbdm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);

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