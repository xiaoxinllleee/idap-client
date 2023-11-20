<template>
  <a-modal :title="title"
           :width="900"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false" style="background-color: #FFF;">
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item label="是否启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
          </a-form-item></a-col></a-row>
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item label="等级编号"  :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input placeholder="请输入等级编号" :disabled="this.djbhFlag" v-decorator="['djbh', validatorRules.djbh ]"/>
            </a-form-item></a-col>
            <a-col :span="12" :gutter="8"><a-form-item label="等级名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input placeholder="请输入等级名称" v-decorator="['djmc', validatorRules.djmc]"/>
            </a-form-item></a-col>
          </a-row>
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item label="客户类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <j-dict-select-tag placeholder="请选择客户类型" v-decorator="['khlx', validatorRules.khlx]"
                                 dict-code="khlx" :trigger-change="true"/>
            </a-form-item></a-col>
            <a-col :span="12" :gutter="8"><a-form-item label="等级系数" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input-number placeholder="请输入等级系数" v-decorator="['djxs', validatorRules.djxs]"
                              :min="0" :max="100" style="width: 267px;"/>
            </a-form-item></a-col>
          </a-row>
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item label="分数值起" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input-number placeholder="请输入分数值起" v-decorator="['fszbegin', validatorRules.fszbegin]"
                              :min="0" style="width: 267px;"/>
            </a-form-item></a-col>
            <a-col :span="12" :gutter="8"><a-form-item label="分数值止" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input-number placeholder="请输入分数值止" v-decorator="['fszend', validatorRules.fszend]"
                              :min="0" style="width: 267px;"/>
            </a-form-item></a-col>
          </a-row>
          <a-row><a-col :span="12" :gutter="8"><a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" :row="2"/>
          </a-form-item></a-col></a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "PjsxKhdjszModal",
    data () {
      return {
        title:"操作",
        visible: false,
        visibleCheck: true,
        confirmLoading: false,
        status: 1,
        djbhFlag:false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
          djbh:{rules: [{ required: true, message: '请输入等级编号！' }]},
          djmc:{rules: [{ required: true, message: '请输入等级名称！' }]},
          khlx:{rules: [{ required: true, message: '请选择客户类型！' }]},
          fszbegin:{rules: [{ required: true, message: '请输入分数值起！' }]},
          fszend:{rules: [{ required: true, message: '请输入分数值止！' }]},
          djxs:{rules: [{ required: true, message: '请输入等级系数！' }]},
        },
        url: {
          add: "/pjsxdjsz/pjsxKhdjsz/add",
          edit: "/pjsxdjsz/pjsxKhdjsz/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.djbhFlag=false;
        this.edit({});
      },
      edit (record) {
        if (record.id) {
          this.djbhFlag=true;
          this.visibleCheck = (record.status == 1) ? true : false;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.model.status = this.status;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'djbh','djmc','fszbegin','fszend','djxs','khlx','status','qydm','bz'))
        });
      },
      onChose(checked) {
        if (checked) {
          this.status = 1;
          this.visibleCheck = true;
        } else {
          this.status = 2;
          this.visibleCheck = false;
        }
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
            console.log(formData)
            formData.status = this.status;
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
      close () {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style lang="less" scoped>

</style>