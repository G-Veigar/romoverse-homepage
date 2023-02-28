import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
// import MintPage from '../views/MintPage.vue';
import MintPageWuJing from '../views/MintPageWuJing.vue';

// import MintPageDev from '../views/MintPageDev.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MintPageWuJing,
  },
  // {
  //   path: '/dev',
  //   name: 'dev',
  //   component: MintPageDev,
  // },
  // {
  //   path: '/mint',
  //   name: 'mint',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "mint" */ '../views/MintPage.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
