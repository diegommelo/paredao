import Vue from 'vue'
import Router from 'vue-router'
import Paredao from './views/Main.vue'
import Config from './views/Config.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'paredao',
      meta: {
        title: 'Gerador de Paredões do BBB'
      },
      component: Paredao,
    },
    {
      path: '/personalizar',
      name: 'personalizar',
      meta: {
        title:'Personalizar Paredão do BBB',
      },
      component: Config
    }
    // {
    //   path: '/personalizar',
    //   name: 'personalizar',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
