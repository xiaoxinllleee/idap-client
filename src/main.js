/** init domain config */
import './config'

import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import ViewUI from 'view-design'
import i18n from '@/locale'
//import Icon from 'vue-awesome/components/Icon'
import router from './router'
import store from './store/'
import { VueAxios } from "@/utils/request"
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import 'ant-design-vue/dist/antd.less';  // or 'ant-design-vue/dist/antd.less'
import dataV from '@jiaminghi/data-view'
import '@/permission' // permission control
import '@/utils/filter' // base filter
import idcard from '@/api/idcardCheck'
import Print from 'vue-print-nb-jeecg'
import JModal from '@/views/jeecg/JModal/index'
import VCharts from 'v-charts-v2'
import SignCanvas from 'sign-canvas';
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import HighchartsVue from "highcharts-vue";

Highcharts3d(Highcharts);
Vue.use(HighchartsVue);

import vGallery from 'v-gallery'
Vue.use(vGallery)

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.use(SignCanvas);
//Vue.component('icon', Icon);

require('@jeecg/antd-online-214')
require('@jeecg/antd-online-214/dist/OnlineForm.css')
/*
import fullCalendar from 'vue-fullcalendar'
*/
/*import '@babel/polyfill'*/
import VueApexCharts from 'vue-apexcharts'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
// import "@jeecg/antd-online"
// import '@jeecg/antd-online/dist/OnlineForm.css'
import 'view-design/dist/styles/iview.css';
import './assets/scss/style.scss'

import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_PAGE
} from "@/store/mutation-types"
import config from '@/defaultSettings'

import JDictSelectTag from './components/dict/index.js'
import hasPermission from '@/utils/hasPermission'
import vueBus from '@/utils/vueBus';
import JeecgComponents from '@/components/jeecg/index'
// import BaiduMap from 'vue-baidu-map'
import formCreate, {maker} from '@form-create/iview4'
/*import iView from 'iview';
Vue.use(iView)*/

//获取生成器
//import formCreate from '@form-create/element-ui';
Vue.use(VCharts)
Vue.use(idcard)
Vue.use(JModal)
Vue.use(formCreate)
Vue.config.productionTip = false
Vue.use(Storage, config.storageOptions)
Vue.use(Antd)
Vue.use(VueAxios, router)
Vue.use(Viser)
Vue.use(hasPermission)
Vue.use(JDictSelectTag)
Vue.use(Print)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(preview)
Vue.use(vueBus);
Vue.use(JeecgComponents);
Vue.use(dataV);
// Vue.use(BaiduMap, {
//   ak: 'Kx4kgzyIuH3RkkWC7dqGUFuzYP59DFkc'
// });
/*
Vue.use(fullCalendar);
*/


new Vue({
  router,
  store,
  i18n,
  mounted () {
    // store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
    store.commit('SET_SIDEBAR_TYPE', true)
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
    store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout))
    store.commit('TOGGLE_FIXED_HEADER', Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
    // store.commit('TOGGLE_FIXED_SIDERBAR', Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar))
    store.commit('TOGGLE_FIXED_SIDERBAR', true)
    store.commit('TOGGLE_CONTENT_WIDTH', Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth))
    store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader))
    store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
    store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
    store.commit('SET_MULTI_PAGE',Vue.ls.get(DEFAULT_MULTI_PAGE,config.multipage))
  },
  render: h => h(App)
}).$mount('#app')
