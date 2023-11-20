import Vue from 'vue'
import { USER_INFO,IS_ROOT,SUB_SYSTEM_LIST,QYBM ,YWJGDM,ZDRKRQ} from "@/store/mutation-types"
const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => {state.user.avatar = Vue.ls.get(USER_INFO).avatar; return state.user.avatar},
  username: state => state.user.username,
  nickname: state => {state.user.realname = Vue.ls.get(USER_INFO).realname; return state.user.realname},
  welcome: state => state.user.welcome,
  permissionList: state => state.user.permissionList,
  subSystemList: state => {state.user.subSystemList = Vue.ls.get(SUB_SYSTEM_LIST); return state.user.subSystemList},
  userInfo: state => {state.user.info = Vue.ls.get(USER_INFO); return state.user.info},
  addRouters: state => state.permission.addRouters,
  orgCode: state => {state.user.info = Vue.ls.get(USER_INFO); return state.user.info.orgCode},
  ywjgdm: state => {state.ywjgdm = Vue.ls.get(YWJGDM); return state.ywjgdm},
  isRoot: state => {state.user.isRoot = Vue.ls.get(IS_ROOT); return state.user.isRoot},
  qybm: state => {state.user.qybm = Vue.ls.get(QYBM); return state.user.qybm},
  zdrkrq: state => {state.user.zdrkrq = Vue.ls.get(ZDRKRQ); return state.user.zdrkrq},
}

export default getters