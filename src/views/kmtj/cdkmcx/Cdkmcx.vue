<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="月度查询" key="1">
      <kmtj-ydcx-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="季度查询" key="2">
      <kmtj-jdcx-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="年度查询" key="3">
      <kmtj-ndcx-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="存贷科目余额查询" key="4">
      <cdkmyecx-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import KmtjYdcxList from './modules/KmtjYdcxList'
  import KmtjJdcxList from './modules/KmtjJdcxList'
  import KmtjNdcxList from './modules/KmtjNdcxList'
  import CdkmyecxList from './modules/CdkmyecxList'

  export default {
    name: "Cdkmcx",
    mixins: [ JeecgListMixin ],
    components: {
      KmtjYdcxList, KmtjJdcxList,KmtjNdcxList,CdkmyecxList
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>