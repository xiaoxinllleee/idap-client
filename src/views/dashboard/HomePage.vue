<template>
  <a-card>
    <page-layout>
      <div slot="headerContent">
        <div class="title" style="font-size: 20pt;">
          <img src="~@/assets/logo.svg" alt="logo" style="max-width: 80px; max-height: 80px">
          {{ timeFix }}，{{ nickname() }}！
        </div>
        <div style="padding-bottom: 5px; padding-left: 80px; font-size: 12pt; color: #0F1325">{{ this.orgName }} | {{ this.roleName }}</div>
      </div>
    </page-layout>
  </a-card>
</template>

<script>
  import {timeFix} from "@/utils/util"
  import {mapGetters} from "vuex";
  import PageLayout from '@/components/page/PageLayout'
  import HeadInfo from '@/components/tools/HeadInfo'
  import store from '@/store/'

  export default {
    name: "HomePage",
    components: {
      PageLayout,
      HeadInfo
      //store
    },
    data() {
      return {
        timeFix: timeFix(),
        roleName: '',
        orgName: '',
        rkrq: '',
      }
    },
    created() {
      this.init()
    },
    methods: {
      ...mapGetters(["nickname", "welcome", "orgCode"]),

      init() {
        this.$http.get('/workplace/getUserRoleNameAndOrgName').then((res) => {
          if (res.success) {
            this.roleName = res.result.roleName
            this.orgName = res.result.orgName
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>