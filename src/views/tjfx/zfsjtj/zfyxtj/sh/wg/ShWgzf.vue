<template>
  <a-tabs defaultActiveKey="1" tab-position="left" type="card">
    <a-tab-pane loading="true" tab="网格走访(汇总)" key="1">
      <sh-wgzf-hz-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(日报)" key="2">
      <sh-wgzf-rb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(月报)" key="3">
      <sh-wgzf-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(季报)" key="4">
      <sh-wgzf-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(年报)" key="5">
      <sh-wgzf-nb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="网格走访(累计)" key="6">
      <sh-wgzf-lj-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
   import ShWgzfRbList from './modules/ShWgzfRbList'
   import ShWgzfYbList from './modules/ShWgzfYbList'
   import ShWgzfJbList from './modules/ShWgzfJbList'
   import ShWgzfNbList from './modules/ShWgzfNbList'
   import ShWgzfHzList from './modules/ShWgzfHzList'
   import ShWgzfLjList from './modules/ShWgzfLjList'

  export default {
    name: "tjfx_zfyxtj_wg",
    components: { ShWgzfHzList, ShWgzfRbList, ShWgzfYbList, ShWgzfJbList, ShWgzfNbList, ShWgzfLjList },
    methods: {
    }
  }
</script>

<style scoped>

</style>