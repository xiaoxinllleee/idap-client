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

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="员工工号">
              <a-input placeholder="员工姓名" v-decorator="['yggh', ]" disabled/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="员工姓名">
              <a-input placeholder="员工姓名" v-decorator="['yggh_dictText', ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="所属支行">
              <a-input placeholder="所属支行" v-decorator="['zzbz_dictText', ]" disabled/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="岗位名称">
              <a-input placeholder="岗位名称" v-decorator="['gwbz_dictText', ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="入岗日期">

              <a-date-picker placeholder="请选择月份"  v-decorator="['rgrq', {}]"  disabled/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="入岗类型">

              <a-input  v-decorator="['rglx_dictText', ]" disabled />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="是否参与考核">
              <a-input placeholder="请选择是否参与考核" v-decorator="['sfcykh_dictText',]" disabled />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="备注">

              <a-input  v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="离岗日期">

              <a-date-picker placeholder="请选择离岗日期"  v-decorator="['lgrq', validatorRules.lgrq]" />
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
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "HrBasStaffPostModal",
    components: {
     JTreeSelect
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
          zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
          yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
          lgrq:{rules: [{ required: true, message: '请选择离岗日期!' }]},
        },
        url: {
          add: "/ygrggl/hrBasStaffPost/add",
          edit: "/ygrggl/hrBasStaffPost/lgedit",
        },
      }
    },
    created () {
    },
    methods: {
      handleAddUserDepart() {
        this.$refs.selectUserModal.visible = true;
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sfltx','khjlbz','gyh','bz','scbz','scczy','sfcykh','zzbz','yggh','gwbz','rglx','yggh_dictText','gwbz_dictText','sfcykh_dictText','rglx_dictText','zzbz_dictText'))
		  //时间格式化
          this.form.setFieldsValue({scsj:this.model.scsj?moment(this.model.scsj):null})
          this.form.setFieldsValue({rgrq:this.model.rgrq?moment(this.model.rgrq):null})
          this.form.setFieldsValue({nrgrq:this.model.nrgrq?moment(this.model.nrgrq):null})
          this.form.setFieldsValue({lgrq:this.model.lgrq?moment(this.model.lgrq):null})
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
            formData.rgrq = formData.rgrq?formData.rgrq.format():null;
            formData.lgrq = formData.lgrq?formData.lgrq.format():null;
            
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