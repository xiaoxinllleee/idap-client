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

        <a-form-item :labelCol="labelCol"
                     :wrapperCol="wrapperCol" label="员工工号" v-show="isEdit">
          <a-input-search  v-decorator="['ygghzs', {}]"
                           placeholder="选择员工"
                           readOnly
                           @search="handleAddUserDepart" >
            <a-button slot="enterButton" icon="search"></a-button>
          </a-input-search>
        </a-form-item>

        <a-form-item v-show="!isEdit"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input
                   v-decorator="['yggh', {}]" disabled/>
        </a-form-item>

        <a-form-item v-show="!isEdit"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input
                   v-decorator="['yggh_dictText', {}]" disabled/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核系数">
          <a-input-number placeholder="请输入考核系数" @blur="calcZxs" :min="0" :precision="2" :step="0.1" style="width: 100%"
                   v-decorator="['khxs', {rules: [],initialValue:1}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不参与考核系数">
          <a-input-number placeholder="请输入不参与考核系数" @blur="calcZxs" :min="0" :precision="2" :step="0.1" style="width: 100%"
                   v-decorator="['bcykhxs', {rules: [],initialValue: 0}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总系数">
          <a-input placeholder="请输入总系数" v-decorator="['zxs', {initialValue:1}]" disabled/>
        </a-form-item>
        <!--<a-form-item-->
          <!--:labelCol="labelCol"-->
          <!--:wrapperCol="wrapperCol"-->
          <!--label="有效开始时间">-->
          <!--<a-date-picker placeholder="请选择有效开始时间"  v-decorator="['kssj', {rules:[{required:true,message:'请选择开始时间'}]}]"  />-->
        <!--</a-form-item>-->
        <!--<a-form-item-->
          <!--:labelCol="labelCol"-->
          <!--:wrapperCol="wrapperCol"-->
          <!--label="有效结束时间">-->
          <!--<a-date-picker placeholder="请选择有效结束时间"  v-decorator="['jssj', {rules:[{required:true,message:'请选择结束时间'}]}]"  />-->

        <!--</a-form-item>-->
		
      </a-form>
    </a-spin>
    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>

  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import SelectUserModal from './SelectUserModal'
  import XEUtils from 'xe-utils'

  export default {
    name: "ErpPersonalKhxsModal",
    components: {
      SelectUserModal
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
        url: {
          add: "/khxs/erpPersonalKhxs/add",
          edit: "/khxs/erpPersonalKhxs/edit",
        },
        isEdit:false
      }
    },
    created () {
    },
    methods: {
      calcZxs() {
        let khxs = this.form.getFieldValue('khxs')
        let bcykhxs = this.form.getFieldValue('bcykhxs')
        let data = [Number(khxs), Number(bcykhxs)]
        let zxs = XEUtils.sum(data)
        this.form.setFieldsValue({ zxs: zxs })

      },
      selectOK(data) {
        if (data.length > 0){
          let staffs = [];
          let ygxms = "";
          for(let j = 0; j < data.length; j++) {
              staffs.push(data[j].yggh);
              ygxms += " "+data[j].yggh+" "+data[j].ygxm+" ,"
          }
          this.model.staffs = staffs;
          this.form.setFieldsValue({ ygghzs: ygxms })
        }
      },
      handleAddUserDepart() {
        this.$refs.selectUserModal.visible = true;
      },
      add () {
        this.isEdit = true;
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.model.staffs = [];
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'yggh','khxs','bcykhxs','zxs','yggh_dictText'))
		  //时间格式化
      //     this.form.setFieldsValue({kssj:this.model.kssj?moment(this.model.kssj):null})
      //     this.form.setFieldsValue({jssj:this.model.jssj?moment(this.model.jssj):null})
        });

      },
      close () {
        this.isEdit = false;
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        if (this.isEdit){
          if ( this.model.staffs.length < 1){
            this.$message.warning("至少选择一位员工");
            return
          }
        }

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
            // formData.kssj = formData.kssj?formData.kssj.format():null;
            // formData.jssj = formData.jssj?formData.jssj.format():null;
            
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