<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col >
            <a-form-item label="任务名称" >
              <a-input
                v-decorator="['rwmc', {rules: [{ required: true, message: '请输入任务名称!' }]}]"
                placeholder="请输入任务名称" style="width: 100%"/>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开始时间">
              <a-date-picker placeholder="请输入开始时间" style="width:100%" v-decorator="[ 'kssj', {rules: [{ required: true, message: '请输入开始时间!' }]}]"/>
            </a-form-item>
          </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="结束时间">
              <a-date-picker  placeholder="请输入结束时间" style="width:100%"  v-decorator="[ 'jssj', {rules: [{ required: true, message: '请输入开始时间!' }]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>

          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="任务类型">
              <j-dict-select-tag :triggerChange="true" v-decorator="['rwlx', {rules: [{ required: true, message: '请输入任务类型!' }]}]" placeholder="请选择任务类型" dictCode="gzap_rwlx"/>

            </a-form-item>
          </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="重要级别">
              <!--<a-select   v-decorator="[ 'zyjb', {rules: [{ required: true, message: '请选择重要级别!' }]}]"  placeholder="请选择重要级别"   >
                <a-select-option value="1">普通</a-select-option>
                <a-select-option value="2">重要</a-select-option>
                <a-select-option value="3">非常重要</a-select-option>
              </a-select>-->
              <j-dict-select-tag :triggerChange="true" v-decorator="['zyjb', {rules: [{ required: true, message: '请输入重要级别!' }]}]" placeholder="请选择重要级别" dictCode="gzap_zyjb"/>


            </a-form-item>
          </a-col>
        </a-row>

      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="任务对象管理" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="gzapRwxf_RwglTable.loading"
            :columns="gzapRwxf_RwglTable.columns"
            :dataSource="gzapRwxf_RwglTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true">
            <template v-slot:rwdx="props">
              <j-select-user-by-dep  :selectId="props.rowId"  @change="GetValue"/>
            </template>
          </j-editable-table>
        </a-tab-pane>
      </a-tabs>

    </a-spin>
  </a-modal>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'



  export default {
    components: {
      ARow,JSelectUserByDep,JDictSelectTag,
    },
    name: 'GzapRwxfJxzModal',
    mixins: [JEditableTableMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['gzapRwxf_Rwgl'],
        activeKey: 'gzapRwxf_Rwgl',
        // 任务对象管理
        gzapRwxf_RwglTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '任务对象',
              key: 'rwdx',
              type: FormTypes.slot,
              defaultValue: '',
              slotName: 'rwdx'
            },
            {
              title: '任务值',
              key: 'rwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        url: {
          add: "/gzap.rwxf/gzapRwxfJxz/add",
          edit: "/gzap.rwxf/gzapRwxfJxz/edit",
          gzapRwxf_Rwgl: {
            list: '/gzap.rwxf/gzapRwxfJxz/queryGzapRwxf_RwglByMainId'
          },
        }
      }
    },
    methods: {

      aaa(){
        console.log('aaaaaa')
      },

      GetValue(value){
        this.$refs.gzapRwxf_Rwgl.setValues([
          {
            rowKey: value.id,
            values: { // 在这里 values 中的 name 是你 columns 中配置的 key
              'rwdx': value.user,
            }
          },

        ])
      },

      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'rwmc', 'kssj', 'jssj', 'rwlx', 'zyjb', 'rwz', 'rwsx', 'zt', ))
          // 时间格式化
          this.form.setFieldsValue({ kssj: this.model.kssj ? moment(this.model.kssj) : null })
          this.form.setFieldsValue({ jssj: this.model.jssj ? moment(this.model.jssj) : null })
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.gzapRwxf_Rwgl.list, params, this.gzapRwxf_RwglTable)
        }
      },

      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        main.kssj = main.kssj ? main.kssj.format() : null;
        main.jssj = main.jssj ? main.jssj.format() : null;
        return {
          ...main, // 展开
          gzapRwxf_RwglList: allValues.tablesValue[0].values,
        }
      },


    }
  }
</script>

<style scoped>
</style>