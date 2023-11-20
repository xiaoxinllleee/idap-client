<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="网格统计" key="1">
      <bkbpytj-modal/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行统计" key="2">
      <bkbpytj-zh-modal/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import BkbpytjModal from './modules/BkbpytjModal'
  import BkbpytjZhModal from './modules/BkbpytjZhModal'

  export default {
    name: "BkbpytjList",
    mixins: [ JeecgListMixin ],
    components: { BkbpytjModal, BkbpytjZhModal },
    methods: {
    }
  }
</script>

<style scoped>

</style>