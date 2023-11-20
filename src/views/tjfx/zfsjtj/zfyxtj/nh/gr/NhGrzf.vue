<template>
  <a-tabs defaultActiveKey="1" tab-position="left" type="card">
    <a-tab-pane loading="true" tab="个人走访(汇总)" key="1">
      <grzf-hz-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(日报)" key="2">
      <grzf-rb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(月报)" key="3">
      <grzf-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(季报)" key="4">
      <grzf-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(年报)" key="5">
      <grzf-nb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(累计)" key="6">
      <grzf-lj-list/>
    </a-tab-pane>

  </a-tabs>
</template>

<script>
   import GrzfRbList from './modules/GrzfRbList'
   import GrzfYbList from './modules/GrzfYbList'
   import GrzfJbList from './modules/GrzfJbList'
   import GrzfNbList from './modules/GrzfNbList'
   import GrzfHzList from './modules/GrzfHzList'
   import GrzfLjList from './modules/GrzfLjList'


  export default {
    name: "tjfx_zfyxtj_khjl",
    components: { GrzfHzList, GrzfRbList, GrzfYbList, GrzfJbList, GrzfNbList, GrzfLjList },
    methods: {
    }
  }
</script>

<style scoped>

</style>