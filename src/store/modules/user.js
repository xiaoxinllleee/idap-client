import Vue from 'vue'
import { login, logout, phoneLogin,getLoginValidateRules} from "@/api/login"
import {
  ACCESS_TOKEN,
  USER_NAME,
  USER_INFO,
  USER_AUTH,
  SYS_BUTTON_AUTH,
  IS_ROOT,
  SUB_SYSTEM_LIST,
  SUB_SYSTEM_ID,
  YWJGDM,
  QYBM,
  ZDRKRQ
} from '@/store/mutation-types'
import { welcome } from "@/utils/util"
import { queryPermissionsByUser, queryAllPermissionsByUser, getUserSubSystemByToken } from '@/api/api'
import { getAction } from '@/api/manage'

const user = {
  state: {
    token: '',
    username: '',
    realname: '',
    welcome: '',
    avatar: '',
    permissionList: [],
    subSystemList: [],
    info: {},
    isRoot: false,
    qybm: '',
    ywjgdm:'',
    zdrkrq: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
    SET_SUBSYSTEMLIST: (state, subSystemList) => {
      state.subSystemList = subSystemList
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ISROOT: (state, isRoot) => {
      state.isRoot = isRoot
    },
    SET_YWJGDM: (state, ywjgdm) => {
      state.ywjgdm = ywjgdm
    },
    SET_QYBM: (state, qybm) => {
      state.qybm = qybm
    },
    SET_ZDRKRQ: (state,zdrkrq) => {
      state.zdrkrq = zdrkrq
    }
  },

  actions: {
    // CAS验证登录
    ValidateLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getAction("/cas/client/validateLogin",userInfo).then(response => {
          console.log("----cas 登录--------",response);
          if(response.success){
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(IS_ROOT, result.isRoot, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(QYBM, result.qybm, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(ZDRKRQ, result.zdrkrq, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
            commit('SET_AVATAR', userInfo.avatar)
            commit('SET_ISROOT', result.isRoot)
            commit('SET_QYBM', result.qybm)
            commit('SET_ZDRKRQ', result.zdrkrq)
            resolve(response)
          }else{
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if(response.code =='200'){

            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(IS_ROOT, result.isRoot, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(QYBM, result.qybm, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(YWJGDM, result.departs[0].ywjgdm, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(ZDRKRQ, result.zdrkrq, 7 * 24 * 60 * 60 * 1000)

            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
            commit('SET_AVATAR', userInfo.avatar)
            commit('SET_ISROOT', result.isRoot)
            commit('SET_QYBM', result.qybm)
            commit('SET_YWJGDM', result.departs[0].ywjgdm);
            commit('SET_ZDRKRQ', result.zdrkrq);

            resolve(response)
          }else{
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取密码验证规则
    getPasswordValidateRules() {
      return new Promise((resolve, reject) => {
        getLoginValidateRules().then(response => {
          if(response.code =='200'){
            resolve(response)
          }else{
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
          phoneLogin(userInfo).then(response => {
          if(response.code =='200'){
        const result = response.result
        const userInfo = result.userInfo
        Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
        Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
        Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
        Vue.ls.set(IS_ROOT, result.isRoot, 7 * 24 * 60 * 60 * 1000)
        commit('SET_TOKEN', result.token)
        commit('SET_INFO', userInfo)
        commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
        commit('SET_AVATAR', userInfo.avatar)
        commit('SET_ISROOT', result.isRoot)
        resolve(response)
      }else{
        reject(response)
      }
    }).catch(error => {
        reject(error)
      })
    })
    },
    GetUserSubSystemList({ commit }) {
      return new Promise((resolve, reject) => {
        let v_token = Vue.ls.get(ACCESS_TOKEN);
        let params = {token: v_token};
        getUserSubSystemByToken(params).then(response => {
          console.log('getUserSubSystemByToken', response)
          let subSystemList = response.result
          commit('SET_SUBSYSTEMLIST', subSystemList)
          Vue.ls.set(SUB_SYSTEM_LIST, subSystemList);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetPermissionList({ commit }, subSystemId) {
      return new Promise((resolve, reject) => {
        let v_token = Vue.ls.get(ACCESS_TOKEN);
        let sudId = Vue.ls.get(SUB_SYSTEM_ID);
        if (sudId != null){
          console.log("游览器访问菜单时当前subId",sudId)
          subSystemId = sudId;
        }
        let params = {token:v_token,subSystemId: subSystemId};
        queryPermissionsByUser(params).then(response => {
          const menuData = response.result.menu;
          const authData = response.result.auth;
          const allAuthData = response.result.allAuth;
          //Vue.ls.set(USER_AUTH,authData);
          sessionStorage.setItem(USER_AUTH,JSON.stringify(authData));
          sessionStorage.setItem(SYS_BUTTON_AUTH,JSON.stringify(allAuthData));
          if (menuData && menuData.length > 0) {
            //update--begin--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
            menuData.forEach((item, index) => {
              if (item["children"]) {
                let hasChildrenMenu = item["children"].filter((i) => {
                  return !i.hidden || i.hidden == false
                })
                if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
                  item["hidden"] = true
                }
              }
            })
            console.log(" menu show json ", menuData)
            //update--end--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
            commit('SET_PERMISSIONLIST', menuData)
          } else {


            reject('getPermissionList: permissions must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getAllPermissionList({commit}, params) {
      let subSystemList = params.subSystemList
      return new Promise((resolve, reject) => {
        let v_token = Vue.ls.get(ACCESS_TOKEN);
        let params = {token:v_token,subSystemList: subSystemList};
        queryAllPermissionsByUser(params).then(response => {
          const menuData = response.result.menu;
          if (menuData && menuData.length > 0) {
            //update--begin--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
            menuData.forEach((item, index) => {
              if (item["children"]) {
                let hasChildrenMenu = item["children"].filter((i) => {
                  return !i.hidden || i.hidden == false
                })
                if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
                  item["hidden"] = true
                }
              }
            })
            console.log(" menu show json ", menuData)
            //update--end--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
          } else {


            reject('getPermissionList: permissions must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONLIST', [])
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(SUB_SYSTEM_LIST)
        Vue.ls.remove(SUB_SYSTEM_ID)
        //console.log('logoutToken: '+ logoutToken)
        logout(logoutToken).then(() => {
          //var sevice = "http://"+window.location.host+"/";
          //var serviceUrl = encodeURIComponent(sevice);
          //window.location.href = window._CONFIG['casPrefixUrl']+"/logout?service="+serviceUrl;
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

  }
}

export default user