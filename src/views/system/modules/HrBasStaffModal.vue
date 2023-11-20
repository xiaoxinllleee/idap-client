<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="员工工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'yggh', validatorRules.yggh]" placeholder="请输入员工工号"></a-input>
        </a-form-item>
          
        <a-form-item label="员工姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ygxm', validatorRules.ygxm]" placeholder="请输入员工姓名"></a-input>
        </a-form-item>
          
        <a-form-item label="员工类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'yglx', validatorRules.yglx]" placeholder="请输入员工类型" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="员工状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ygzt', validatorRules.ygzt]" placeholder="请输入员工状态" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xb', validatorRules.xb]" placeholder="请输入性别" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'sfzh', validatorRules.sfzh]" placeholder="请输入身份证号"></a-input>
        </a-form-item>
          
        <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'sjhm', validatorRules.sjhm]" placeholder="请输入手机号码"></a-input>
        </a-form-item>
          
        <a-form-item label="工资卡号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'gzkh', validatorRules.gzkh]" placeholder="请输入工资卡号"></a-input>
        </a-form-item>
          
        <a-form-item label="入职日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择入职日期" v-decorator="[ 'rzrq', validatorRules.rzrq]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="转正日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择转正日期" v-decorator="[ 'zzrq', validatorRules.zzrq]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="离职日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择离职日期" v-decorator="[ 'lzrq', validatorRules.lzrq]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="删除标志" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'scbz', validatorRules.scbz]" placeholder="请输入删除标志" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="删除时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择删除时间" v-decorator="[ 'scsj', validatorRules.scsj]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
          
        <a-form-item label="删除操作员" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'scczy', validatorRules.scczy]" placeholder="请输入删除操作员"></a-input>
        </a-form-item>
          
        <a-form-item label="柜员号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'gyh', validatorRules.gyh]" placeholder="请输入柜员号"></a-input>
        </a-form-item>
          
        <a-form-item label="客户经理编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'khjlbh', validatorRules.khjlbh]" placeholder="请输入客户经理编号"></a-input>
        </a-form-item>
          
        
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JDate from '@/components/jeecg/JDate'  
  
  export default {
    name: "HrBasStaffModal",
    components: { 
      JDate,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
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
        validatorRules:{
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        ygxm:{},
        yglx:{},
        ygzt:{},
        xb:{},
        sfzh:{},
        sjhm:{},
        gzkh:{},
        rzrq:{},
        zzrq:{},
        lzrq:{},
        scbz:{},
        scsj:{},
        scczy:{},
        gyh:{},
        khjlbh:{},
        },
        url: {
          add: "/hr.ygxxgl/hrBasStaff/add",
          edit: "/hr.ygxxgl/hrBasStaff/edit",
        }
     
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
          this.form.setFieldsValue(pick(this.model,'yggh','ygxm','yglx','ygzt','xb','sfzh','sjhm','gzkh','rzrq','zzrq','lzrq','scbz','scsj','scczy','gyh','khjlbh'))
        })
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
            console.log("表单提交数据",formData)
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
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'yggh','ygxm','yglx','ygzt','xb','sfzh','sjhm','gzkh','rzrq','zzrq','lzrq','scbz','scsj','scczy','gyh','khjlbh'))
      }
      
    }
  }
</script>