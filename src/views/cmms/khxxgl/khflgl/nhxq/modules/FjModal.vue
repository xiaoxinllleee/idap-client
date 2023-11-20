<template>
  <a-modal :title="title"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleCancel"
           @cancel="handleCancel"
           cancelText="关闭">

    <!--客户管理\农户信息管理\新增农户信息-->
      <img :src="src" width="500">

  </a-modal>


</template>

<script>
import pick from 'lodash.pick'
import moment from 'moment'

export default {
  name: "JcxxpyModal",
  components: {
  },
  data () {
    return {
      confirmLoading: false,
      title:"图片",
      visible: false,
      model: {},
      src: {},
    }
  },
  created () {
  },
  methods: {
    view(record){
      this.model = record
      this.src = window._CONFIG['staticDomainURL'] + '/' + record.fwlj
      this.visible = true
    },
    close () {
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },


  }
}
</script>

<style scoped>

</style>