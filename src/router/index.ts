import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { clearPending } from "@/utils/request"


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

router.beforeEach((to, from, next) => {
  //在跳转路由之前，先清除所有的请求
  clearPending()
  // ...
  next()
})

export default router