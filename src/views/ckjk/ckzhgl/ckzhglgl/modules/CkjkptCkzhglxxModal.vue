<template>
  <a-modal
    :title="title"
    :width="500"
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
          <j-tree-select
            v-decorator="['zzbz', validatorRules.zzbz ]"
            placeholder="请选择组织标识"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms,zzjc,zzbz"
            :sszh="true"
            disabled="disabled"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位名称">
          <j-dict-select-tag
            v-decorator="['gwbz',validatorRules.gwbz]"
            placeholder="请选择岗位名称"
            disabled="disabled"
            dictCode="Hr_bas_post,gwmc,gwbz"
            :triggerChange="true"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input disabled="disabled" placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input disabled="disabled" placeholder="请输入员工姓名" v-decorator="['yggh_dictText', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员号">
          <a-input disabled="disabled" placeholder="请输入柜员号" v-decorator="['gyh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理标识">
          <a-input disabled="disabled" placeholder="请输入客户经理标识" v-decorator="['khjlbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款账号">
          <a-input disabled="disabled" placeholder="请输入存款账号" v-decorator="['ckzh', validatorRules.ckzh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户名称">
          <a-input disabled="disabled" placeholder="请输入账户名称" v-decorator="['zhmc',{} ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号性质">
          <a-input disabled="disabled" placeholder="请输入账号性质" v-decorator="['zhxz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联比率(%)">
          <a-input-number placeholder="请输入关联比率" v-decorator="['glbl',validatorRules.glbl]" :min="0" :max="100" style="width: 100%"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hidden="true"
          label="id">
          <a-input  v-decorator="['glid',{}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'

  export default {
    name: "CkjkptCkzhglxxModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        tjyf:'',
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
        glbl:{rules: [{ required: true, message: '请输入关联比率!' }]},
        ckzh:{rules: [{ required: true, message: '请输入存款账号!' }]},
          yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
          zzbz:{rules: [{ required: true, message: '请选择组织标识!' }]},
          gwbz:{rules: [{ required: true, message: '请选择岗位标志!' }]},

        },
        url: {
          add: "/ckzhglgl/ckjkptCkzhglxx/add",
          edit: "/ckzhglgl/ckjkptCkzhglxx/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit: function (record,tjyf) {
        this.form.resetFields()
        record.tjyf=tjyf;
        //alert(record.tjyf)
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'tjyf', 'zzbz', 'gwbz', 'yggh', 'gyh', 'khjlbz','zhmc', 'ckzh', 'glbl', 'zhxz', 'yggh_dictText', 'glid'))
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
            if(!this.model.glid){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log('form表单', formData)
            httpAction(httpurl, formData, method).then((res)=>{
              if(res.success){
                that.$message.success(res.message)
                that.$emit('ok')
              }else{
                that.$message.warning(res.message)
              }
            }).catch((error) => {
              that.$message.error("操作失败！", error)
            }).finally(() => {
              that.confirmLoading = false
              that.close()
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