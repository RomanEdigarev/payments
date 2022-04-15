import '@babel/polyfill';
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from '@/store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import './assets/css/main.scss'


Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
