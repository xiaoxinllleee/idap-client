<template>
  <a-tab-pane tab="家庭成员情况" :key="2" :forceRender="true">
    <j-editable-table :ref="refKeys[0]"
                      :loading="JtcyqkColumn.loading"
                      :columns="JtcyqkColumn.columns"
                      :data-source="dataSource"
                      :max-height="350"
                      :row-number="false"
                      :row-selection="false"
                      :action-button="false"/>
  </a-tab-pane>
</template>

<script>
  import JEditableTable from '../../../../../components/jeecg/JEditableTable'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { FormTypes } from '../../../../../utils/JEditableTableUtil'
  import {duplicateCheck } from '@/api/api'
  export default {
    name: 'JtcyqkModal',
    mixins: [JEditableTableMixin],
    components: { JEditableTable },
    data() {
      return {
        addDefaultRowNum: 1,
        validatorRules: {},
        activeKey: 'JtcyqkResultList',
        refKeys: ['JtcyqkResultList'],
        JtcyqkResultList: [],
        dataSource: [],
        JtcyqkColumn: {
          loading: false,
          columns: [
            {
              title: '与户主关系',
              placeholder: '请选择${title}',
              key: 'yhzgx',
              align: "center",
              type: FormTypes.select,
              dictCode: "yhzgx",
              validateRules: [
                { required: true, message: '请选择${title}！' },
              ],
              width: '15%',
            },
            {
              title: '成员性别',
              placeholder: '请选择${title}',
              key: 'sex',
              align: "center",
              type: FormTypes.select,
              dictCode: "sex",
              validateRules: [
                { required: true, message: '请选择${title}！' },
              ],
              width: '15%',
            },
            {
              title: '成员名称',
              placeholder: '${title}',
              key: 'khmc',
              align: "center",
              type: FormTypes.input,
              validateRules: [
                { required: true, message: '${title}不能为空！' },
              ],
              width: '15%',
            },
            {
              title: '证件号码',
              placeholder: '${title}',
              key: 'zjhm',
              align: "center",
              type: FormTypes.input,
              validateRules: [
                { required: true, message: '${title}不能为空！' },
              ],
              width: '15%',
            },
            {
              title: '联系方式',
              placeholder: '${title}',
              key: 'lxfs',
              align: "center",
              type: FormTypes.input,
              width: '15%',
            },
            {
              title: '家庭住址',
              placeholder: '${title}',
              key: 'address',
              align: "center",
              type: FormTypes.input,
              width: '25%',
            },
          ],
        },
        url: {
          list: "/khgl.cqjm/cqjmJbxx/queryJtcyqk",
        },
      }
    },
    methods: {
      add() {
        this.dataSource = [];
      },
      edit() {
        this.$refs.JtcyqkResultList.getValues((error, values) => {
          console.log(values)
          this.JtcyqkResultList = values;
        })
      },
    },
  }
</script>

<style scoped>
</style>