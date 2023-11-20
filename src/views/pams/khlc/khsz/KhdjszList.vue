<template>
  <a-tabs defaultActiveKey="1" type="card" tab-position="left">
    <a-tab-pane loading="true" tab="按量计酬-岗位" key="1">
      <ErpAssessAljcListGw/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="按量计酬-机构" key="2">
      <ErpAssessAljcListJg/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ErpAssessAljcListGw from './ErpAssessAljcListGw'
import ErpAssessAljcListJg from './ErpAssessAljcListJg'


export default {
  name: "KhfzszList",
  mixins: [ JeecgListMixin ],
  components: { ErpAssessAljcListGw, ErpAssessAljcListJg },
  methods: {
  }
}
</script>

<style scoped>

</style>