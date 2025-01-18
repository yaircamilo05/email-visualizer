import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/App.vue'),
  },
  {
    path: '/index-form',
    name: 'index-form',
    component: () => import('../components/IndexForm.vue'),
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: () => import('../views/Inbox.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;