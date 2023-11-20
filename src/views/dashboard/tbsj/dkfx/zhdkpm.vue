<template>
  <rank-list title="支行贷款排名TOP5" :list="mylist" style="width: 600px;margin: 0 auto;"/>
</template>

<script type="text/babel">
  import RankList from '@/components/chart/RankList'
  import { getAction } from '@/api/manage'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      RankList
    },
    data() {
      return {
        mylist:[ ]
      }
    },

    created() {
      this.initDictConfig();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      // 图表初始化数据
      initDictConfig() {
        getAction("/tjfx/zhckshmx/zhcksjmx/getdkpm",{zzbz:this.orgCode()}).then(res=>{
          if(res.success){
            this.mylist =res.result
          }
        });
      },
    },

  }


</script>
<!-- 引入 vintage 主题 -->

<style lang="less" type="text/less" rel="stylesheet/less" scoped>

</style>