import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes ,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router