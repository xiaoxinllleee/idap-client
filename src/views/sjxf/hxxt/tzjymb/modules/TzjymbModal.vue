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
          label="机构码">
          <a-input placeholder="请输入机构码" v-decorator="['instNo', validatorRules.instNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统码">
          <a-input placeholder="请输入系统码" v-decorator="['system', validatorRules.system ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外部交易后两位">
          <a-input placeholder="请输入外部交易后两位" v-decorator="['origTran', validatorRules.origTran ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子标识">
          <a-input placeholder="请输入桶子标识" v-decorator="['prCode15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['normTrans15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正交易码">
          <a-input placeholder="请输入冲正交易码" v-decorator="['corrTrans15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不用">
          <a-input placeholder="请输入不用" v-decorator="['value15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['edate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载日期">
          <a-input placeholder="请输入加载日期" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
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
    name: "TzjymbModal",
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
        instNo:{rules: [{ required: true, message: '请输入机构码!' }]},
        system:{rules: [{ required: true, message: '请输入系统码!' }]},
        origTran:{rules: [{ required: true, message: '请输入外部交易后两位!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/tzjymb/tzjymb/add",
          edit: "/tzjymb/tzjymb/edit",
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
          this.form.setFieldsValue(pick(this.model,'instNo','system','origTran','prCode01','normTrans01','corrTrans01','value01','prCode02','normTrans02','corrTrans02','value02','prCode03','normTrans03','corrTrans03','value03','prCode04','normTrans04','corrTrans04','value04','prCode05','normTrans05','corrTrans05','value05','prCode06','normTrans06','corrTrans06','value06','prCode07','normTrans07','corrTrans07','value07','prCode08','normTrans08','corrTrans08','value08','prCode09','normTrans09','corrTrans09','value09','prCode10','normTrans10','corrTrans10','value10','prCode11','normTrans11','corrTrans11','value11','prCode12','normTrans12','corrTrans12','value12','prCode13','normTrans13','corrTrans13','value13','prCode14','normTrans14','corrTrans14','value14','prCode15','normTrans15','corrTrans15','value15','sdate','edate','loadDate','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
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
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
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