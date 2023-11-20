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
          label="机构名称">
          <j-tree-select
            v-decorator="['zzbz',validatorRules.zzbz]"
            placeholder="请选择机构名称"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, zzbz"
            :sszh="true"
            pid-field="sjzzbz"
            :showSearch="true"
            :treeDefaultExpandAll=true
            :disabled="true"
          />
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
          <a-input placeholder="请输入员工姓名" v-decorator="['ygxm', {}]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标ID">
          <a-input placeholder="请输入指标ID" v-decorator="['zbid', validatorRules.zbid ]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标名称">
          <a-input placeholder="请输入指标名称" v-decorator="['zbmc', {}]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标结果">
          <a-input placeholder="请输入指标结果" v-decorator="['zbjg', {}]" />
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

  export default {
    name: "ZbsjglModal",
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
        pdzq:{rules: [{ required: true, message: '请输入评定周期!' }]},
        pdrq:{rules: [{ required: true, message: '请输入评定日期!' }]},
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        gwbz:{rules: [{ required: true, message: '请输入岗位标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        zbid:{rules: [{ required: true, message: '请输入指标ID!' }]},
        },
        url: {
          add: "/zbsjgl/zbsjgl/add",
          edit: "/zbsjgl/zbsjgl/edit",
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
        console.log(record)
        if (record.sjly==0){
          this.$message.error("该数据项为系统取数，不允许人工修改！")
          return
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'khjlbz','ygxm','pdzq','zzbz','gwbz','yggh','zbid','zbmc','zbjg'))
		  //时间格式化
          this.form.setFieldsValue({pdrq:this.model.pdrq?moment(this.model.pdrq):null})
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
          /*this.form.setFieldsValue({xgsj:this.model.xgsj?moment(this.model.xgsj):null})*/
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

              httpurl+=this.url.edit;
               method = 'put';
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.pdrq = formData.pdrq?formData.pdrq.format():null;
           /* formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.xgsj = formData.xgsj?formData.xgsj.format():null;*/

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