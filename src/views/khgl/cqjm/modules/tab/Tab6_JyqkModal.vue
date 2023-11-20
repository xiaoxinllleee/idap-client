<template>
  <a-tab-pane tab="经营情况" :key="7" :forceRender="true">
    <j-editable-table :ref="refKeys[0]"
                      :loading="JyqkColumn.loading"
                      :columns="JyqkColumn.columns"
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
        activeKey: 'JyqkResultList',
        refKeys: ['JyqkResultList'],
        JyqkResultList: [],
        dataSource: [],
        JyqkColumn: {
          loading: false,
          columns: [
            {
              title: '项目类型',
              placeholder: '${title}',
              key: 'xmlx',
              align: "center",
              type: FormTypes.select,
              dictCode: "xmlx",
              // validateRules: [
              //   { required: true, message: '${title}不能为空！' },
              // ],
              width: '20%',
            },
            {
              title: '项目情况',
              placeholder: '请选择${title}',
              key: 'xmqk',
              align: "center",
              type: FormTypes.input,
              width: '20%',
            },
            {
              title: '项目年支出(元)',
              placeholder: '${title}',
              key: 'xmnzc',
              align: "center",
              type: FormTypes.inputNumber,
              width: '20%',
            },
            {
              title: '项目年收入(元)',
              placeholder: '${title}',
              key: 'xmnsr',
              align: "center",
              type: FormTypes.input,
              width: '20%',
            },
            {
              title: '项目净利润(元)',
              placeholder: '${title}',
              key: 'xmjlr',
              align: "center",
              type: FormTypes.input,
              width: '20%',
            },
          ],
        },
        url: {
          list: "/khgl.cqjm/cqjmJbxx/queryJyqk",
        },
      }
    },
    methods: {
      add() {
        this.dataSource = [];
      },
      edit() {
        this.$refs.JyqkResultList.getValues((error, values) => {
          console.log(values)
          this.JyqkResultList = values
        })
      },
    },
  }
</script>

<style scoped>
</style>