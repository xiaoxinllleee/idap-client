<template>
  <a-modal :title="title"
           :width="1400"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-card class="card" :bordered="true">
        <a-form :form="form">
          <a-row class="form-row" :gutter="16">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议类型">
              <j-dict-select-tag  size="small"  :triggerChange="true" v-decorator="['pylx', {}]" dictCode="bkbpy_pylx1" disabled />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="信用等级">
              <j-dict-select-tag  size="small"  :triggerChange="true" v-decorator="['cxd', {}]"  dictCode="bkbpy_xydj" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="授信额度">
              <a-input   size="small" placeholder="请输入建议授信额度"  v-decorator="['jysxed', {}]"  />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="评议员姓名">
              <a-input placeholder="请输入评议员姓名"   v-decorator="['pyyxm', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="评议员证件号">
              <a-input placeholder="请输入评议员证件号" v-decorator="['pyyzjhm', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="备注">
              <a-input placeholder="请输入备注"  v-decorator="['bz', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="评议时间">
              <a-date-picker placeholder="选择评议时间" v-decorator="['pysj', {}]" />
            </a-form-item></a-col>
          </a-row>
          <a-divider orientation="left" style="color: #1890FF; margin-top: -20px;">评议附件</a-divider>
          <a-card class="card" :bordered="false" style="margin: -20px 0px 0px 0px">
            <pyxx-photo-view :bizPath="bkbpyurl" ref="photoView"   />
          </a-card>
        </a-form>
      </a-card>
    </a-spin>

  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import  PyxxPhotoView from '../PyxxPhotoView.vue'

  import moment from 'moment'

  export default {
    name: 'PymxModal',
    components: { AFormItem ,PyxxPhotoView},
    data() {
      return {
        title: '操作',
        visible: false,
        disableSubmit: true,
        confirmLoading: false,
        bkbpyurl:'images/bkbpy/',
        form: this.$form.createForm(this),
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        url: {
          add: "/nh/pyxx/add",
          edit: "/nh/pyxx/edit",
        },
      }
    },
    created() {},
    methods: {

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'pylx','cxd','jysxed','pyyxm','pyyzjhm','bz','pysj'))
          /*this.form.setFieldsValue({pylx:'1'})*/
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
            //formData.lrsj = formData.lrsj==null?formData.lrsj.format():null;

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