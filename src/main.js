import { Swipe, SwipeItem } from 'vue-swipe'
import Vue from 'vue'
import App from './App.vue'
import api from './api/httpJs'
import router from './router'
import store from './store'
import './assets/css/default.styl'

require('vue-swipe/dist/vue-swipe.css')

Vue.prototype.$get = api._get
Vue.prototype.$delete = api._delete
Vue.prototype.$post = api._post
Vue.prototype.$put = api._put

Vue.config.productionTip = false
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
