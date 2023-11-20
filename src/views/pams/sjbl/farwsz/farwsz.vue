<template>
  <a-tabs defaultActiveKey="1" type="card" tab-position="left">
    <a-tab-pane loading="true" tab="机构任务设置" key="1">
      <erp-assess-taskset-jg-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="岗位任务设置" key="2">
      <erp-assess-taskset-gw-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ErpAssessTasksetJgList from './modules/ErpAssessTasksetJgList'
  import ErpAssessTasksetGwList from './modules/ErpAssessTasksetGwList'

  export default {
    name: "FarwszList",
    mixins: [ JeecgListMixin ],
    components: { ErpAssessTasksetJgList,ErpAssessTasksetGwList },
    methods: {
    }
  }
</script>

<style scoped>

</style>