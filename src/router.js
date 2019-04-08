import Vue from 'vue'
import Router from 'vue-router'
import Pin from './views/PinTuan.vue'
import Article from './views/Article.vue'
import Pk from './views/Pk.vue'
import Joinus from './views/Joinus.vue'
import Ads from './views/Ads.vue'
import BannerH5 from './views/BannerH5.vue'
import Activity from './views/Activity.vue'
import Secret from './views/Secret.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/webroot/',             //添加根目录
  routes: [
    {
      path: '/pin',
      name: 'pin',
      component: Pin
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/pk',
      name: 'pk',
      component: Pk
    },
    {
      path: '/joinus',
      name: 'joinus',
      component: Joinus
    },
    {
      path: '/ads',
      name: 'ads',
      component: Ads
    },
    {
      path: '/bannerH5',
      name: 'bannerH5',
      component: BannerH5
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
		{
		  path: '/secret',
		  name: 'secret',
		  component: Secret
		},
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
