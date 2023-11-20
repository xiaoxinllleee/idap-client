<template>
  <a-tab-pane tab="负债情况" :key="6" :forceRender="true">
    <j-editable-table :ref="refKeys[0]"
                      :loading="FzqkColumn.loading"
                      :columns="FzqkColumn.columns"
                      :data-source="dataSource"
                      :max-height="350"
                      :row-number="false"
                      :row-selection="true"
                      :action-button="true"/>
  </a-tab-pane>
</template>

<script>
  import JEditableTable from '../../../../../components/jeecg/JEditableTable'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { FormTypes } from '../../../../../utils/JEditableTableUtil'

  export default {
    name: 'FzqkModal',
    mixins: [JEditableTableMixin],
    components: { JEditableTable },
    data() {
      return {
        addDefaultRowNum: 1,
        validatorRules: {},
        activeKey: 'FzqkResultList',
        refKeys: ['FzqkResultList'],
        FzqkResultList: [],
        dataSource: [],
        FzqkColumn: {
          loading: false,
          columns: [
            {
              title: '借款方式',
              placeholder: '${title}',
              key: 'jkfs',
              align: "center",
              type: FormTypes.select,
              dictCode: "jkfs",
              // validateRules: [
              //   { required: true, message: '${title}不能为空！' },
              // ],
              width: '20%',
            },
            {
              title: '债权人',
              placeholder: '请选择${title}',
              key: 'zqr',
              align: "center",
              type: FormTypes.input,
              // validateRules: [
              //   { required: true, message: '请选择${title}！' },
              // ],
              width: '20%',
            },
            {
              title: '负债金额(元)',
              placeholder: '${title}',
              key: 'fzje',
              align: "center",
              type: FormTypes.inputNumber,
              width: '20%',
            },
            {
              title: '负债说明',
              placeholder: '${title}',
              key: 'fzsm',
              align: "center",
              type: FormTypes.input,
              width: '40%',
            },
          ],
        },
        url: {
          list: "/khgl.cqjm/cqjmJbxx/queryFzqk",
        },
      }
    },
    methods: {
      add() {
        this.dataSource = [];
      },
      edit() {
        this.$refs.FzqkResultList.getValues((error, values) => {
          console.log(values)
          this.FzqkResultList = values
        })
      },
    },
  }
</script>

<style scoped>
</style>