<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="网格统计" key="1">
      <WgpyqktjModal/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行统计" key="2">
      <ZhpyqktjModal/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import WgpyqktjModal from '@views/tjfx/bkbpysjtj/bkbpyqjtjHB/modules/WgpyqktjModal'
  import ZhpyqktjModal from '@views/tjfx/bkbpysjtj/bkbpyqjtjHB/modules/ZhpyqktjModal'

  export default {
    name: "BkbpyqktjList",
    mixins: [ JeecgListMixin ],
    components: { WgpyqktjModal, ZhpyqktjModal },
    methods: {
    }
  }
</script>

<style scoped>

</style>