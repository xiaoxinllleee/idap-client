<template>
  <a-tabs defaultActiveKey="1" tab-position="left" type="card">
    <a-tab-pane loading="true" tab="网格授信用信(月报)" key="1">
      <wgsxyx-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格授信用信(季报)" key="2">
      <wgsxyx-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格授信用信(年报)" key="3">
      <wgsxyx-nb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格授信用信(累计)" key="4">
      <wgsxyx-lj-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
   import WgsxyxYbList from './modules/WgsxyxYbList'
   import WgsxyxJbList from './modules/WgsxyxJbList'
   import WgsxyxNbList from './modules/WgsxyxNbList'
   import WgsxyxLjList from './modules/WgsxyxLjList'

  export default {
    name: "shwgsxyx",
    components: {WgsxyxYbList,WgsxyxJbList,WgsxyxNbList, WgsxyxLjList},
    methods: {
    }
  }
</script>

<style scoped>

</style>