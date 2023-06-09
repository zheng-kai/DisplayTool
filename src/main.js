// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodeMirror)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  render: h => h(App),
}).$mount('#app')
