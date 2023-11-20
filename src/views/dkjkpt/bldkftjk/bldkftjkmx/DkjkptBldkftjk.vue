<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="不良贷款反弹监控(比昨日)" key="1">
     <dkjkpt-bldkftjk-bsr-list></dkjkpt-bldkftjk-bsr-list>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="不良贷款反弹监控(比上月)" key="2">
    <dkjkpt-bldkftjk-bsy-list></dkjkpt-bldkftjk-bsy-list>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="不良贷款反弹监控(比上年末)" key="3">
     <dkjkpt-bldkftjk-bsnm></dkjkpt-bldkftjk-bsnm>
    </a-tab-pane>
  </a-tabs>

</template>

<script>
  import DkjkptBldkftjkBsnm from './modules/DkjkptBldkftjkBsnm'
  import DkjkptBldkftjkBsrList from './modules/DkjkptBldkftjkBsrList'
  import DkjkptBldkftjkBsyList from './modules/DkjkptBldkftjkBsyList'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'


  export default {
    name: "DkjkptBldkftjk",
    mixins:[JeecgListMixin],
    components: {
      DkjkptBldkftjkBsnm,DkjkptBldkftjkBsrList,DkjkptBldkftjkBsyList
    },
    methods: {
     
    }
  }
</script>
