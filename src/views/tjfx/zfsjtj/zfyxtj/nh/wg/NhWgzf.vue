<template>
  <a-tabs defaultActiveKey="1" tab-position="left" type="card">
    <a-tab-pane loading="true" tab="网格走访(汇总)" key="1">
      <wgzf-hz-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(日报)" key="2">
      <wgzf-rb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(月报)" key="3">
      <wgzf-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(季报)" key="4">
      <wgzf-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(年报)" key="5">
      <wgzf-nb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(累计)" key="6">
      <wgzf-lj-list/>
    </a-tab-pane>

  </a-tabs>
</template>

<script>
   import WgzfRbList from './modules/WgzfRbList'
   import WgzfYbList from './modules/WgzfYbList'
   import WgzfJbList from './modules/WgzfJbList'
   import WgzfNbList from './modules/WgzfNbList'
   import WgzfHzList from './modules/WgzfHzList'
   import WgzfLjList from './modules/WgzfLjList'


  export default {
    name: "tjfx_zfyxtj_wg",
    components: { WgzfHzList, WgzfRbList, WgzfYbList, WgzfJbList, WgzfNbList, WgzfLjList },
    methods: {
    }
  }
</script>

<style scoped>

</style>