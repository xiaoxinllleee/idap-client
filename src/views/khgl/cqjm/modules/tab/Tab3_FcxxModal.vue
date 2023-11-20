<template>
  <a-tab-pane tab="房产信息" :key="4" :forceRender="true">
    <j-editable-table :ref="refKeys[0]"
                      :loading="FcxxColumn.loading"
                      :columns="FcxxColumn.columns"
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
    name: 'FcxxModal',
    mixins: [JEditableTableMixin],
    components: { JEditableTable },
    data() {
      return {
        addDefaultRowNum: 1,
        validatorRules: {},
        activeKey: 'FcxxResultList',
        refKeys: ['FcxxResultList'],
        FcxxResultList: [],
        dataSource: [],
        FcxxColumn: {
          loading: false,
          columns: [
            {
              title: '房产编码',
              placeholder: '${title}',
              key: 'fcbm',
              align: "center",
              type: FormTypes.input,
              // validateRules: [
              //   { required: true, message: '${title}不能为空！' },
              // ],
              width: '15%',
            },
            {
              title: '房产性质',
              placeholder: '请选择${title}',
              key: 'fcxz',
              align: "center",
              type: FormTypes.select,
              dictCode: "khgl_fcxz",
              // validateRules: [
              //   { required: true, message: '请选择${title}！' },
              // ],
              width: '15%',
            },
            {
              title: '房产数量',
              placeholder: '${title}',
              key: 'fcsl',
              align: "center",
              type: FormTypes.inputNumber,
              width: '10%',
            },
            {
              title: '房产面积(㎡)',
              placeholder: '${title}',
              key: 'fcmj',
              align: "center",
              type: FormTypes.input,
              width: '10%',
            },
            {
              title: '房产价值(元)',
              placeholder: '${title}',
              key: 'fcjz',
              align: "center",
              type: FormTypes.inputNumber,
              width: '10%',
            },
            {
              title: '房产位置',
              placeholder: '${title}',
              key: 'fcwz',
              align: "center",
              type: FormTypes.input,
              width: '25%',
            },
            {
              title: '备注',
              placeholder: '${title}',
              key: 'bz',
              align: "center",
              type: FormTypes.input,
              width: '15%',
            },
          ],
        },
        url: {
          list: "/khgl.cqjm/cqjmJbxx/queryFcxx",
        },
      }
    },
    methods: {
      add() {
        this.dataSource = [];
      },
      edit() {
        this.$refs.FcxxResultList.getValues((error, values) => {
          console.log(values)
          this.FcxxResultList = values
        })
      },
    },
  }
</script>

<style scoped>
</style>