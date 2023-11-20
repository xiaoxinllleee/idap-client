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
          label="组织标识">
          <a-input placeholder="请输入组织标识" v-decorator="['zzbz', validatorRules.zzbz ]" />
        </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="组织名称">
            <j-tree-select
              v-decorator="['zzbz',{}]"
              placeholder="请选择组织名称"
              treeNodeFilterProp="title"
              dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
              :sszh="true"
              pid-field="sjywjgdm"
              :showSearch="true"
              :treeDefaultExpandAll=true
            />
          </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量年份">
          <a-select placeholder="请选择存量年份" v-decorator="[ 'clnf', validatorRules.clnf ]" :defaultValue="dateValue" @change="selectValue">
            <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
          <!--<a-date-picker v-decorator="[ 'clnf', validatorRules.clnf ]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量日期">
          <a-date-picker v-decorator="[ 'clrq', validatorRules.clrq ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良余额">
          <a-input placeholder="请输入不良余额" v-decorator="['blye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月贷款日平余额">
          <a-input placeholder="请输入月贷款日平余额" v-decorator="['mdkrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季贷款日平余额">
          <a-input placeholder="请输入季贷款日平余额" v-decorator="['qdkrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年贷款日平余额">
          <a-input placeholder="请输入年贷款日平余额" v-decorator="['ydkrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label=" 户数">
          <a-input placeholder="请输入户数" v-decorator="['hs', {}]" />
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入人">
          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
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
          label="录入标志">
          <a-input placeholder="请输入录入标志" v-decorator="['lrbz', {}]" />
        </a-form-item>-->

		
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
    name: "DkclglModal",
    components:{
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        dateValue: '',
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
        clrq:{rules: [{ required: true, message: '请输入存量日期!' }]},
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        clnf:{rules: [{ required: true, message: '请输入存量年份!' }]},
        },
        url: {
          add: "/dkclgl/dkclgl/add",
          edit: "/dkclgl/dkclgl/edit",
        },
      }
    },
    created () {
      this.dqnf();
    },
    methods: {
      // 获取当前年份
      dqnf(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      // 下拉选择Func
      selectValue(value){
        console.log('DkclglModalList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },


      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'blye','qdkrpye','ydkrpye','lrr','lrbz','hs','zzbz','yggh','dkye','mdkrpye'))
		  //时间格式化
          this.form.setFieldsValue({clrq:this.model.clrq?moment(this.model.clrq):null})
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({clnf:this.model.clnf?moment(this.model.clnf):null})
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
            if(!this.model.zzbz && !this.model.yggh && !this.model.clnf){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.clrq = formData.clrq?formData.clrq.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.clnf = formData.clnf?formData.clnf.format():null;
            
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