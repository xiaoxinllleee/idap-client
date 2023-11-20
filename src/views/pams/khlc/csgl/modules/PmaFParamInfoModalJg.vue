<template>
  <a-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="8">
          <a-col :span="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="参数编号">
              <a-input placeholder="请输入参数编号" disabled="disabled" v-decorator="['paramId', {} ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="参数名称">
              <a-input placeholder="请输入参数名称" disabled="disabled" v-decorator="['paramName', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-card class="card" :bordered="false">
          <j-editable-table
            ref="jgcsxx"
            AddButtonName="机构参数信息"
            :disabled="false"
            :loading="dydbTable.loading"
            :columns="dydbTable.columns"
            :dataSource="dydbTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>
        </a-card>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction,postAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { putAction,getAction } from '@/api/manage'
import { FormTypes, getRefPromise } from '@/utils/JEditableTableUtil'
//import formCreate from '@form-create/element-ui'
//import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
import JEditableTable from '@comp/jeecg/JEditableTable'
export default {
  name: "LldjsqModal",
  components: {
    JTreeSelect,JEditableTable
  },
  /*props: {
    // 列信息
    columns: {
      type: Array,
      required: true
    },
    // 数据源
    dataSource: {
      type: Array,
      required: true,
      default: () => []
    },
    // 是否显示操作按钮
    actionButton: {
      type: Boolean,
      default: false
    },
    // 是否显示行号
    rowNumber: {
      type: Boolean,
      default: false
    },
    // 是否可选择行
    rowSelection: {
      type: Boolean,
      default: false
    },
    // 页面是否在加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 页面是否在加载中
    maxHeight: {
      type: Number,
      default: 400
    },
    // 要禁用的行
    disabledRows: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否禁用全部组件
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否可拖拽排序
    dragSort: {
      type: Boolean,
      default: false
    },
    dragSortKey: {
      type: String,
      default: 'orderNum'
    },
    AddButtonName:{
      type: String,
      default: '新增'
    }
  },*/
  data () {
    return {
      submitData:{},
      title:"操作",
      years:'',
      dbje:'',
      model: {},
      visible: false,

      labelCol: {
        sm: { span: 11 },
      },
      wrapperCol: {
        sm: { span: 12 },

      },
      dydbTable: {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '机构代码',
            key: 'jgdm',
            type: FormTypes.select,
            defaultValue: '',
            placeholder: '请输入${title}',
            dictCode: 'jgdm',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }]
          },

          {
            title: '参数值',
            key: 'paramValue',
            type: FormTypes.inputNumber,
            defaultValue: '',
            placeholder: '请输入${title}',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }]
          },
          {
            title: '最大参数值',
            key: 'maxLimit',
            type: FormTypes.input,
            defaultValue: '',
            placeholder: '请输入${title}',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }]
          },
          {
            title: '最大参数值',
            key: 'minLimit',
            type: FormTypes.inputNumber,
            defaultValue: '',
            placeholder: '请输入${title}',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            },{
              pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
              message: '${title}只能是带一位小数点的数字'
            }]
          },
        ]
      },
      confirmLoading: false,
      form: this.$form.createForm(this),

      url: {
        add: "/csgl/csxx/pmaFParamInfo/addjgcsxx",
      },
      fApi:{},
      //表单生成规则
      rule:[],
      //组件参数配置
      option:{
        //表单提交事件
        form:{
          labelPosition:"right",
          labelWidth:200,
          labelcolon:true,
          showMessage:true,
        },
        row:{
          gutter:6,
        },
        rateDbxxgls:[],
        resetBtn: false,
        submitBtn: false,
        onSubmit:function (formData) {
          alert(JSON.stringify(formData));
          this.submitData=JSON.stringify(formData);
        },

      }
    }
  },
  created () {

  },

  methods: {


    selectValue(value) {
      console.log('selectValue::::' + value)
      let val = value;
      this.$emit('change', val);
    },
    add() {
      this.edit({});
    },
    edit(record) {
      this.form.resetFields();
      this.model = Object.assign({}, record);
      this.visible = true;

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'paramId','paramName'))
      });


      //查询担保信息
      this.queryDbxx();

    },
    close() {
      this.$emit('close');
      this.visible = false;
    },
    queryDbxx(){
      getAction("/csgl/csxx/pmaFParamInfo/queryByParamIdAndArea",{paramId:this.model.paramId,area:"1"}).then(res => {
        console.log(res)
        if (res.success){
          this.dydbTable.dataSource=res.result;
        }
      })

    },

    handleOk() {

      const that = this;

      this.form.validateFields((err, values) => {
        if (!err) {

          this.viDbxx();

          let formData = Object.assign(this.model, values);
          console.log("=== formData ===")
          console.log(formData)


          postAction(this.url.add, formData).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.$emit('ok');
            } else {
              that.$message.warning(res.message);
            }
          }).finally(() => {
            that.confirmLoading = false;
            that.close();
          })
        }
      })
    },
    viDbxx(){


      let { error, values } = this.$refs.jgcsxx.getValuesSync({ })
      if (error === 0) {
        console.log('表单验证通过，数据：', values);
        this.model.jgcsxx = values;
      } else {
        console.log('未通过表单验证，数据：', values);
        return ;
      }
    },

    handleCancel() {
      this.close()
    },

    parseJson(json){
      return JSON.parse(json,function(k, v){
        if (v!=null && v.indexOf && v.index0f("function") >-1){
          try {
            return eval("(function()(return "+ v + " })()")
          }catch (e) {
            return void console.error("[form- create]#F#Jk :".concat(v))
          }
        }
        return v
      })
    }

  }
}
</script>

<style lang="less" scoped>
</style>