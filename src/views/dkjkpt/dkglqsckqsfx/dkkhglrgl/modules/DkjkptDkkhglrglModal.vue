<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="借款人证件号码:">
              <a-input placeholder="请输入借款人证件号码" v-decorator="['jkrzjhm', validatorRules.jkrzjhm ]" />            </a-form-item>
          </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="借款人名称:">
              <a-input placeholder="请输入借款人名称" v-decorator="['jkrmc', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联人证件类型：">
          <j-dict-select-tag :triggerChange="true" placeholder="请选择关联人证件类型" v-decorator="['glrzjlx', {}]" dictCode="dkjkpt_zjlx"  />
        </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联人证件号码：">
          <a-input placeholder="请输入关联人证件号码" v-decorator="['glrzjhm', validatorRules.glrzjhm ]" />
        </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联人姓名：">
          <a-input placeholder="请输入关联人姓名" v-decorator="['glrxm', {}]" />
        </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联关系:">
          <j-dict-select-tag :triggerChange="true" placeholder="请输入关联关系" v-decorator="['glgx', {}]"  dictCode="dkjkpt_glgx" />
        </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联人工作单位:">
          <a-input placeholder="请输入关联人工作单位" v-decorator="['glrgzdw', {}]" />
        </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联人联系电话:">
          <a-input placeholder="请输入关联人联系电话" v-decorator="['glrlxdh', {}]" />
        </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联人存款余额:">
          <a-input placeholder="请输入关联人存款余额" v-decorator="['glrckye', {}]" />
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
  import JDictSelectTag from '@/components/dict/JDictSelectTag'

  export default {
    components: {JDictSelectTag},
    name: "DkjkptDkkhglrglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        jkrzjhm:{rules: [{ required: true, message: '请输入借款人证件号码!' }]},
        glrzjhm:{rules: [{ required: true, message: '请输入关联人证件号码!' }]},
        },
        url: {
          add: "/dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/add",
          edit: "/dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'jkrzjhm','jkrmc','glrzjlx','glrzjhm','glrxm','glgx','glrgzdw','glrlxdh','lrr','lrbz','glrckye'))
		  //时间格式化
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            /*alert(this.model.jkrzjhm)*/
            if(!this.model.jkrzjhm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
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