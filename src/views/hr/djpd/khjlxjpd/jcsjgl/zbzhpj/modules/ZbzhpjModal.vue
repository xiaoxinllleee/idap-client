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
          label="机构名称">
          <j-tree-select
            v-decorator="['zzbz',{}]"
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
          label="岗位标识">
          <j-dict-select-tag
            v-decorator="['gwbz',{}]"
            placeholder="全部"
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
          label="客户经理名称">
          <a-input placeholder="请输入客户经理名称" v-decorator="['ygxm', {}]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价年份">
          <a-date-picker v-decorator="[ 'pjnf', validatorRules.pjnf ]"  style="width: 100%" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优秀得票数">
          <a-input placeholder="请输入优秀得票数" v-decorator="['yxdps', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="良好得票数">
          <a-input placeholder="请输入良好得票数" v-decorator="['lhdps', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一般得票数">
          <a-input placeholder="请输入一般得票数" v-decorator="['ybdps', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="扣分">
          <a-input placeholder="请输入扣分" v-decorator="['kf', {}]" />
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入标识">
          <a-input placeholder="请输入录入标识" v-decorator="['lrbz', {}]" />
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
          label="录入人">
          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
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
    name: "ZbzhpjModal",
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
        gwbz:{rules: [{ required: true, message: '请输入岗位标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        pjnf:{rules: [{ required: true, message: '请输入评价年份!' }]},
        },
        url: {
          add: "/zbzhpj/zbzhpj/add",
          edit: "/zbzhpj/zbzhpj/edit",
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
          this.form.setFieldsValue(pick(this.model,'zzbz','gwbz','yggh','khjlbz','ygxm','yxdps','lhdps','ybdps','kf'))
		  //时间格式化
          this.form.setFieldsValue({pjnf:this.model.pjnf?moment(this.model.pjnf):null})
          //this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            if(!this.model.zzbz && !this.model.gwbz && !this.model.yggh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.pjnf = formData.pjnf?formData.pjnf.format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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