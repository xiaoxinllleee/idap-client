<template>
  <a-tab-pane tab="资产情况" :key="5" :forceRender="true">
    <j-editable-table :ref="refKeys[0]"
                      :loading="ZcqkColumn.loading"
                      :columns="ZcqkColumn.columns"
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
    name: 'ZcqkModal',
    mixins: [JEditableTableMixin],
    components: { JEditableTable },
    data() {
      return {
        addDefaultRowNum: 1,
        validatorRules: {},
        activeKey: 'ZcqkResultList',
        refKeys: ['ZcqkResultList'],
        ZcqkResultList: [],
        dataSource: [],
        ZcqkColumn: {
          loading: false,
          columns: [
            {
              title: '资产类型',
              placeholder: '${title}',
              key: 'zclx',
              align: "center",
              type: FormTypes.select,
              dictCode: "zcqk_zclx",
              // validateRules: [
              //   { required: true, message: '${title}不能为空！' },
              // ],
              width: '20%',
            },
            {
              title: '资产数量',
              placeholder: '请选择${title}',
              key: 'zcsl',
              align: "center",
              type: FormTypes.inputNumber,
              // validateRules: [
              //   { required: true, message: '请选择${title}！' },
              // ],
              width: '20%',
            },
            {
              title: '资产价值(元)',
              placeholder: '${title}',
              key: 'zcjz',
              align: "center",
              type: FormTypes.inputNumber,
              width: '20%',
            },
            {
              title: '资产详情说明',
              placeholder: '${title}',
              key: 'zcxqsm',
              align: "center",
              type: FormTypes.input,
              width: '40%',
            },
          ],
        },
        url: {
          list: "/khgl.cqjm/cqjmJbxx/queryZcqk",
        },
      }
    },
    methods: {
      add() {
        this.dataSource = [];
      },
      edit() {
        this.$refs.ZcqkResultList.getValues((error, values) => {
          console.log(values)
          this.ZcqkResultList = values
        })
      },
    },
  }
</script>

<style scoped>
</style>