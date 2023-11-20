<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false" style="background-color: #FFF;">
          <a-row><a-col :span="12" :gutter="8"><a-form-item label="是否启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
          </a-form-item></a-col></a-row>
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目编号" hasFeedback>
              <a-input placeholder="请输入项目编号" v-decorator="['xmbh', validatorRules.xmbh ]" />
            </a-form-item></a-col>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称" hasFeedback>
              <a-input placeholder="请输入项目名称" v-decorator="['xmmc', validatorRules.xmmc]" />
            </a-form-item></a-col>
          </a-row>
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型" hasFeedback>
              <j-dict-select-tag placeholder="请选择客户类型" :triggerChange="true" v-decorator="['khlx', validatorRules.khlx]" dict-code="khlx" />
            </a-form-item></a-col>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序序号" hasFeedback>
              <a-input-number placeholder="请输入排序序号" v-decorator="['pxxh', validatorRules.pxxh]" :min="0" :max="100" style="width: 235px;"/>
            </a-form-item></a-col>
          </a-row>
          <a-row style="margin-top: -20px;"><a-col :span="24" :pull="2">
            <a-form-item :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" label="备注">
              <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" :row="2"/>
            </a-form-item>
          </a-col></a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ACol from "ant-design-vue/es/grid/Col";
  import ARow from "ant-design-vue/es/grid/Row";

  export default {
    components: {
      ARow,
      ACol},
    name: "PjsxPjxmszModal",
    data () {
      return {
        title:"操作",
        visible: false,
        visibleCheck: true,
        confirmLoading: false,
        model: {},
        sfqy: 1,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
          xmbh:{rules: [{ required: true, message: '请输入项目编号!' }]},
          xmmc:{rules: [{ required: true, message: '请输入项目名称!' }]},
          khlx:{rules: [{ required: true, message: '请选择客户类型!' }]},
          pxxh:{rules: [{ required: true, message: '请输入备注!' }]},
        },
        url: {
          add: "/khpjsx.pjxmsz/pjsxPjxmsz/add",
          edit: "/khpjsx.pjxmsz/pjsxPjxmsz/edit",
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
        if (record.xmbh){
          this.visibleCheck = (record.sfqy == 1) ? true : false;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.model.sfqy = this.sfqy;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'qydm','xmbh','xmmc','pxxh','khlx','sfqy','bz','lrbz'))
        });
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.xmbh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log(formData)
            formData.sfqy = this.sfqy;
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