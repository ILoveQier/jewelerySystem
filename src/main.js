import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

App.mpType = 'app' // 当前组件类型为应用
Vue.prototype.$getRoute = function() {
  return this.$mp.query
}
const app = new Vue(App)
app.$mount()