<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="全行不良贷款反弹监控(比昨日)" key="1">
      <dkjkptqh-bldkftjk-bzr-list/>
    </a-tab-pane>

    <a-tab-pane loading="true" tab="全行不良贷款反弹监控(比上月)" key="2">
      <dkjkptqh-bldkftjk-bsy-list/>
    </a-tab-pane>

    <a-tab-pane loading="true" tab="全行不良贷款反弹监控(比上年末)" key="3">
      <dkjkptqh-bldkftjk-bsnm/>
    </a-tab-pane>
  </a-tabs>

</template>

<script>
  import DkjkptqhBldkftjkBsnm from './modules/DkjkptQhbldkftjkBsnmList'
  import DkjkptqhBldkftjkBzrList from './modules/DkjkptQhbldkftjkBzrList'
  import DkjkptqhBldkftjkBsyList from './modules/DkjkptQhbldkftjkBsyList'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QhdkjkptBldkftjk",
    mixins:[JeecgListMixin],
    components: {
      DkjkptqhBldkftjkBzrList,
      DkjkptqhBldkftjkBsyList,
      DkjkptqhBldkftjkBsnm
    },
    methods: {

    }
  }
</script>
