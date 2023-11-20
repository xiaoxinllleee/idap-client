<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1" animated="animated">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="book"/>合同信息
            </span>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
              <j-tree-select
                v-decorator="['jgdm',{}]"
                placeholder="请选择机构"
                treeNodeFilterProp="title"
                dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                :sszh="true"
                pid-field="sjywjgdm"
                :showSearch="true"
                :treeDefaultExpandAll=true
                :disabled="true"
              />
            </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款品种">
          <j-dict-select-tag placeholder="请输入贷款品种" v-decorator="['dkpz', {}]" dictCode="dkzl" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['hth', validatorRules.hth ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同金额">
          <a-input placeholder="请输入合同金额" v-decorator="['htje', {}]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同余额">
          <a-input placeholder="请输入合同余额" v-decorator="['htye', {}]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款责任人">
          <a-input placeholder="请输入贷款责任人" v-decorator="['dkzrr', {}]" :disabled="true"/>
        </a-form-item>

          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <a-icon type="book"/>流程审批
            </span>
            <!--<a-form-item label="处理方式" style="padding-left: 15px">
              <a-radio-group v-model="queryParam.clfs" @change="radioGroupOnChange">
                <a-radio :value="1">通过</a-radio>
                <a-radio :value="2">驳回</a-radio>
                <a-radio :value="3">转办</a-radio>
                <a-radio :value="4">废弃</a-radio>
              </a-radio-group>
            </a-form-item>-->
          </a-tab-pane>

          <a-tab-pane key="3">
            <span slot="tab">
              <a-icon type="book"/>流程信息
            </span>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DascspxxModal",
    components:{ JTreeSelect },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: true,
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
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        hth:{rules: [{ required: true, message: '请输入合同号!' }]},
        businessnumber:{rules: [{ required: true, message: '请输入业务编号!' }]},
        processid:{rules: [{ required: true, message: '请输入流程编号!' }]},
        },
        url: {
          add: "/dascspxx/dascspxx/add",
          edit: "/dascspxx/dascspxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','khmc','zjhm','dkpz','hth','htje','htye','dkzrr'))
		  //时间格式化
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
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
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