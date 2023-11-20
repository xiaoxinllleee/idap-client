<template>
<!--  <a-tabs default-active-key="1">-->
<!--    <a-tab-pane loading="true" tab="等级分层：全行" key="1">-->
      <khjbfctj-modal></khjbfctj-modal>
<!--    </a-tab-pane>-->
<!--    <a-tab-pane loading="true" tab="等级分层：支行" key="2" disabled>-->
<!--      <khjbfctj-zh-modal></khjbfctj-zh-modal>-->
<!--    </a-tab-pane>-->
<!--    <a-tab-pane loading="true" tab="等级分层：客户经理" key="3" disabled>-->
<!--      <khjbfctj-khjl-modal></khjbfctj-khjl-modal>-->
<!--    </a-tab-pane>-->
<!--  </a-tabs>-->
</template>

<script>
  import KhjbfctjModal from './modules/KhjbfctjModal'
  import KhjbfctjZhModal from './modules/KhjbfctjZhModal'
  import KhjbfctjKhjlModal from './modules/KhjbfctjKhjlModal'

  export default {
    name: 'KhjbfctjList',
    components: {
      KhjbfctjModal, KhjbfctjZhModal, KhjbfctjKhjlModal
    },
  }
</script>