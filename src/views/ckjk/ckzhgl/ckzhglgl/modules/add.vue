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
          <a-input disabled="disabled" placeholder="请输入组织标识" v-decorator="['zzbz_dictText',{}]" />
          <!--          <j-dict-select-tag  v-decorator="['zzbz', validatorRules.zzbz]" :triggerChange="true" placeholder="请输入组织标识"-->
<!--                              disabled="disabled" dict="hr_bas_organization,zzjc,zzbz"/>-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标识">
<!--          <a-input disabled="disabled" placeholder="请输入岗位标识" v-decorator="['zzbz_dictText', validatorRules.gwbz]" />-->
          <j-dict-select-tag  v-decorator="['gwbz', validatorRules.gwbz]" :triggerChange="true" placeholder="请输入岗位标识"
                              disabled="disabled"   dictCode="Hr_bas_post,gwmc,gwbz"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input disabled="disabled" placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh]" />
          <a-button @click="FindBack" type="primary" icon="plus">查找带回</a-button>
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
          <a-input placeholder="请输入存款账号" @blur="judgeCkzh" v-decorator="['ckzh', validatorRules.ckzh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号名称">
          <a-input placeholder="请输入账户名称" v-decorator="['zhmc', {}]" />
        </a-form-item>
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="账号性质">-->
        <!--          <a-input placeholder="请输入账号性质" v-decorator="['zhxz', {}]" />-->
        <!--        </a-form-item>-->
        <a-form-item :labelCol="labelCol"
                     :wrapperCol="wrapperCol" label="账号性质">
          <a-select placeholder="全部" v-decorator="['zhxz', {}]">
            <a-select-option value="null">
              请选择
            </a-select-option>
            <a-select-option value="1">
              对私活期
            </a-select-option>
            <a-select-option value="2">
              对公活期
            </a-select-option>
            <a-select-option value="3">
              定期
            </a-select-option>
            <a-select-option value="4">
              一本通
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联比率%">
          <a-input-number :min="0" :max="100" v-decorator="['glbl',validatorRules.glbl]"  style="width: 100%"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hidden="true"
          label="id">
          <a-input v-decorator="['glid',{}]" />
        </a-form-item>
      </a-form>
    </a-spin>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
import { httpAction,getAction } from '@/api/manage'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import AccountInfo from './AccountInfo'
import pick from 'lodash.pick'

export default {
  name: 'CkjkptCkzhglxxModal',
  components: {
    JTreeSelect, AccountInfo
  },
  data () {
    return {
      title: '操作',
      visible: false,
      model: {},
      queryParam: { },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      ckzhflag:false,
      form: this.$form.createForm(this),
      validatorRules: {
        glbl: { rules: [{ required: true, message: '请选择关联比率!' }] },
        ckzh: { rules: [{ required: true, message: '请输入存款账号!' }] },
        yggh: { rules: [{ required: true, message: '请输入员工工号!' }] },
        zzbz: { rules: [{ required: true, message: '请选择组织标识!' }] },
        gwbz: { rules: [{ required: true, message: '请选择岗位标志!' }] }

      },
      url: {
        add: '/ckzhglgl/ckjkptCkzhglxx/add',
        judgeCkzh: '/ckzhglgl/ckjkptCkzhglxx/judgeCkzh'
      }
    }
  },
  created () {
  },
  methods: {
    judgeCkzh () {
        let ckzh=this.form.getFieldValue('ckzh');
        getAction(this.url.judgeCkzh, { ckzh:ckzh}).then((res)=>{
          if(!res.success){
            this.$message.warning("未找到对应的存款账号")
          }else {
            this.queryParam.zhmc=res.result.zhmc;
            this.queryParam.zhzt=res.result.zhzt;
            this.queryParam.ywjgdm=res.result.jgdm;
            this.queryParam.zhxz=res.result.zhxz;
            this.model = Object.assign({}, this.queryParam)
            this.$nextTick(() => {
              this.form.setFieldsValue(pick(this.model, 'zhxz','jgdm', 'zhmc', 'ckzh'))  // loadsh的pick方法
            })
            this.ckzhflag=true;
          }
        })
    },
    FindBack () {
      this.$refs.accountInfo.init()
    },
    add () {
      this.visible = true
    },
    close () {
      this.$emit('close')
      this.visible = false
      this.ckzhflag=false
      this.form.resetFields()
    },
    handleOk () {
      const that = this
      if (!this.ckzhflag){
       this.$message.error("未找到对应的存款账号");
        return
      }
      this.form.validateFields((err, values) => { // 触发表单验证
        if (err) { return }
        let formData = Object.assign(this.queryParam, values)
        console.log(formData)
        httpAction(this.url.add, formData, 'post').then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.$emit('ok')
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.confirmLoading = false
          that.close()
        })
      })
    },
    handleCancel () {
      this.close()
    },
    colseWindow (args) {
      this.queryParam.yggh_dictText = args.yggh_dictText
      this.queryParam.zzbz_dictText=args.zzbz_dictText
      this.queryParam.gwbz = args.gwbz
      this.queryParam.khjlbz = args.khjlbz
      this.queryParam.zzbz = args.zzbz
      this.queryParam.rglx = args.rglx
      this.queryParam.yggh = args.yggh
      this.queryParam.zzbz = args.zzbz
      this.queryParam.jgdm = args.ywjgdm
      this.queryParam.gyh =args.gyh;
      this.model = Object.assign({}, this.queryParam)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'yggh_dictText', 'yggh', 'gyh', 'khjlbz', 'zzbz', 'gwbz','zzbz_dictText'))  // loadsh的pick方法
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>