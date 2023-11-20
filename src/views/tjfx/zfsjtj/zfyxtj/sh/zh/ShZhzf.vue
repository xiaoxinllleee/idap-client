<template>
  <div>
    <a-radio-group name="radioGroup" default-value="1" @change="radioChange" style="margin: 10px">
      <a-radio value="1">
        通过客户汇总统计
      </a-radio>
      <a-radio value="2">
        通过客户经理汇总统计
      </a-radio>
    </a-radio-group>
    <a-tabs defaultActiveKey="1" tab-position="left" type="card">
      <a-tab-pane loading="true" tab="支行走访(汇总)" key="1" forceRender>
        <zhzf-hz-list :hzfs="radioValue"/>
      </a-tab-pane>
      <a-tab-pane loading="true" tab="支行走访(日报)" key="2" forceRender>
        <zhzf-rb-list :hzfs="radioValue"/>
      </a-tab-pane>
      <a-tab-pane loading="true" tab="支行走访(月报)" key="3" forceRender>
        <zhzf-yb-list :hzfs="radioValue"/>
      </a-tab-pane>
      <a-tab-pane loading="true" tab="支行走访(季报)" key="4" forceRender>
        <zhzf-jb-list :hzfs="radioValue"/>
      </a-tab-pane>
      <a-tab-pane loading="true" tab="支行走访(年报)" key="5" forceRender>
        <zhzf-nb-list :hzfs="radioValue"/>
      </a-tab-pane>
      <a-tab-pane loading="true" tab="支行走访(累计)" key="6" forceRender>
        <zhzf-lj-list :hzfs="radioValue"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import ZhzfRbList from './modules/ZhzfRbList'
   import ZhzfYbList from './modules/ZhzfYbList'
   import ZhzfJbList from './modules/ZhzfJbList'
   import ZhzfNbList from './modules/ZhzfNbList'
   import ZhzfHzList from './modules/ZhzfHzList'
   import ZhzfLjList from './modules/ZhzfLjList'

  export default {
    name: "tjfx_zfyxtj_zh",
    components: { ZhzfRbList,ZhzfYbList,ZhzfJbList,ZhzfNbList,ZhzfHzList, ZhzfLjList},
    data() {
      return {
        radioValue: '1',
      }
    },
    methods: {
      radioChange(e) {
        console.log('radioChange',e)
        this.radioValue = e.target.value
      },
    }
  }
</script>

<style scoped>

</style>