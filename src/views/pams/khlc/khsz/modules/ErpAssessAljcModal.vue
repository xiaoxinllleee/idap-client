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
          label="考核项目">
          <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['schemeId', {}]" v-if="this.model.gwbz"
                             dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type=3"
                             showSearch :triggerChange="true" disabled/>
          <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['schemeId', {}]" v-else
                             dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type!=3"
                             showSearch :triggerChange="true" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织名称">
          <a-input placeholder="请输入组织名称" v-decorator="['zzbz_dictText', {}]" disabled/>
          <a-input type="hidden" placeholder="请输入组织名称" v-decorator="['zzbz', {}]" disabled/>
          <!--<j-tree-select-->
            <!--v-decorator="['zzbz',{}]"-->
            <!--placeholder="请选择组织标识"-->
            <!--treeNodeFilterProp="title"-->
            <!--dict="v_hr_bas_organization_cmms, zzjc, zzbz"-->
            <!--:sszh="true"-->
            <!--pid-field="sjzzbz"-->
            <!--:showSearch="true"-->
            <!--:treeDefaultExpandAll=true-->
            <!--disabled-->
          <!--/>-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="this.model.gwbz"
          label="岗位名称">
          <j-dict-select-tag
            v-decorator="['gwbz',validatorRules.gwbz]"
            placeholder="请选择岗位名称"
            dictCode="Hr_bas_post,gwmc,gwbz"
            :triggerChange="true"
            disabled
          />
        </a-form-item>
       <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标识">
          <a-input placeholder="请输入岗位标识" v-decorator="['gwbz', {}]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标ID">
          <a-input placeholder="请输入指标ID" v-decorator="['zbid', {}]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标名称">
          <a-input placeholder="请输入指标名称" v-decorator="['zbid_dictText', {}]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标维度">
          <j-dict-select-tag  v-decorator="['zbwd', {}]" :triggerChange="true" placeholder="请选择指标维度" dictCode="zbwd" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标单价">
          <a-input placeholder="请输入指标单价" v-decorator="['zbdj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标单位">
          <a-input placeholder="请输入指标单位" v-decorator="['zbdw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标权重">
          <a-input placeholder="请输入指标权重" v-decorator="['zbqz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调节系数">
          <a-input placeholder="请输入调节系数" v-decorator="['tjxs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务外单价">
          <a-input placeholder="请输入任务外单价" v-decorator="['rwwdj', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "ErpAssessAljcModal",
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
        },
        url: {
          add: "/khfagl/erpAssessAljc/add",
          edit: "/khfagl/erpAssessAljc/edit",
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
          this.form.setFieldsValue(pick(this.model,'schemeId','zzbz','zzbz_dictText','gwbz','zbid','zbid_dictText','zbwd','zbdj','zbdw','zbqz','tjxs','rwwdj'))
		  //时间格式化
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