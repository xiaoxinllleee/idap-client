<template>
  <a-modal :title="title"
           :width="550"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :footer="null"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-card class="card" :bordered="false">
        <a-form :form="form">
          <el-row class="form-row" :gutter="24">
            <el-col :span="4" :offset="1">
              <!--<a-checkbox-group v-model="BysxqxList" :options="BysxqxOptions"/>-->
              <a-checkbox-group v-model="BysxqxList">
                <a-row><a-col :span="24"><a-checkbox value="1">存在违纪、违法、故意拖欠贷款本息情况的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="2">游手好闲无正当职业的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="3">五保、低保户的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="4">服刑人员及有犯罪前科的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="5">年龄在40周岁以上且无家庭成员的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="6">因家庭暴力或不正当行为致家庭不和睦的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="7">有赌博、吸毒、涉黄等不良社会嗜好的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="8">因长年患病、残疾丧失劳动能力的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="9">涉及非法集资和有涉黑、涉恶情形的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="10">欠债较多且资产负债率已超过60%</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="11">扶贫小额信贷有余额暂未结清的贫困</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="12">贷款被诉讼强执行的</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="13">有不良信用记录的（含家庭成员）</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="14">不孝顺父母</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="15">人品不好</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="16">在户籍地址已无住房或有住房但已不能居住的长期外出人员</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="17">社会信用观念差不睦邻友好</a-checkbox></a-col></a-row>
                <a-row><a-col :span="24"><a-checkbox value="18">有不良担保贷款的（含挂息）</a-checkbox></a-col></a-row>
              </a-checkbox-group>
            </el-col>
          </el-row>
        </a-form>
      </a-card>
    </a-spin>

  </a-modal>
</template>

<script>
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import { getAction } from '../../../../../api/manage'

  export default {
    name: 'BysxqxDetailsModal',
    components: { AFormItem },
    data() {
      return {
        title: '操作',
        visible: false,
        disableSubmit: true,
        confirmLoading: false,
        form: this.$form.createForm(this),
        pylx: '',
        zjhm: '',
        pyyzjhm: '',
        BysxqxList: [],
        BysxqxOptions: [
          { label: '存在违纪、违法、故意拖欠贷款本息情况的', value: '1' },
          { label: '游手好闲无正当职业的', value: '2' },
          { label: '五保、低保户的', value: '3' },
          { label: '服刑人员及有犯罪前科的', value: '4' },
          { label: '年龄在40周岁以上且无家庭成员的', value: '5' },
          { label: '因家庭暴力或不正当行为致家庭不和睦的', value: '6' },
          { label: '有赌博、吸毒、涉黄等不良社会嗜好的', value: '7' },
          { label: '因长年患病、残疾丧失劳动能力的', value: '8' },
          { label: '涉及非法集资和有涉黑、涉恶情形的', value: '9' },
          { label: '欠债较多且资产负债率已超过60%', value: '10' },
          { label: '扶贫小额信贷有余额暂未结清的贫困', value: '11' },
          { label: '贷款被诉讼强执行的', value: '12' },
          { label: '有不良信用记录的（含家庭成员）', value: '13' },
          { label: '不孝顺父母', value: '14' },
          { label: '人品不好', value: '15' },
          { label: '在户籍地址已无住房或有住房但已不能居住的长期外出人员', value: '16' },
          { label: '社会信用观念差不睦邻友好', value: '17' },
          { label: '有不良担保贷款的（含挂息）', value: '18' },
        ],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        url: {
          bysxqxListQuery: '/nh/nhjbxx/PymxData',
        },
      }
    },
    created() {},
    methods: {
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleCancel() {
        this.BysxqxList = []
        this.close()
      },
      showModal() {
        this.visible = true
        this.form.resetFields()
        let params = { zjhm: this.zjhm, pyyzjhm: this.pyyzjhm }
        // console.info('params :',params)
        getAction(this.url.bysxqxListQuery, params, this.BysxqxList).then((res) => {
          if (res.success) {
            // console.info('res.result :',res.result)
            // console.info('不予授信情形 :',res.result.bysxqx)
            this.BysxqxList = res.result.bysxqx == null ? [] : res.result.bysxqx.split(',')
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>