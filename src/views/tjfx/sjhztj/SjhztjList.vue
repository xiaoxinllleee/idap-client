<template>
  <a-tabs defaultActiveKey='1'>
    <a-tab-pane loading='true' tab='客户经理汇总统计' key='1'>
      <v-tjfx-hztj-khjl-list />
    </a-tab-pane>
    <a-tab-pane loading='true' tab='支行汇总统计' key='2'>
      <v-tjfx-hztj-zh-list />
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import VTjfxHztjKhjlList from '@views/tjfx/sjhztj/khjlhztj/VTjfxHztjKhjlList'
import VTjfxHztjZhList from '@views/tjfx/sjhztj/zhhztj/VTjfxHztjZhList'

export default {
  name: 'TpcfsctjList',
  mixins: [JeecgListMixin],
  components: { VTjfxHztjKhjlList, VTjfxHztjZhList },
  methods: {}
}
</script>

<style scoped>

</style>