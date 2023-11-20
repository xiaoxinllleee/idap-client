<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="整村授信支行进度表" key="1">
      <zcsxzhjdb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="整村授信行政村进度表" key="2">
      <zcsxxzcjdb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="整村授信村组进度表" key="3">
      <zcsxczjdb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="整村授信批次进度表" key="4">
      <zcsxpcjdb-list/>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ZcsxczjdbList from './zcsxczjdb/ZcsxczjdbList'
  import ZcsxzhjdbList from './zcsxzhjdb/ZcsxzhjdbList'
  import ZcsxxzcjdbList from './zcsxxzcjdb/ZcsxxzcjdbList'
  import ZcsxpcjdbList from './zcsxpcjdb/ZcsxpcjdbList'

  export default {
    name: "TpcfsctjList",
    mixins: [ JeecgListMixin ],
    components: { ZcsxczjdbList, ZcsxzhjdbList, ZcsxxzcjdbList, ZcsxpcjdbList },
    methods: {
    }
  }
</script>

<style scoped>

</style>