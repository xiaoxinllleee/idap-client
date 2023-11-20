<template>
  <div>
    <a-drawer
      title="员工信息"
      placement="right"
      :width="720"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <p>我要疯了</p>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      queryParam:{},
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);

    },
    showDrawer() {
      alert(888);
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>