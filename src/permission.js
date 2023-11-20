import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN,SUB_SYSTEM_LIST } from '@/store/mutation-types'
import { generateIndexRouter } from "@/utils/util"


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login', '/user/register', '/user/register-result'
,'/user/alteration'
,'/user/bigc'
,'/user/dkywxx'
,'/user/gzjd'
,'/user/wgxx'
,'/user/wgxz'
,'/user/test'
] 
// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  console.log('router beforeEach', to, from, next)
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: '/dashboard/HomePage' })
      NProgress.done()
    } else {
      if (store.getters.permissionList.length === 0) {
        let subSystemId = ''
        let subSystemList = ''
        let sysList= Vue.ls.get(SUB_SYSTEM_LIST);
        if (sysList && sysList.length > 0) {
          subSystemId = sysList[0].id
          subSystemList = sysList.map(item=>item.id).join(',')
        }
        store.dispatch('GetPermissionList', subSystemId).then(res => {
          const menuData = res.result.menu;
          console.log('GetPermissionList', menuData)
          if (menuData === null || menuData === "" || menuData === undefined) {
            return;
          }
          let constRoutes = [];
          console.log('menuData',menuData)

          constRoutes = generateIndexRouter(menuData);
          // 添加主界面路由
          store.dispatch('UpdateAppRouter',  { constRoutes }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              //next({ path: redirect })
              next({ ...to, replace: true })
            }
          })
        })
          .catch(() => {
            /* notification.error({
               message: '系统提示',
               description: '请求用户信息失败，请重试！'
             })*/
            console.log(3333333333333333)
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          });
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(4444444444444)

      // 在免登录白名单，直接进入
      next()
    } else {
      console.log(55555555555555555)
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})