import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useUserStore} from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },{
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: { requiresAuth: true },
    },{
      path: '/dashboard/products/create',
      name: 'dashboard_products_create',
      component: () => import('../views/admin/product/Create.vue'),
      meta: { requiresAuth: true },
    },{
      path: '/dashboard/products/edit/:id',
      name: 'dashboard_products_edit',
      component: () => import('../views/admin/product/Edit.vue'),
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.getUser) next({ name: 'login' })
  else next()
})

export default router
