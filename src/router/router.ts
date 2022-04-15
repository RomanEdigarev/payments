import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/cash-transactions/:child?',
    name: 'CashTransactions',
    component: () => import('@/views/cash-transactions/CashTransactions.vue'),
    children: [
      {
        path: 'cash-operations',
        name: "CashOperations",
        component: () => import('@/views/cash-transactions/cash-operations/CashOperations.vue')
      },
      {
        path: 'cash-shifts',
        name: "CashShifts",
        component: () => import('@/views/cash-transactions/cash-shifts/CashShifts.vue')
      },
      {
        path: 'cash-directory',
        name: "CashDirectory",
        component: () => import('@/views/cash-transactions/cash-directory/CashDirectory.vue')
      },
      {
        path: 'cash-constants',
        name: "CashConstants",
        component: () => import('@/views/cash-transactions/cash-constants/CashConstants.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
