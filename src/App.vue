<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>
<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import enquireScreen from '@/utils/device'

  export default {
    data () {
      return {
        locale: zhCN,
      }
    },
    created () {
      let that = this
      enquireScreen(deviceType => {
        // tablet
        if (deviceType === 0) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        // mobile
        else if (deviceType === 1) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        else {
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
          that.$store.dispatch('setSidebar', true)
        }

      })
    }
  }
</script>
<style>
  #app {
    height: 100%;
  }
  .ant-select-disabled .ant-select-selection{
    background-color: #f5f5f5 !important;
  }
  .ant-input-disabled{
    color:  rgba(0,0,0,.58) !important;
  }
  .ant-select-disabled .ant-select-selection--multiple .ant-select-selection__choice{
    color:  rgba(0,0,0,.58) !important;
  }
  .ant-radio-disabled{
    color:  rgba(0,0,0,.58) !important;
  }
  .ant-radio-disabled + span{
    color:  rgba(0,0,0,.58) !important;
  }
  .ant-input-number-disabled .ant-input-number-input {
    color:  rgba(0,0,0,.58) !important;
  }
  .input-table .tbody .td input[data-v-2f0c1ef1]:disabled{
    color:  rgba(0,0,0,.58) !important;
  }
  .main .ant-card-body {
    padding: 12px;
  }
</style>