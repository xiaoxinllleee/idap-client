<template>
  <a-modal :title="title"
           :width="1000"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">

      <!--主表单区域 begin-->
      <a-form :form="form">
        <a-row>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评定周期">
            <j-dict-select-tag placeholder="评定周期" v-decorator="['pdzq',{}]" dict-code="rqwd" disabled/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
            <a-input placeholder="客户名称" v-decorator="['khmc',{}]" disabled/>
          </a-form-item></a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评定日期">
            <a-date-picker placeholder="评定日期" v-decorator="['pdrq',{}]" style="width: 100%;" disabled/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
            <a-input placeholder="证件号码" v-decorator="['zjhm',{}]" disabled/>
          </a-form-item></a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评定等级">
            <j-dict-select-tag placeholder="评定等级" v-decorator="['pddj',{}]" dict-code="KHDJ_KHDJSZ,DJMC,DJBH" disabled/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
            <j-dict-select-tag placeholder="客户类型" v-decorator="['khlx',{}]" dict-code="khdjpd_khlx" disabled/>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上期评定等级">
            <j-dict-select-tag placeholder="上期评定等级" v-decorator="['sqpddj',{}]" dict-code="KHDJ_KHDJSZ,DJMC,DJBH" disabled/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式">
            <a-input placeholder="联系方式" v-decorator="['lxfs',{}]" disabled/>
          </a-form-item></a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上期评定日期">
            <a-date-picker placeholder="上期评定日期" v-decorator="['sqpdrq',{}]" style="width: 100%;" disabled/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
      <!--主表单区域 end-->

      <!--评定数据项明细 begin-->
      <a-tabs v-model="activeKey">
        <a-tab-pane tab="评定数据项明细" :key="refKeys[0]" :forceRender="true">
          <j-editable-table :ref="refKeys[0]"
                            :loading="khdjpdSjxmxTable.loading"
                            :data-source="khdjpdSjxmxTable.dataSource"
                            :columns="khdjpdSjxmxTable.columns"
                            :max-height="300"
                            :row-number="true"
                            :row-selection="false"
                            :action-button="false" :disabled="true"/>
        </a-tab-pane>
      </a-tabs>
      <!--评定数据项明细 end-->
    </a-spin>
  </a-modal>
</template>

<script>
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import JEditableTable from '../../../../components/jeecg/JEditableTable'
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import ARow from "ant-design-vue/es/grid/Row";
  import pick from 'lodash.pick'
  import moment from "moment"
  import ACol from 'ant-design-vue/es/grid/Col'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import { FormTypes } from '../../../../utils/JEditableTableUtil'
  import { getAction } from '../../../../api/manage'

  export default {
    name: "KhdjpdModal",
    mixins: [JEditableTableMixin],
    components: { AFormItem, ACol, JEditableTable, ARow, JSelectUserByDep, JDictSelectTag },
    data () {
      return {
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        disableSubmit: true,
        confirmLoading: false,
        addDefaultRowNum: 1,
        refKeys: ['khdjpdSjxmxTable'],
        activeKey: 'khdjpdSjxmxTable',
        // 评定数据项明细
        khdjpdSjxmxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '评定周期',
              placeholder: '${title}',
              key: 'pdzq',
              type: FormTypes.select,
              dictCode: 'rqwd',
              width: '15%',
            },
            {
              title: '评定日期',
              placeholder: '${title}',
              key: 'pdrq',
              type: FormTypes.date,
              width: '25%',
            },
            /*{
              title: '数据项ID',
              placeholder: '${title}',
              key: 'sjxid',
              type: FormTypes.input
            },*/
            {
              title: '数据项名称',
              placeholder: '${title}',
              key: 'sjxmc',
              type: FormTypes.input,
              width: '40%',
            },
            {
              title: '数据项结果',
              placeholder: '${title}',
              key: 'sjxjg',
              type: FormTypes.input,
              width: '20%',
            }
          ],
        },
        url: {
          khdjpdSjxmxTable: {
            list: '/khgl/khdjpd/viewDetail'
          }
        },
      }
    },
    created () {
    },
    methods: {
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'pdzq', 'pdrq', 'khmc', 'zjhm', 'khlx', 'ssyxdy', 'pddj', 'sqpdrq', 'sqpddj', 'lxfs'))
          // 日期格式化
          this.form.setFieldsValue({ pdrq: this.model.pdrq ? moment(this.model.pdrq) : null })
          this.form.setFieldsValue({ sqpdrq: this.model.sqpdrq ? moment(this.model.sqpdrq) : null })
          // 加载评定数据项明细
          if (this.model.zjhm) {
            let params = { pdzq: this.model.pdzq, pdrq: this.model.pdrq, zjhm: this.model.zjhm }
            getAction(this.url.khdjpdSjxmxTable.list, params).then(res => {
              this.requestSubTableData(this.url.khdjpdSjxmxTable.list, params, this.khdjpdSjxmxTable)
            })
          }
        })
      },
      classifyIntoFormData (allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        // 日期格式化
        main.pdrq = main.pdrq ? main.pdrq.format() : null
        return {
          ...main,
          khdjpdSjxmxTable: allValues.tableValues[0].values
        }
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>