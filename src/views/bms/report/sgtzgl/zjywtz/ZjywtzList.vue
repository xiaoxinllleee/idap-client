<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="存放业务明细" key="1">
      <sgtzgl-cfywmxb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="回购业务明细" key="2">
      <sgtzgl-hgywmxb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="投资同业存单持有情况" key="3">
      <sgtzgl-tztycdcyqkb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="债券汇总登记簿" key="4">
      <sgtzgl-zqhzdjb-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SgtzglCfywmxbList from './modules/SgtzglCfywmxbList'
  import SgtzglHgywmxbList from './modules/SgtzglHgywmxbList'
  import SgtzglTztycdcyqkbList from './modules/SgtzglTztycdcyqkbList'
  import SgtzglZqhzdjbList from './modules/SgtzglZqhzdjbList'

  export default {
    name: "ZjywtzList",
    mixins: [ JeecgListMixin ],
    components: { SgtzglCfywmxbList,SgtzglHgywmxbList,SgtzglTztycdcyqkbList,SgtzglZqhzdjbList },
    methods: {
    }
  }
</script>

<style scoped>

</style>