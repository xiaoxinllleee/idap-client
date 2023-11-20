<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="等级评定汇总表" key="1">
      <khjldjpd-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="等级评定明细表" key="2">
      <khjldjpd-mx-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import KhjldjpdList from './modules/KhjldjpdList'
  import KhjldjpdMxList from './modules/KhjldjpdMxList'

  export default {
    name: "PjsxtjList",
    mixins: [ JeecgListMixin ],
    components: { KhjldjpdList,KhjldjpdMxList },
    methods: {
    }
  }
</script>

<style scoped>

</style>