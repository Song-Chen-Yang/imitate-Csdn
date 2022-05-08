import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import animated from 'animate.css'
import store from './store/index'
import VueResource from 'vue-resource'
import requests from './axios/request'
import dayjs from 'dayjs'
import axios from 'axios'

Vue.prototype.dayjs = dayjs
Vue.prototype.$http = requests
Vue.prototype.$axios = axios
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(animated)
Vue.use(Antd)
Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
