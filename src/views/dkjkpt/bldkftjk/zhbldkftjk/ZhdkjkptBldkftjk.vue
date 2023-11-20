<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="支行不良贷款反弹监控(比昨日)" key="1">
      <dkjkptzh-bldkftjk-bzr-list/>
    </a-tab-pane>

    <a-tab-pane loading="true" tab="支行不良贷款反弹监控(比上月)" key="2">
      <dkjkptzh-bldkftjk-bsy-list/>
    </a-tab-pane>

    <a-tab-pane loading="true" tab="支行不良贷款反弹监控(比上年末)" key="3">
      <dkjkptzh-bldkftjk-bsnm/>
    </a-tab-pane>
  </a-tabs>

</template>

<script>
  import DkjkptzhBldkftjkBsnm from './modules/DkjkptZhbldkftjkBsnmList'
  import DkjkptzhBldkftjkBzrList from './modules/DkjkptZhbldkftjkBzrList'
  import DkjkptzhBldkftjkBsyList from './modules/DkjkptZhbldkftjkBsyList'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZhdkjkptBldkftjk",
    mixins:[JeecgListMixin],
    components: {
      DkjkptzhBldkftjkBzrList,
      DkjkptzhBldkftjkBsyList,
      DkjkptzhBldkftjkBsnm
    },
    methods: {
    }
  }
</script>
