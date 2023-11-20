<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="支行贷款统计(旬报)" key="1">
      <zhbndktj-xb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行贷款统计(月报)" key="2">
      <zhbndktj-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行贷款统计(年报)" key="3">
      <zhbndktj-nb-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import ZhbndktjXbList from './modules/ZhbndktjXbList'
  import ZhbndktjYbList from './modules/ZhbndktjYbList'
  import ZhbndktjNbList from './modules/ZhbndktjNbList'

  export default {
    name: "Dkjkpt_Tjxc_Zhdktj",
    components: { ZhbndktjXbList, ZhbndktjYbList, ZhbndktjNbList },
    methods: {
    }
  }
</script>

<style scoped>

</style>