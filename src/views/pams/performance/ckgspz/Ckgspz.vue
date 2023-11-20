<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="存款客户归属规则配置" key="1">
      <ckkhgs-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="存款账号归属规则配置" key="2">
      <ckzhgs-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import CkkhgsList from './modules/CkkhgsList'
  import CkzhgsList from './modules/CkzhgsList'

  export default {
    name: "Ckgspz",
    mixins: [ JeecgListMixin ],
    components: { CkkhgsList,CkzhgsList },
    methods: {
    }
  }
</script>

<style scoped>

</style>