<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane loading="true" tab="已制定计划台账" key="1">
     <dkjkpt-zdjhtz-list></dkjkpt-zdjhtz-list>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="已制定计划台账导入" key="2">
     <dkjkpt-zdjhtzdr-list></dkjkpt-zdjhtzdr-list>
    </a-tab-pane>

  </a-tabs>

</template>

<script>

  import DkjkptZdjhtzList from './modules/DkjkptZdjhtzList'
  import DkjkptZdjhtzdrList from './modules/DkjkptZdjhtzdrList'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'


  export default {
    name: "Fxgljc",
    mixins:[JeecgListMixin],
    components: {
      DkjkptZdjhtzList,DkjkptZdjhtzdrList
    },
    methods: {

    }
  }
</script>
