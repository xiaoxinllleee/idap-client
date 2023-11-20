<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="支行费用分配" key="1">
      <ZhfyfpHzList/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行费用分配-明细" key="2">
      <ZhfyfpMxList/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行费用分配-取数设置" key="3">
      <ZhfyfpFytqList/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ZhfyfpHzList from './ZhfyfpHzList'
import ZhfyfpMxList from './ZhfyfpMxList'
import ZhfyfpFytqList from './ZhfyfpFytqList'


export default {
  name: "ZhfyfpList",
  mixins: [ JeecgListMixin ],
  components: { ZhfyfpHzList, ZhfyfpMxList,ZhfyfpFytqList },
  methods: {
  }
}
</script>

<style scoped>

</style>