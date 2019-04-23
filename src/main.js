import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly

Vue.config.productionTip = false

App.mpType = 'app' // 当前组件类型为应用
Vue.prototype.$store = store
Vue.prototype.$fly = fly
Vue.prototype.$getRoute = function () {
  return this.$mp.query
}
const app = new Vue(App)
app.$mount()