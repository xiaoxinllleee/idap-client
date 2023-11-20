<template>
  <a-tabs default-active-key="1">
    <a-tab-pane loading="true" tab="个人碳积分获取" key="1">
      <grtjf-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="个人碳积分兑换" key="2">
      <khxxgl-grtjf-dh-list />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import GrtjfList from "./modules/GrtjfList";
import KhxxglGrtjfDhList from "./modules/KhxxglGrtjfDhList";

export default {
  name: "Tjf",
  components: {GrtjfList,KhxxglGrtjfDhList},
  methods: {
  }
}
</script>

<style scoped>

</style>