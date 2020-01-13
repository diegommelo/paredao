import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import VueLodash from 'vue-lodash'
import VueCarousel from 'vue-carousel'
import {rtdbPlugin} from 'vuefire'
import 'buefy/dist/buefy.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(rtdbPlugin)
Vue.use(Buefy, VueLodash, VueCarousel)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
