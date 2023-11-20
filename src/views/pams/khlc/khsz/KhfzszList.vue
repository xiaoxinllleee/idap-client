<template>
  <a-tabs defaultActiveKey="1" type="card" tab-position="left">
    <a-tab-pane loading="true" tab="平衡计分卡-机构" key="1">
      <ErpAssessPhjfkListJg/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="平衡计分卡-岗位" key="2">
      <ErpAssessPhjfkListGw/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ErpAssessPhjfkListGw from './ErpAssessPhjfkListGw'
import ErpAssessPhjfkListJg from './ErpAssessPhjfkListJg'

export default {
  name: "KhdjszList",
  mixins: [ JeecgListMixin ],
  components: { ErpAssessPhjfkListGw, ErpAssessPhjfkListJg },
  methods: {
  }
}
</script>

<style scoped>

</style>
