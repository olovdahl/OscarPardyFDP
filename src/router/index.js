// Composables
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";



const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        meta: { requiresAuth: true },

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    
  },
  {
    path: '/boards/:id',
    name: 'Board',
    props: true,
    meta: { requiresAuth: true },
    component: () => import('@/views/JeopardyBoard.vue'),
  },
  {
    path:'/createboard',
    name: 'CreateBoard',
    meta: { requiresAuth: true },
    component: () => import('@/views/CreateBoard.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.getters.jwtToken) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;