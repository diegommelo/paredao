import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import VueLodash from 'vue-lodash'
import VueCarousel from 'vue-carousel'
import VueHead from 'vue-head'
import VueAnalytics from 'vue-analytics'
import {rtdbPlugin} from 'vuefire'
import { VLazyImagePlugin } from "v-lazy-image";
import 'buefy/dist/buefy.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(rtdbPlugin)
Vue.use(VLazyImagePlugin)
Vue.use(VueHead)
Vue.use(VueAnalytics, {
  id:'UA-37628257-4',
  router
})
Vue.use(Buefy, VueLodash, VueCarousel)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
