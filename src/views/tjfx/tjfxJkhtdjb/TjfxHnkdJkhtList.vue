<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="评议情况统计" key="1">
      <tjfx-pyqktj-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="惠农快贷白名单" key="2">
      <tjfx-hnkd-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="借款合同登记簿" key="3">
      <tjfx-jkhtdjb-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import TjfxJkhtdjbList from './modules/TjfxJkhtdjbList'
import TjfxHnkdList from './modules/TjfxHnkdList'
import TjfxPyqktjList from './modules/TjfxPyqktjList'


export default {
  name: "YxzfgzszList",
  mixins: [JeecgListMixin],
  components: {TjfxJkhtdjbList,TjfxHnkdList,TjfxPyqktjList},
  methods: {}
}
</script>

<style scoped>

</style>