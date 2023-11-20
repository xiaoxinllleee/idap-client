<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="评级授信统计报表" key="1">
      <pjsxtjbb-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="支行评级授信统计报表" key="2">
      <zh-pjsxtjbb-list/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import PjsxtjbbList from './modules/PjsxtjbbList'
  import ZhPjsxtjbbList from './modules/ZhPjsxtjbbList'

  export default {
    name: "PjsxtjList",
    mixins: [ JeecgListMixin ],
    components: { PjsxtjbbList,ZhPjsxtjbbList },
    methods: {
    }
  }
</script>

<style scoped>

</style>