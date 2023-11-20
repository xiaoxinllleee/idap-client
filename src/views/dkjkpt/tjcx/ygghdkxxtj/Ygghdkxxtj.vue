<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="员工管户贷款信息统计(月报)" key="1">
      <ygghdkxxtj-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="员工管户贷款信息统计(季报)" key="2">
      <ygghdkxxtj-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="员工管户贷款信息统计(年报)" key="3">
      <ygghdkxxtj-nb-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import YgghdkxxtjYbList from './modules/YgghdkxxtjYbList'
  import YgghdkxxtjJbList from './modules/YgghdkxxtjJbList'
  import YgghdkxxtjNbList from './modules/YgghdkxxtjNbList'

  export default {
    name: "Dkjkpt_Tjxc_Ygghdkxxtj",
    components: { YgghdkxxtjYbList, YgghdkxxtjJbList, YgghdkxxtjNbList },
    methods: {
    }
  }
</script>

<style scoped>

</style>