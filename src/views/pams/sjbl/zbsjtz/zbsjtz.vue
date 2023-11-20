<template>
  <a-tabs defaultActiveKey="1" type="card" tab-position="left">
    <a-tab-pane loading="true" tab="机构数据调整" key="1">
      <erp-assess-sjx-data-tz-jg-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="岗位数据调整" key="2">
      <erp-assess-sjx-data-tz-gw-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ErpAssessSjxDataTzJgList from './modules/ErpAssessSjxDataTzJgList'
  import ErpAssessSjxDataTzGwList from './modules/ErpAssessSjxDataTzGwList'

  export default {
    name: "FarwszList",
    mixins: [ JeecgListMixin ],
    components: { ErpAssessSjxDataTzJgList,ErpAssessSjxDataTzGwList },
    methods: {
    }
  }
</script>

<style scoped>

</style>