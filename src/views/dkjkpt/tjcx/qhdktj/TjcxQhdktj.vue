<template>
  <a-tabs :default-active-key=key>
    <a-tab-pane loading="true" tab="全行贷款统计(旬报)" key="1" v-if="qybm!='110'">
      <qhbndktj-xb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="全行贷款统计(月报)" key="2">
      <qhbndktj-yb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="全行贷款统计(年报)" key="3">
      <qhbndktj-nb-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import QhbndktjXbList from './mudules/QhbndktjXbList'
  import QhbndktjYbList from './mudules/QhbndktjYbList'
  import QhbndktjNbList from './mudules/QhbndktjNbList'
  import store from '@/store'

  export default {
    name: "Dkjkpt_Tjcx_Qhdktj",
    mixins: [JeecgListMixin],
    components: { QhbndktjXbList, QhbndktjYbList, QhbndktjNbList },
    data() {
    return {
      qybm:'',
      key:'',
      }
    },
    created () {
      this.qybm = store.getters.qybm
      console.log(this.qybm)
      if (this.qybm=='110'){
        this.key='2'
      }else {
        this.key='1'
      }
    },
    methods: {},
  }
</script>

<style scoped>
</style>