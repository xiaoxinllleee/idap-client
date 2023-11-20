<template>
  <a-modal
    :title="title"
    :width="1500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="定价得分">
              <a-input placeholder="请输入定价得分" v-decorator="['djdf', validatorRules.djdf]" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款期限">
<!--              <a-input placeholder="请输入贷款期限" v-decorator="['dkqx', {}]" />-->
              <j-dict-select-tag placeholder="请选择贷款期限" v-decorator="['dkqx', validatorRules.dkqx]" :triggerChange="true" dict-code="dkqxly" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款授信金额（起）">
              <a-input placeholder="请输入贷款授信金额（起）" v-decorator="['dksxjeBegin', validatorRules.dksxjeBegin]" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款授信金额（止）">
              <a-input placeholder="请输入贷款授信金额（止）" v-decorator="['dksxjeEnd', validatorRules.dksxjeEnd]" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="对应浮动幅度">
              <a-input-number placeholder="请输入对应浮动幅度" v-decorator="['dyfdfd', {}]" :min="0" :max="99.99" style="width: 100%;"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="按LPR加基点（BP）">
              <a-input-number placeholder="请输入按LPR加基点（BP）" v-decorator="['dyjdbp', {}]" :min="0" :max="999.99" style="width: 100%;"></a-input-number>
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
    name: "FdcsdzbModal",
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
          djdf: {rules: [{required: true, message: '请输入定价得分!'}]},
          dkqx: {rules: [{required: true, message: '请选择贷款期限!'}]},
          dksxjeBegin: {rules: [{required: true, message: '请输入贷款授信金额（起）!'}]},
          dksxjeEnd: {rules: [{required: true, message: '请输入贷款授信金额（止）!'}]},
        },
        url: {
          add: "/fdcsdzb/fdcsdzb/add",
          edit: "/fdcsdzb/fdcsdzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'djdf','dkqx','dksxjeBegin','dksxjeEnd','dyfdfd','dyjdbp'))
		  //时间格式化
          //this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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