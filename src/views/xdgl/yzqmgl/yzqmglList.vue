<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="部门印章管理" key="1">
      <sys-department-sign-list />
    </a-tab-pane>
    <a-tab-pane loading="true" tab="用户签名管理" key="2">
      <sys-user-sign-list />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SysDepartmentSignList from '@views/xdgl/yzqmgl/modules/SysDepartmentSignList'
  import SysUserSignList from '@views/xdgl/yzqmgl/modules/SysUserSignList'

  export default {
    name: "yzqmglList",
    mixins: [ JeecgListMixin ],
    components: {SysDepartmentSignList,SysUserSignList},
  }
</script>

<style scoped>

</style>