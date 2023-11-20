<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="客户经理贷款信息统计(月报)" key="1">
      <khjldkxxtj-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="客户经理贷款信息统计(季报)" key="2">
      <khjldkxxtj-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="客户经理贷款信息统计(年报)" key="3">
      <khjldkxxtj-nb-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import KhjldkxxtjYbList from './modules/KhjldkxxtjYbList'
  import KhjldkxxtjJbList from './modules/KhjldkxxtjJbList'
  import KhjldkxxtjNbList from './modules/KhjldkxxtjNbList'

  export default {
    name: "Dkjkpt_Tjxc_Khdldkxxtj",
    components: { KhjldkxxtjYbList, KhjldkxxtjNbList, KhjldkxxtjJbList },
    methods: {
    }
  }
</script>

<style scoped>

</style>