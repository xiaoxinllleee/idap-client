<template>
  <div class="footer">
    <div class="links">
<!--
      <a href="http://www.hnran.com" target="_blank"> 首页</a>
-->
    <!--  <a href="" target="_blank">
        <a-icon type="github"/>
      </a>-->
<!--
      <a href="https://ant.design/">Ant Design</a>
-->
<!--
      <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/">Vue Antd</a>
-->
    </div>
    <div class="copyright">
      HnRan
      <a-icon type="copyright"/>
      2019 <span>湖南融安信息技术有限公司 出品  {{version}}</span>
    </div>
  </div>
</template>

<script>
 import { getAction } from '@/api/manage'

  export default {
    name: "LayoutFooter",
    data() {
      return {
        bbh: '',
        version:'',
        url: {
          getlatestversion: '/workplace/getlatestversion'
          }
        }
    },
    created(){
      this.getLatestVersion()
    },
    methods:{
      getLatestVersion(){
          getAction(this.url.getlatestversion).then((res)=>{
            if (res.result != undefined && res.result != ''){
              this.version = res.result
            }
          }).catch(()=>{
            this.version = ''
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .footer {
    padding: 0 16px;
    margin: 24px 0 12px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>