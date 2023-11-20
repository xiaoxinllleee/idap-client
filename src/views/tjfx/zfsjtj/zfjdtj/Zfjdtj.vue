<template>
  <div>
    <a-tabs defaultActiveKey="1" tab-position="top" type="card">
      <a-tab-pane tab="走访进度统计" key="1" forceRender>
        <zfjdtj-list />
      </a-tab-pane>
      <a-tab-pane tab="存量数据" key="2" forceRender>
        <zfclsj-list />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import ZfjdtjList from './ZfjdtjList'
  import ZfclsjList from './ZfclsjList'
  export default {
    name: "Zfjdtj",
    components: {
      ZfjdtjList, ZfclsjList
    }
  }
</script>

<style scoped>

</style>