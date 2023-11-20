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
          label="交易码名称">
          <a-input placeholder="请输入交易码名称" v-decorator="['jymmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ywjgdm">
          <a-input placeholder="请输入ywjgdm" v-decorator="['ywjgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分配数据ID">
          <a-input placeholder="请输入分配数据ID" v-decorator="['fpid', validatorRules.fpid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标志">
          <a-input placeholder="请输入组织标志" v-decorator="['zzbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标志">
          <a-input placeholder="请输入岗位标志" v-decorator="['gwbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员号">
          <a-input placeholder="请输入柜员号" v-decorator="['gyh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入岗类型">
          <a-input placeholder="请输入入岗类型" v-decorator="['rglx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计日期">
          <a-date-picker v-decorator="[ 'tjrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['jym', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易笔数">
          <a-input placeholder="请输入交易笔数" v-decorator="['jybs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现金交易金额">
          <a-input placeholder="请输入现金交易金额" v-decorator="['xjjyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="折算后交易笔数">
          <a-input placeholder="请输入折算后交易笔数" v-decorator="['zshjybs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="0不需分配 1原始分配 2机构分配">
          <a-input placeholder="请输入0不需分配 1原始分配 2机构分配" v-decorator="['fpbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需分配交易笔数">
          <a-input placeholder="请输入需分配交易笔数" v-decorator="['xfpjybs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需分配现金交易金额">
          <a-input placeholder="请输入需分配现金交易金额" v-decorator="['xfpxjjyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际交易笔数">
          <a-input placeholder="请输入实际交易笔数" v-decorator="['sjjybs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际现金交易金额">
          <a-input placeholder="请输入实际现金交易金额" v-decorator="['sjxjjyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入时间">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="0不需要分配 1待分配 2已分配">
          <a-input placeholder="请输入0不需要分配 1待分配 2已分配" v-decorator="['fpzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分配时间">
          <a-date-picker v-decorator="[ 'fpsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分配操作员">
          <a-input placeholder="请输入分配操作员" v-decorator="['fpczy', {}]" />
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
    name: "YwlmxcxModal",
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
        fpid:{rules: [{ required: true, message: '请输入分配数据ID!' }]},
        },
        url: {
          add: "/ywlmxcx/ywlmxcx/add",
          edit: "/ywlmxcx/ywlmxcx/edit",
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
          this.form.setFieldsValue(pick(this.model,'jymmc','ywjgdm','fpid','zzbz','yggh','gwbz','gyh','rglx','jym','jybs','xjjyje','zshjybs','fpbz','xfpjybs','xfpxjjyje','sjjybs','sjxjjyje','fpzt','fpczy'))
		  //时间格式化
          this.form.setFieldsValue({tjrq:this.model.tjrq?moment(this.model.tjrq):null})
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({fpsj:this.model.fpsj?moment(this.model.fpsj):null})
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
            formData.tjrq = formData.tjrq?formData.tjrq.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.fpsj = formData.fpsj?formData.fpsj.format():null;
            
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