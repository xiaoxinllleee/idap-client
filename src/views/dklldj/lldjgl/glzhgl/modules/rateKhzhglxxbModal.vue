<template>
  <a-modal title="关联账号信息"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="保存"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-input hidden placeholder="组织标识" v-model="zzbz"/>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="khmc" disabled/>
              <a-button @click="handleAddUserDepart" type="primary" icon="plus" size="small">查找带回</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="zjhm" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="{xs: {span: 24},sm: {span: 9}}" :wrapperCol="{xs: {span: 24},sm: {span: 12}}" label="关联存款账号/卡号">
              <a-input placeholder="请输入关联存款账号/卡号" v-decorator="['ckzh', validatorRules.ckzh]" @blur="handleCkzhChange"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{xs: {span: 24},sm: {span: 7}}" :wrapperCol="{xs: {span: 24},sm: {span: 14}}" label="关联账号关系">
              <j-dict-select-tag placeholder="请选择关联人类型" v-decorator="['zhgx', validatorRules.zhgx]" :triggerChange="true" dict-code="zhgx"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="账号名称">
              <a-input placeholder="请输入账号名称" v-decorator="['zhmc', validatorRules.zhmc]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{xs: {span: 24},sm: {span: 8}}" :wrapperCol="{xs: {span: 24},sm: {span: 13}}" label="关联账号详细关系">
              <a-textarea placeholder="请填写具体称谓，如配偶，儿子等..." v-decorator="['glzhxxgx', {}]"
                          :autosize="{ minRows: 2, maxRows: 4 }" :maxlength="100"/>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>

    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>

  </a-modal>
</template>

<script>
  import {getAction, httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import SelectUserModal from './SelectUserModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {notification} from "ant-design-vue";

  export default {
    name: "rateKhzhglxxbModal",
    components: {
      SelectUserModal,
      JTreeSelect
    },
    data() {
      return {
        title: "关联账号信息",
        visible: false,
        model: {},
        zzbz: "",
        zjhm: "",
        khmc: "",
        ckFlag: "",
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          zzbz: {rules: [{required: true, message: '请选择所属组织!'}]},
          khmc: {rules: [{required: true, message: '客户名称不能为空!'}]},
          zjhm: {rules: [{required: true, message: '请输入证件号码!'}]},
          ckzh: {rules: [{required: true, message: '请输入关联存款账号/卡号!'}]},
          zhmc: {rules: [{required: true, message: '请输入账号名称!'}]},
          zhgx: {rules: [{required: true, message: '请选择关联账号关系!'}]},
        },
        url: {
          add: "/rateKhzhglxxb/rateKhzhglxxb/add",
          edit: "/rateKhzhglxxb/rateKhzhglxxb/edit",
        },
        operationFlag: 'add',
      }
    },
    created() {
    },
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.zjhm = record.zjhm
        this.khmc = record.khmc
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'zzbz', 'zjhm', 'khmc', 'ckzh', 'zhmc', 'zhgx', 'scbz', 'lrczy', 'lrbz', 'glzhxxgx', 'dyzkh'))
          //时间格式化
          this.form.setFieldsValue({lrsj: this.model.lrsj ? moment(this.model.lrsj) : null})
        });
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            let httpurl = '';
            let method = '';
            if (this.operationFlag == 'add') {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            console.info('httpurl',httpurl)
            console.info('method',method)
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.zjhm = this.zjhm;
            formData.khmc = this.khmc;
            console.log(formData)
            if (formData.khmc === undefined || formData.khmc === "") {
              notification.warning({ message: '系统提示', description: '客户名称不能为空！',duration: 4})
              return false
            }
            if (formData.zjhm === undefined || formData.zjhm === "") {
              notification.warning({ message: '系统提示', description: '证件号码不能为空！',duration: 4})
              return false
            }
            if (formData.ckzh == null && formData.ckzh == undefined && formData.ckzh == '') {
              notification.warning({ message: '系统提示', description: '关联存款账号/卡号不能为空！',duration: 4})
              return false
            }
            if (formData.zhmc === undefined || formData.zhmc === "") {
              notification.warning({ message: '系统提示', description: '关联账号名称不能为空，可能是账号错误，请核实！',duration: 4})
              return false
            }
            if (formData.zhgx === undefined || formData.zhgx === "") {
              notification.warning({ message: '系统提示', description: '请选择关联账号关系！',duration: 4})
              return false
            }
            that.confirmLoading = true
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                that.close()
              } else {
                notification.warning({ message: '系统提示', description: res.message, duration: 4})
              }
            }).catch((error) => {
              notification.error({ message: '系统提示', description: error, duration: 4})
            }).finally(() => {
              that.confirmLoading = false
            })
          }
        })
      },
      handleCancel() {
        this.close()
      },
      handleAddUserDepart() {
        this.$refs.selectUserModal.onClearSelected();
        this.$refs.selectUserModal.visible = true;
      },
      selectOK: function (data) {
        console.info('selectOK-data:',data)
        this.zzbz = data[0].zzbz
        this.zjhm = data[0].zjhm
        this.khmc = data[0].khmc
        console.info('查找带回的关联客户信息:',this.zzbz,this.khmc,this.zjhm)
      },
      handleCkzhChange: function (e) {
        const ckzh = e.target.value
        console.info('关联存款账号/卡号:',ckzh)
        if (!ckzh) {
          notification.warning({ message: '系统提示', description: '请输入关联存款账号/卡号！',duration: 4})
        } else {
          this.confirmLoading = true
          getAction('/rateKhzhglxxb/rateKhzhglxxb/queryCustName', {'ckzh': ckzh}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue({
                zhmc: res.message
              })
            } else {
              notification.warning({ message: '系统提示', description: res.message, duration: 4})
            }
          }).catch((error) => {
            notification.error({ message: '系统提示', description: '查找失败:'+error, duration: 4})
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>