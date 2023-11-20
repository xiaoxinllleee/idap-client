<template>
  <a-modal :title="title"
           :width="1800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="destroyOnClose"
           :keyboard="keyboard"
           :maskClosable="maskClosable"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="保存"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="true">
          <p style="margin: 5px 0;color: red">注意事项：</p>
          <p style="margin: 5px 0">1. 收回手工计息的，需要手工填入。系统自动通过2241账户流水校验，校验通过则能保存成功；</p>
          <p style="margin: 5px 0">2. 系统不能判断只收回核销本金和只收回核销利息的情况，默认记载在收回核销本金，如果是只收回核销利息，请点击“交换”按钮；</p>
          <p style="margin: 5px 0">3. 仅收回手工利息（如收回收本挂息）的情况，点击“新增”，必填项目为：入账日期、账号后，填写收回手工利息；</p>
          <p style="margin: 5px 0">4. 本次只能维护【<span style="color: red">{{ this.sjgxrShow }}</span>】前的数据，原维护保存成功的数据不会显示。特殊情况需要修改已保存的历史收回数据的，请联系管理员或者稽核员使用“超级修改”按钮维护。</p>
          <a-divider dashed/>
          <j-editable-table ref="editableTable"
                            AddButtonName="新增"
                            :disabled="false"
                            :loading="bwdkshmxTable.loading"
                            :columns="bwdkshmxTable.columns"
                            :dataSource="bwdkshmxTable.dataSource"
                            :scroll="{ x: 2000 }"
                            :maxHeight="300"
                            :rowNumber="false"
                            :rowSelection="true"
                            :actionButton="true"
                            @valueChange="valueChange">
          </j-editable-table>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {postAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {FormTypes} from "@/utils/JEditableTableUtil";
  import JEditableTable from "@/components/jeecg/JEditableTable";

  export default {
    name: "AddModal",
    components: {
      JEditableTable,
      JTreeSelect
    },
    data () {
      return {
        title:"修改表外贷款收回信息",
        visible: false,
        disabled: false,
        confirmLoading: false,
        destroyOnClose: true,
        keyboard: true,
        maskClosable: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
          rzwd: {rules: [{required: true, message: '请输入入账网点!'}]}
        },
        rzwd: '',
        sjgxrShow: moment(new Date()).format("YYYY年MM月DD日"),
        bwdkshmxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '入账网点',
              key: 'rzwd',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '${title}',
              disabled: true,
              width: '8%',
            },
            {
              title: '入账日期',
              key: 'shrq',
              type: FormTypes.date,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8.5%',
            },
            {
              title: '清收员工工号',
              key: 'qsyggh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8%',
            },
            {
              title: '清收员工姓名',
              key: 'qskhjl',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8%',
            },
            {
              title: '账号',
              key: 'zh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8%',
            },
            {
              title: '借款人姓名',
              key: 'jkrxm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8%',
            },
            {
              title: '证件号码',
              key: 'zjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8%',
            },
            {
              title: '借款日期',
              key: 'jkrq',
              type: FormTypes.date,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8.5%',
            },
            {
              title: '到期日期',
              key: 'dqrq',
              type: FormTypes.date,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '8.5%',
            },
            {
              title: '收回核销本金',
              key: 'shhxbj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[
                {
                  required: true, // 必填
                  message: '${title}不能为空', // 提示的文本
                },
                {
                  pattern: /^([0-9]*|d*.d{2}?d*)$/, // 正则
                  message: '${title}只能是带两位小数点的数字'
                },
              ],
              width: '8%',
            },
            {
              title: '交换本金利息',
              key: 'jhbjlx',
              type: FormTypes.inputNumber,
              placeholder: '${title}',
              defaultValue: '',
              disabled: true,
            },
            {
              title: '收回核销利息',
              key: 'shhxlx',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[
                {
                  required: true, // 必填
                  message: '${title}不能为空', // 提示的文本
                },
                {
                  pattern: /^([0-9]*|d*.d{2}?d*)$/, // 正则
                  message: '${title}只能是带两位小数点的数字'
                },
              ],
              width: '8%',
            },
            {
              title: '收回手工计息',
              key: 'shlx',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '${title}',
              validateRules:[
                {
                  required: true, // 必填
                  message: '${title}不能为空', // 提示的文本
                },
                {
                  pattern: /^([0-9]*|d*.d{2}?d*)$/, // 正则
                  message: '${title}只能是带两位小数点的数字'
                },
              ],
              width: '8%',
            },
            {
              title: '备注',
              key: 'bz',
              type: FormTypes.input,
              placeholder: '${title}',
              validateRules:[{
                required: false, // 必填
                message: '${title}不能为空' // 提示的文本
              }],
              width: '10%',
            },
          ]
        },
        url: {
          save: "/bwdkshmx/bwdkshmx/addSave",
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
        //this.model = Object.assign({}, record);
        this.visible = true;
        //this.$nextTick(() => {
        //  this.form.setFieldsValue(pick(this.model, 'qsyggh', 'rzwd', 'zh', 'jkrxm', 'zjhm', 'shbxje', 'shbbbj', 'shhxbj', 'shhxlx', 'shlx', 'bz', 'qskhjl'))
        //  //时间格式化
        //  this.form.setFieldsValue({rzsj: this.model.rzsj ? moment(this.model.rzsj) : null})
        //})
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
            let formData = Object.assign(this.model, values);
            //日期/时间格式化
            //入账时间
            //formData.rzsj = formData.rzsj ? formData.rzsj.format() : null;
            console.log('handlerOK formdata:',formData)
            postAction(this.url.save,formData).then((res)=>{
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

      //
      valueChange(record) {

      },
    }
  }
</script>

<style lang="less" scoped>
</style>