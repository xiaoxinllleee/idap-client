/** init domain config */
import Vue from 'vue'
//设置全局API_BASE_URL
Vue.prototype.API_BASE_URL = process.env.VUE_APP_API_BASE_URL
Vue.prototype.API_KKVIEW_URL = process.env.VUE_APP_API_KKVIEW_URL
Vue.prototype.API_BASE_TITLE=process.env.VUE_APP_API_BASE_TITLE
window._CONFIG['domianURL'] = Vue.prototype.API_BASE_URL
window._CONFIG['onlinePreviewDomainURL'] =  process.env.VUE_APP_ONLINE_BASE_URL
//单点登录地址
window._CONFIG['casPrefixUrl'] = process.env.VUE_APP_CAS_BASE_URL
window._CONFIG['kkFileViewURL'] = Vue.prototype.API_KKVIEW_URL+'/onlinePreview'
window._CONFIG['imgDomainURL'] = Vue.prototype.API_BASE_URL + '/sys/common/view'
window._CONFIG['staticDomainURL'] = Vue.prototype.API_BASE_URL +'/sys/common/static'
window._CONFIG['downloadJmWJDomainURL'] = Vue.prototype.API_BASE_URL +'/sys/common/downLoadJmWj'
window._CONFIG['downloadDomainURL'] = Vue.prototype.API_BASE_URL + '/sys/common/download'
window._CONFIG['pdfDomainURL'] =  Vue.prototype.API_BASE_URL + '/sys/common/pdf/pdfPreviewIframe'
window._CONFIG['title'] = Vue.prototype.API_BASE_TITLE


