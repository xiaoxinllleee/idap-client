<template>
  <a-modal
    :title="title"
    :width="600"
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
          label="业务机构">
          <a-input v-if='opEdit' placeholder='业务机构' v-decorator="['jgdm_dictText', validatorRules.jgdm ]" disabled/>
<!--          <j-tree-select v-else placeholder='请选择业务机构' v-decorator="['jgdm', validatorRules.jgdm ]"-->
<!--                         dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm' treeNodeFilterProp='title'-->
<!--                         show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false'/>-->
          <j-tree-select v-else
                         placeholder="请选择业务机构"
                         pid-field="sjywjgdm_b"
                         :showSearch="true"
                         treeNodeFilterProp="title"
                         v-decorator="['jgdm', validatorRules.jgdm ]"
                         dict="v_hr_bas_organization,zzjc,ywjgdm"
                         condition='{"sjywjgdm": "ywjgdm"}'
                         :tree-default-expand-all="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账年份">
          <a-select placeholder="请选择记账年份" v-decorator="['jznf', validatorRules.jznf]" @change="selectValue" :allowClear="true" :disabled='opEdit'>
            <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上限额度(万元)">
          <a-input-number placeholder="请输入上限额度" v-decorator="['sxed', validatorRules.sxed]" :step='1' :precision='2' style='width: 100%;'/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-textarea placeholder="请输入备注" v-decorator="['remark', {}]" :row='4'/>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="操作类型">-->
<!--          <a-input placeholder="请输入操作类型" v-decorator="['oprationType', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="操作员">-->
<!--          <a-input placeholder="请输入操作员" v-decorator="['operator', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="操作时间">-->
<!--          <a-date-picker v-decorator="[ 'oprationTime', {}]" />-->
<!--        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import notification from 'ant-design-vue/lib/notification'

  export default {
    name: "JylrhsZfyxzJgModal",
    components: { JTreeSelect },
    data () {
      return {
        title:"操作",
        visible: false,
        opEdit: true,
        // disabled: true,
        triggerChange: true,
        jznf: undefined,
        // 记账默认年份
        defaultYear: undefined,
        //years: [],
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
        validatorRules: {
          jgdm: { rules: [{ required: true, message: '请选择业务机构!' }] },
          jznf: { rules: [{ required: true, message: '请选择记账年份!' }] },
          sxed: { rules: [{ required: true, message: '请输入上限额度!' }] },
        },
        url: {
          add: "/jylrhs/csgl/jgzfyxz/add",
          edit: "/jylrhs/csgl/jgzfyxz/edit",
          duplicateCheck: '/jylrhs/csgl/jgzfyxz/check',
        },
      }
    },
    created () {
      this.init();
    },
    methods: {
      add() {
        this.opEdit = false
        // this.disabled = false
        this.edit({})
      },
      edit (record) {
        this.jznf = record.jznf;
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'sxed', 'remark'))
          //时间格式化
          let date = new Date
          let year = date.getFullYear()
          this.form.setFieldsValue({ jznf: this.model.jznf ? record.jznf.slice(0, 4) : year })
          this.form.setFieldsValue({ sxed: this.model.sxed ? this.model.sxed : 0 })
          // this.form.setFieldsValue({ jznf: this.model.jznf ? moment(this.model.jznf) : null })
          // this.form.setFieldsValue({oprationTime:this.model.oprationTime?moment(this.model.oprationTime):null})
        });
      },
      close () {
        this.opEdit = true
        // this.disabled = true
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            let httpurl = ''
            let method = ''
            if (!this.opEdit) {
              httpurl += this.url.add
              method = 'post'
            } else {
              httpurl += this.url.edit
              method = 'put'
            }
            let formData = Object.assign(this.model, values)
            //时间格式化
            formData.jznf = formData.jznf ? moment(formData.jznf+'-01-01').format('YYYY-MM-DD') : null
            //formData.oprationTime = formData.oprationTime?formData.oprationTime.format():null;
            console.log(formData)
            // console.log(formData.jznf)
            that.confirmLoading = true
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                // that.$message.success(res.message)
                notification.success({ message: '系统提示', description:res.message, duration: 4})
                that.close()
                that.$emit('ok')
              } else {
                // that.$message.warning(res.message)
                notification.warning({ message: '系统提示', description:res.message, duration: 4})
              }
            }).finally(() => {
              that.confirmLoading = false
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },

      //获取当前年份
      init() {
        let date = new Date
        let year = date.getFullYear()
        // console.log('year',year)
        this.initYear(year)
      },
      //初始化年份下拉框
      initYear(year) {
        this.years = []
        for (let i = 0; i < 30; i++) {
          this.years.push({ value: ((year - i) + ''), label: ((year - i) + '') })
        }
        // console.log('this.years',this.years)
      },
      //年份下拉选择
      selectValue(value) {
        this.$emit('change', value)
      },
    }
  }
</script>

<style lang="less" scoped>

</style>