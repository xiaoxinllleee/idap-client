<template>
  <div class="logo">
    <a-dropdown>
      <span style="height: 46px;line-height: 46px;display:inline-block;width:200px;">
        <router-link :to="{name:'dashboard'}">

          <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
          <img v-if="navTheme === 'dark'" src="~@/assets/logo-white.png" alt="logo" style="padding-left: 24px;">
          <img v-else src="~@/assets/logo.svg" alt="logo" style="padding-left: 24px;">
          <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->

          <h1 v-if="showTitle">{{ logoTitle }}</h1>
        </router-link>
        <!--<a-icon type="down"/>-->
      </span>
      <!--<a-menu slot="overlay" style="width:200px;">-->
        <!--<a-menu-item v-for="(item, index) in subSystemList" :key="index" @click="subSystemChange(item)">-->
          <!--<a href="javascript:;" >{{ item.xtmc }}</a>-->
        <!--</a-menu-item>-->
      <!--</a-menu>-->
    </a-dropdown>

  </div>
</template>

<script>
  import {mixin} from '@/utils/mixin.js'
  import store from '@/store/'

  export default {
    name: 'Logo',
    mixins: [mixin],
    props: {
      logoTitle: {
        type: String,
        default: 'UDAP',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    },
    created() {
    },
    data() {
      return {
        subSystemList: []
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  /*缩小首页布 局顶部的高度*/
  @height: 59px;

  .sider {
    box-shadow: none !important;

    .logo {
      height: @height !important;
      line-height: @height !important;
      box-shadow: none !important;
      transition: background 300ms;
      padding-left: 0px !important;

      a {
        color: white;

        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    &.light .logo {
      background-color: @primary-color;
    }
  }
</style>