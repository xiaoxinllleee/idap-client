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
          label="评定周期">
          <j-dict-select-tag placeholder="请选择评定周期" v-decorator="['pdzq', validatorRules.pdzq]" :triggerChange="true" dictCode="rqwd" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评定日期">
          <a-date-picker v-decorator="[ 'pdrq', validatorRules.pdrq ]" style="width: 100%" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标识">
          <a-input placeholder="请输入组织标识" v-decorator="['zzbz', {} ]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织名称">
          <a-input placeholder="请输入组织标识" v-decorator="['zzbz_dictText', {} ]" :disabled="true" />
          <!--<j-tree-select
            v-decorator="['zzbz',validatorRules.zzbz]"
            placeholder="请选择组织名称"
            treeNodeFilterProp="title"
            dict="Hr_bas_organization, zzjc, zzbz"
            :sszh="true"
            pid-field="sjzzbz"
            :showSearch="true"
            :treeDefaultExpandAll=true
            :disabled="true"
          />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标识">
          <a-input placeholder="请输入岗位标识" v-decorator="['zzbz', {} ]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位名称">
          <j-dict-select-tag
            v-decorator="['gwbz',validatorRules.gwbz]"
            placeholder="请选择岗位名称"
            dictCode="Hr_bas_post,gwmc,gwbz"
            :triggerChange="true"
            :disabled="true"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input placeholder="请输入员工姓名" v-decorator="['yggh_dictText', validatorRules.yggh ]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评级得分">
          <a-input placeholder="请输入评级得分" v-decorator="['pjdf', {}]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属等级">
          <j-dict-select-tag placeholder="请选择所属等级" v-decorator="['ssdj', {}]" :triggerChange="true" dictCode="eweb:GRADE_CUST_CSSZ,CSMC,CSBH"/>
        </a-form-item>


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEditableTable from '@comp/jeecg/JEditableTable'

  export default {
    name: "KhjldjpdModal",
    components: {
      JTreeSelect,JEditableTable
    },
    data () {
      return {
        title:"操作",
        visible: false,
        flag: false,
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
        pdzq:{rules: [{ required: true, message: '请输入pdzq!' }]},
        pdrq:{rules: [{ required: true, message: '请输入pdrq!' }]},
        zzbz:{rules: [{ required: true, message: '请输入zzbz!' }]},
        gwbz:{rules: [{ required: true, message: '请输入gwbz!' }]},
        yggh:{rules: [{ required: true, message: '请输入yggh!' }]},
        },
        url: {
          add: "/khjldjpd/khjldjpd/add",
          edit: "/khjldjpd/khjldjpd/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.flag= true
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'pdzq','zzbz','gwbz','yggh','pjdf','ssdj','yggh_dictText','zzbz_dictText'))
		  //时间格式化
          this.form.setFieldsValue({pdrq:this.model.pdrq?moment(this.model.pdrq):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.flag = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(this.flag){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.pdrq = formData.pdrq?formData.pdrq.format():null;

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