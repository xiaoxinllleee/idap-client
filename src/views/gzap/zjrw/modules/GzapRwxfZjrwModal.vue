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
      <a-form :form="form" >

        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开始时间">
              <a-date-picker placeholder="请输入开始时间" style="width:100%" v-decorator="[ 'kssj', { rules: [{ required: true, message: '请输入开始时间!' }] }]"/>

            </a-form-item>
          </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="结束时间">
              <a-date-picker  placeholder="请输入结束时间" style="width:100%"  v-decorator="[ 'jssj', { rules: [{ required: true, message: '请输入结束时间!' }] }]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item label="重要级别"  :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag  v-decorator="[ 'zyjb', validatorRules.zyjb ]" :triggerChange="true" placeholder="请选择重要级别" dictCode="gzap_zyjb"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col  >
            <a-form-item label="任务名称" >
              <a-input v-decorator="[ 'rwmc', validatorRules.rwmc]" placeholder="请输入任务名称"></a-input>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="24">
          <a-col  >
            <a-form-item label="任务内容" >
              <a-input :rows="4"  v-decorator="[ 'nr', validatorRules.nr]"  placeholder="请输入任务内容"></a-input>
            </a-form-item>
          </a-col>

        </a-row>




      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JDate from '@/components/jeecg/JDate'
  import {initDictOptions, filterDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: "GzapRwxfZjrwModal",
    components: {
      JDate,JSelectDepart
    },
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
          zyjb: { rules: [{ required: true, message: '请选择重要级别!' }] },
          rwmc:{ rules: [{ required: true, message: '请输入任务名称!' }] },
          nr:{ rules: [{ required: true, message: '请输入任务内容!' }] },

        },
        url: {
          add: "/gzap/zjrw/gzapRwxfZjrw/add",
          edit: "/gzap/zjrw/gzapRwxfZjrw/edit",
        },
        zyjbList:[],
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
          this.form.setFieldsValue(pick(this.model,'rwmc','kssj','jssj','zyjb','nr','zt'))
        });
        let that = this;
      /*  that.initialZyjbList();*/

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
      initialZyjbList(){
        initDictOptions('gzap_zyjb').then((res) => {
          if (res.success) {
            console.log("@@@@@@@@@@@:"+res.result);
            console.log(res.result);
            this.zyjbList = res.result;
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>

</style>