import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import fly from './utils/request'


Vue.config.productionTip = false

App.mpType = 'app' // 当前组件类型为应用
Vue.prototype.$store = store
Vue.prototype.$fly = fly
Vue.prototype.$getRoute = function() {
  return this.$mp.query
}
const app = new Vue(App)
app.$mount()