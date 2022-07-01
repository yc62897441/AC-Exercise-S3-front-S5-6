import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/application.css' // 仔入 CSS 檔

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
