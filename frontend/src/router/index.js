import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from '@/views/MainComponent.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainComponent
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
