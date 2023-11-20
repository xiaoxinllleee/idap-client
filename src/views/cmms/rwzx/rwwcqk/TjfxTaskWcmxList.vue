<template>
  <a-tabs defaultActiveKey='1'>
    <a-tab-pane loading='true' tab='客户经理任务完成情况统计' key='1'>
      <tjfx-khjl-task-wcmx-ls-list v-if="qybm=='420'" />
      <tjfx-khjl-task-wcmx-list v-else />
    </a-tab-pane>
    <a-tab-pane loading='true' tab='支行任务完成情况统计' key='2'>
      <tjfx-zh-task-wcmx-ls-list v-if="qybm=='420'" />
      <tjfx-zh-task-wcmx-list v-else />
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import TjfxKhjlTaskWcmxList from '@views/cmms/rwzx/rwwcqk/modules/TjfxKhjlTaskWcmxList'
import TjfxZhTaskWcmxList from '@views/cmms/rwzx/rwwcqk/modules/TjfxZhTaskWcmxList'
import TjfxKhjlTaskWcmxLsList from '@views/cmms/rwzx/rwwcqk/modules/TjfxKhjlTaskWcmxLsList'
import TjfxZhTaskWcmxLsList from '@views/cmms/rwzx/rwwcqk/modules/TjfxZhTaskWcmxLsList'
import store from '@/store/'

export default {
  name: 'TpcfsctjList',
  mixins: [JeecgListMixin],
  components: { TjfxKhjlTaskWcmxList, TjfxZhTaskWcmxList,TjfxKhjlTaskWcmxLsList,TjfxZhTaskWcmxLsList},
  methods: {},
  data() {
    return {
      qybm:'',
    }
  },
  created() {
    this.qybm = store.getters.qybm
  }
}
</script>

<style scoped>

</style>