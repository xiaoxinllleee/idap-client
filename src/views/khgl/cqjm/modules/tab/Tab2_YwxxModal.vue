<template>
  <a-tab-pane tab="业务信息" :key="3" :forceRender="true">
  </a-tab-pane>
</template>

<script>
  import JEditableTable from '../../../../../components/jeecg/JEditableTable'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { FormTypes } from '../../../../../utils/JEditableTableUtil'
  export default {
    name: 'YwxxModal',
    mixins: [JEditableTableMixin],
    components: { JEditableTable },
    data() {
      return {
        addDefaultRowNum: 1,
        validatorRules: {},
        activeKey: 'YwxxList',
        YwxxList: {},
        YwhxgywList: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        labelCol_A: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        labelCol_B: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        labelCol_C: {
          xs: { span: 24 },
          sm: { span: 9 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        wrapperCol_A: {
          xs: { span: 24 },
          sm: { span: 15 },
        },
        wrapperCol_B: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
        wrapperCol_C: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        url: {
          list: "/khgl.cqjm/cqjmJbxx/queryYwhxgyw",
        },
      }
    },
    methods: {
      add() {
        this.edit({})
      },
      edit() {
        this.$refs.YwhxgywList.getValues((error, values) => {
          console.log(values)
          this.YwhxgywList = values
        })
      },
    },
  }
</script>

<style scoped>
</style>