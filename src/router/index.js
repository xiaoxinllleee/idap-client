import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

//update-begin-author:taoyan date:20191011 for:TASK #3214 【优化】访问online功能测试 浏览器控制台抛出异常
/*try {
  const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
} catch (e) {
}*/

/*try {
  //push  2022/5/19
  const originalPush = Router.prototype.push
  Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
  }

// replace  2022/5/19
  const originalReplace = Router.prototype.replace
  Router.prototype.replace= function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
  }
} catch (e) {
}*/


//update-end-author:taoyan date:20191011 for:TASK #3214 【优化】访问online功能测试 浏览器控制台抛出异常

Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})