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
          <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['schemeId', validatorRules.schemeId]" :trigger-change="true"
                             dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type!=3" showSearch/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标识">
          <j-tree-select
            v-decorator="['zzbz',validatorRules.zzbz]"
            placeholder="请选择组织标识"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, zzbz"
            :sszh="true"
            pid-field="sjzzbz"
            :showSearch="true"
            :treeDefaultExpandAll=true
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标ID">
          <a-input-search placeholder="请输入指标id" v-decorator="['zbid', validatorRules.zbid ]" readOnly @search="FindBack(1)">
            <a-button slot="enterButton">选择指标</a-button>
          </a-input-search>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标名称">
          <j-dict-select-tag placeholder="请输入指标名称" v-decorator="['zbid', {}]" :trigger-change="true" dict-code="ERP_BAS_ZBK,zbmc,zbid"  disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核维度">
          <j-dict-select-tag placeholder="请输入考核维度" v-decorator="['khwd', validatorRules.khwd ]" :trigger-change="true" dict-code="zbwd" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核方式">
          <j-dict-select-tag placeholder="请输入考核方式" v-decorator="['khfs', validatorRules.khfs ]" :trigger-change="true" dict-code="khfs" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核月份">
          <a-month-picker v-decorator="[ 'khsj', validatorRules.khsj ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标任务">
          <a-input placeholder="请输入指标任务" v-decorator="['zbrw', validatorRules.zbrw]" />
        </a-form-item>

      </a-form>
    </a-spin>

    <account-add-zbid ref="accountZbid" @close="colseZbid"></account-add-zbid>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import AccountAddZbid from '@/views/pams/sjbl/zbsjtz/modules/AccountAddZbid'

  export default {
    name: "ErpAssessTasksetJgModal",
    components:{
      JTreeSelect, AccountAddZbid
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
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
          schemeId:{rules: [{ required: true, message: '请选择考核项目!' }]},
          zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
          zbid:{rules: [{ required: true, message: '请输入指标ID!' }]},
          khwd:{rules: [{ required: true, message: '请输入考核维度!' }]},
          khsj:{rules: [{ required: true, message: '请选择考核月份!' }]},
          khfs:{rules: [{ required: true, message: '请输入考核方式!' }]},
          zbrw:{rules: [{ required: true, message: '请输入指标任务!' }]},
        },
        url: {
          add: "/farwsz/erpAssessTaskset/add",
          edit: "/farwsz/erpAssessTaskset/edit",
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
          this.form.setFieldsValue(pick(this.model,'schemeId','zzbz','zbid','zbid_dictText','khwd','khfs','zbrw'))
		  //时间格式化
          this.form.setFieldsValue({khsj:this.model.khsj?moment(this.model.khsj):null})
        });

      },
      FindBack(num){
        this.$refs.accountZbid.init(num)
      },
      colseZbid(args){
        console.log('colseZbid', args)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(args, 'zbid','khfs'))  // loadsh的pick方法
          this.form.setFieldsValue({khwd: args.zbwd})
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
            //时间格式化
            formData.khsj = formData.khsj?moment(formData.khsj).format("YYYY-MM")+"-01":null;

            console.log('formData',formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
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