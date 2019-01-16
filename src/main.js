import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import VueLodash from 'vue-lodash'
import VueCarousel from 'vue-carousel'
import VueFire from 'vuefire'
import 'buefy/dist/buefy.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(Buefy, VueLodash, VueCarousel)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
