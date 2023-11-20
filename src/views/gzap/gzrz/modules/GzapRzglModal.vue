<template>
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
        <a-row>
          <a-col :span="10" :gutter="6">
           <!-- <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织标志">
              <a-input placeholder="请输入组织标志" v-decorator="['zzbz', {}]"/>
            </a-form-item>-->
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="日期">
              <a-date-picker
                placeholder="请输入日期"
                style="width:100%"
                v-decorator="[ 'rq', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="10" :gutter="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户经理">
              <a-input placeholder="请输入客户经理" readonly  v-model="khjlmc"/>
            </a-form-item>
          </a-col>
        </a-row>
        <!--<a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="日期">
              <a-date-picker
                placeholder="请输入日期"
                style="width:100%"
                v-decorator="[ 'rq', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>-->
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="客户明细" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="gzapRzglKhghTable.loading"
            :columns="gzapRzglKhghTable.columns"
            :dataSource="gzapRzglKhghTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>




        </a-tab-pane>
        <a-tab-pane tab="今天计划总结" :key="refKeys[1]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[1]"
            :loading="gzapRzglJrjhzjTable.loading"
            :columns="gzapRzglJrjhzjTable.columns"
            :dataSource="gzapRzglJrjhzjTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>
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
  import {  mapGetters } from 'vuex'

  export default {
    name: 'GzapRzglModal',
    mixins: [JEditableTableMixin],
    data() {
      return {
        khjlmc:'',
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['gzapRzglKhgh', 'gzapRzglJrjhzj', ],
        activeKey: 'gzapRzglKhgh',
        // 客户明细
        gzapRzglKhghTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '备忘录',
              key: 'bwl',
              type: FormTypes.select,
              options: [ // 下拉选项
                { title: '电话拜访', value: '电话拜访' },
                { title: '现场拜访', value: '现场拜访' }
              ],
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '客户姓名',
              key: 'khxm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '主要内容',
              key: 'zynr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '营销成效',
              key: 'yxcx',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 今天计划总结
        gzapRzglJrjhzjTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '今日工作计划',
              key: 'jrjh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '完成情况',
              key: 'wcqk',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '未完成原因及需要协助的问题',
              key: 'wwcyy',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        url: {
          add: "/gzap/gzrl/gzapRzgl/add",
          edit: "/gzap/gzrl/gzapRzgl/edit",
          gzapRzglKhgh: {
            list: '/gzap/gzrl/gzapRzgl/queryGzapRzglKhghByMainId'
          },
          gzapRzglJrjhzj: {
            list: '/gzap/gzrl/gzapRzgl/queryGzapRzglJrjhzjByMainId'
          },
        }
      }
    },
    created () {
       this.intntkhjlmc();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
    intntkhjlmc(){
      this.khjlmc=this.userInfo().realname;
    },
    /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'zzbz', 'khjl', 'rq', ))
          // 时间格式化
          this.form.setFieldsValue({ rq: this.model.rq ? moment(this.model.rq) : null })
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.gzapRzglKhgh.list, params, this.gzapRzglKhghTable)
          this.requestSubTableData(this.url.gzapRzglJrjhzj.list, params, this.gzapRzglJrjhzjTable)
        }
      },
 
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        main.rq = main.rq ? main.rq.format() : null;
        return {
          ...main, // 展开
          gzapRzglKhghList: allValues.tablesValue[0].values,
          gzapRzglJrjhzjList: allValues.tablesValue[1].values,
        }
      }
    }
  }
</script>

<style scoped>
</style>