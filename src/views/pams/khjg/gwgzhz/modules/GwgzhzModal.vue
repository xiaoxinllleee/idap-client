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
          label="gzrq">
          <a-date-picker v-decorator="[ 'gzrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="schemeId">
          <a-input placeholder="请输入schemeId" v-decorator="['schemeId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zzbz">
          <a-input placeholder="请输入zzbz" v-decorator="['zzbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="gwbz">
          <a-input placeholder="请输入gwbz" v-decorator="['gwbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yggh">
          <a-input placeholder="请输入yggh" v-decorator="['yggh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ckgz">
          <a-input placeholder="请输入ckgz" v-decorator="['ckgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dkgz">
          <a-input placeholder="请输入dkgz" v-decorator="['dkgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dzyhgz">
          <a-input placeholder="请输入dzyhgz" v-decorator="['dzyhgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ywlgz">
          <a-input placeholder="请输入ywlgz" v-decorator="['ywlgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="gljxgz">
          <a-input placeholder="请输入gljxgz" v-decorator="['gljxgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dqbcgz">
          <a-input placeholder="请输入dqbcgz" v-decorator="['dqbcgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="jymbgz">
          <a-input placeholder="请输入jymbgz" v-decorator="['jymbgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yqdfgz">
          <a-input placeholder="请输入yqdfgz" v-decorator="['yqdfgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="qtgz">
          <a-input placeholder="请输入qtgz" v-decorator="['qtgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="jbgz">
          <a-input placeholder="请输入jbgz" v-decorator="['jbgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bwgz">
          <a-input placeholder="请输入bwgz" v-decorator="['bwgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zxkhgz">
          <a-input placeholder="请输入zxkhgz" v-decorator="['zxkhgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="nzkhgz">
          <a-input placeholder="请输入nzkhgz" v-decorator="['nzkhgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="gzhj">
          <a-input placeholder="请输入gzhj" v-decorator="['gzhj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zhgzpm">
          <a-input placeholder="请输入zhgzpm" v-decorator="['zhgzpm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="qhgzpm">
          <a-input placeholder="请输入qhgzpm" v-decorator="['qhgzpm', {}]" />
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
    name: "GwgzhzModal",
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
        },
        url: {
          add: "/gwgzhz/gwgzhz/add",
          edit: "/gwgzhz/gwgzhz/edit",
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
          this.form.setFieldsValue(pick(this.model,'schemeId','zzbz','gwbz','yggh','ckgz','dkgz','dzyhgz','ywlgz','gljxgz','dqbcgz','jymbgz','yqdfgz','qtgz','jbgz','bwgz','zxkhgz','nzkhgz','gzhj','zhgzpm','qhgzpm'))
		  //时间格式化
          this.form.setFieldsValue({gzrq:this.model.gzrq?moment(this.model.gzrq):null})
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
            formData.gzrq = formData.gzrq?formData.gzrq.format():null;
            
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