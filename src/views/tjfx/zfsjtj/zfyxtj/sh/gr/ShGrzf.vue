<template>
  <a-tabs defaultActiveKey="1" tab-position="left" type="card">
    <a-tab-pane loading="true" tab="个人走访(汇总)" key="1">
      <sh-grzf-hz-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(日报)" key="2">
      <sh-grzf-rb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(月报)" key="3">
      <sh-grzf-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(季报)" key="4">
      <sh-grzf-jb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(年报)" key="5">
      <sh-grzf-nb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人走访(累计)" key="6">
      <sh-grzf-lj-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
   import ShGrzfRbList from './modules/ShGrzfRbList'
   import ShGrzfYbList from './modules/ShGrzfYbList'
   import ShGrzfJbList from './modules/ShGrzfJbList'
   import ShGrzfNbList from './modules/ShGrzfNbList'
   import ShGrzfHzList from './modules/ShGrzfHzList'
   import ShGrzfLjList from './modules/ShGrzfLjList'

  export default {
    name: "tjfx_zfyxtj_khjl",
    components: { ShGrzfHzList, ShGrzfRbList, ShGrzfYbList, ShGrzfJbList, ShGrzfNbList, ShGrzfLjList },
    methods: {
    }
  }
</script>

<style scoped>

</style>