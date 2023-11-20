<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="全行重复上传统计" key="1">
      <qh-tpcfsctj-list/>
    </a-tab-pane>
    <!--<a-tab-pane loading="true" tab="行政村重复上传统计" key="2">-->
      <!--<xzc-tpcfsctj-list/>-->
    <!--</a-tab-pane>-->
    <a-tab-pane loading="true" tab="单户重复上传统计" key="3">
      <dh-tpcfsctj-list/>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import QhTpcfsctjList from './QhTpcfsctjList'
  import DhTpcfsctjList from './DhTpcfsctjList'
  import XzcTpcfsctjList from './XzcTpcfsctjList'

  export default {
    name: "TpcfsctjList",
    mixins: [ JeecgListMixin ],
    components: { QhTpcfsctjList, DhTpcfsctjList, XzcTpcfsctjList },
    methods: {
    }
  }
</script>

<style scoped>

</style>