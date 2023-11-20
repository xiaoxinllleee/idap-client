<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="农户设置" key="1">
      <yxzfgzsz-nh-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="商户设置" key="2">
      <yxzfgzsz-sh-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="公职人员设置" key="3">
      <yxzfgzsz-gzry-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="精准营销设置" key="4">
      <jzyxzbpz-nh-list/>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="新型农业主体设置" key="5">
      <tjfx-xxnyzt-yxzfzbsz-list />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import YxzfgzszNhList from './modules/YxzfgzszNhList'
import YxzfgzszShList from './modules/YxzfgzszShList'
import YxzfgzszGzryList from "./modules/YxzfgzszGzryList";
import JzyxzbpzNhList from "./modules/TjfxJzyxzbpzNhList"
import TjfxXxnyztYxzfzbszList from './modules/TjfxXxnyztYxzfzbszList'

export default {
  name: "YxzfgzszList",
  mixins: [JeecgListMixin],
  components: {YxzfgzszNhList, YxzfgzszShList,YxzfgzszGzryList,JzyxzbpzNhList,TjfxXxnyztYxzfzbszList},
  methods: {}
}
</script>

<style scoped>

</style>