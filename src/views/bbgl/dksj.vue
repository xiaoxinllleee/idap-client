<template>

  <iframe  :id="id" :src="url" frameborder="0" width="100%" height="850px" scrolling="auto"></iframe>

</template>

<script>
  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"

  export default {
    name: "bb1",
    inject:['closeCurrent'],
    data () {
      return {
        url: "",
        id:""
      }
    },
    created () {
      this.goUrl()
    },
    updated () {
      this.goUrl()
    },
    watch: {
      $route(to, from) {
        this.goUrl();
      }
    },
    methods: {
      goUrl () {
        let url = '/reportJsp/showReport.jsp?rpx=张家界报表/贷款数据曲线图.rpx'
        console.log("------url11------"+url)
        let id = this.$route.path
        this.id = id
        if (url.indexOf('http') === -1 || url.indexOf('https') === -1) {
          url = window._CONFIG['domianURL'] + url
        }
        //url = "http://www.baidu.com"
        console.log("------url22------"+url)
        if (url !== null && url !== undefined) {
          this.url = url;
          /*update_begin author:wuxianquan date:20190908 for:判断打开方式，新窗口打开时this.$route.meta.internalOrExternal==true */
          if(this.$route.meta.internalOrExternal != undefined && this.$route.meta.internalOrExternal==true){
            this.closeCurrent();
            //??url??token
            let tokenStr = "${token}";
            if(url.indexOf(tokenStr)!=-1){
              let token = Vue.ls.get(ACCESS_TOKEN);
              this.url = url.replace(tokenStr,token);
            }
            window.open(this.url);
          }
          /*update_end author:wuxianquan date:20190908 for:判断打开方式，新窗口打开时this.$route.meta.internalOrExternal==true */

        }
      }
    }
  }
</script>

<style>
</style>