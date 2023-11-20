<template>
  <a-tabs defaultActiveKey="1" tab-position="left" type="card">
    <a-tab-pane loading="true" tab="支行授信用信(月报)" key="1">
      <zhsxyx-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行授信用信(季报)" key="2">
      <zhsxyx-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行授信用信(年报)" key="3">
      <zhsxyx-nb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行授信用信(累计)" key="4">
      <zhsxyx-lj-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
   import ZhsxyxYbList from './modules/ZhsxyxYbList'
   import ZhsxyxJbList from './modules/ZhsxyxJbList'
   import ZhsxyxNbList from './modules/ZhsxyxNbList'
   import ZhsxyxLjList from './modules/ZhsxyxLjList'

  export default {
    name: "zhsxyx",
    components: {ZhsxyxYbList,ZhsxyxJbList,ZhsxyxNbList, ZhsxyxLjList},
    methods: {
    }
  }
</script>

<style scoped>

</style>