import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 直接from文件夹的话会默认引入index文件
import toast from 'components/common/toast'

// 安装toast插件，use方法会调用toast中的install方法
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载的插件
Vue.use(VueLazyLoad)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
