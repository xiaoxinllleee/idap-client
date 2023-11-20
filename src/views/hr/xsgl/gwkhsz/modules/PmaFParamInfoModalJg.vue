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
        <a-button @click="openJg" type="primary" style="margin-left: 24px">选择机构</a-button>

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

    <check-box-jg-modal ref="checkJg" @jgdm="getJgdm"></check-box-jg-modal>

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
import JEditableTable from '../../../../../components/jeecg/JEditableTable'
import CheckBoxJgModal from './CheckBoxJgModal'
export default {
  name: "LldjsqModal",
  components: {
    JTreeSelect,JEditableTable,CheckBoxJgModal
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
            key: 'zzbz',
            type: FormTypes.select,
            defaultValue: '',
            placeholder: '请输入${title}',
            dictCode: 'zzbz',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }]
          },

          {
            title: '指标单价',
            key: 'zbdj',
            type: FormTypes.inputNumber,
            defaultValue: '',
            placeholder: '请输入${title}',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }]
          },
          {
            title: '指标单位',
            key: 'zbdw',
            type: FormTypes.select,
            defaultValue: '1',
            placeholder: '请输入${title}',
            dictCode: 'zbdw',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }]
          },
          {
            title: '调节系数',
            key: 'tjxs',
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
          {
            title: '指标权重',
            key: 'zbqz',
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
          {
            title: '任务外单价',
            key: 'rwwdj',
            type: FormTypes.inputNumber,
            defaultValue: '',
            placeholder: '请输入${title}',
            validateRules:[{
              pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
              message: '${title}只能是带一位小数点的数字'
            }]
          },
        ]
      },
      confirmLoading: false,
      form: this.$form.createForm(this),

      url: {
        add: "/jxkh/pmaGwkhsz/addJg",
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
    getJgdm(data){
      var flag;
      if (data.length > 0){
        for (let i = 0; i < data.length; i++) {
          flag = false;
          let zzbz = data[i];
          var gwkhsz = {zzbz:zzbz}
          if (this.dydbTable.dataSource > 0){
            for (let j = 0; j < this.dydbTable.dataSource.length; j++) {
              if (this.dydbTable.dataSource[j].zzbz == zzbz){
                flag = true;
              }
            }
            if (!flag){
              this.dydbTable.dataSource.push(gwkhsz);
            }

          }else {
            this.dydbTable.dataSource.push(gwkhsz)
          }
        }
      }
      console.log(this.dydbTable.dataSource.length)
    },

    openJg(){
        this.$refs.checkJg.edit();
        this.$refs.checkJg.title = "编辑";
        this.$refs.checkJg.disableSubmit = false;
    },


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

      //查询岗位考核设置信息
      this.queryGwkhszxx();

    },
    close() {
      this.$emit('close');
      this.visible = false;
    },
    queryGwkhszxx(){
      getAction("/jxkh/pmaGwkhsz/listAll",{schemeId:this.model.schemeId,indexId:this.model.indexId}).then(res => {
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
        this.model.jginfos = values;
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