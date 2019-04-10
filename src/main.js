import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import '../node_modules/vant/lib/index.css'
import { Lazyload } from 'vant';
import md5 from 'js-md5';
import JsEncrypt from 'jsencrypt' //加密token
import http from './http/config';
import elementUI from 'element-ui'

// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(vant)
Vue.config.productionTip = false
Vue.prototype.$md5 = md5; //md5加密  在需要用到的文件中使用：this.$md5('holle') // bcecb35d0a12baad472fbe0392bcc043
Vue.prototype.$jsEncrypt = JsEncrypt //加密token
Vue.prototype.$http = http;
Vue.use(elementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
