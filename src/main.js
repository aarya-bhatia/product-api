import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$api = "https://social-app-1-dbb91.web.app/api/"

new Vue({
  beforeCreate(){
    console.log(this.$api)
  },
  render: h => h(App),
}).$mount('#app')
