import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App'
import router from './router/router'
import lang_zh from './common/lang/zh'
import lang_en from './common/lang/en'
import languageJson from './common/lang/langconfig'
import store from './store/'
//import * as func from './store/function';
import './plugins/rem'
//微信插件的调用
import { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(VueI18n)
//获取语言设置
if (languageJson.language === 'zh') {
  var langType = 'zh-CN'
} else {
  var langType = 'en-US'
}
const i18n = new VueI18n({
  locale: langType, // 语言标识
  messages: {
    'zh-CN': lang_zh,
    'en-US': lang_en // 英文语言包
  }
});
// console.log(i18n._vm._data.locale)//获取当前语言设置
//点击事件的300秒延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
