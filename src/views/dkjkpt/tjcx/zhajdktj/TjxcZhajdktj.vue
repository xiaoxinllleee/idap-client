<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="支行按揭贷款统计(月报)" key="1">
      <zhajdktj-yb-list />
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行按揭贷款统计(年报)" key="2">
      <zhajdktj-nb-list />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import ZhajdktjYbList from "./modules/ZhajdktjYbList";
import ZhajdktjNbList from "./modules/ZhajdktjNbList";

export default {
  name: "Dkjkpt_Tjxc_Zhajdktj",
  components: {ZhajdktjYbList, ZhajdktjNbList},
  methods: {}
}
</script>

<style scoped>

</style>