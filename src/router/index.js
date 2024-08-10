import { createRouter, createWebHistory } from 'vue-router';
import ImageHome from '@/views/ImageHome.vue';
import ImageDetail from '@/views/ImageDetail.vue';

const routes = [
  {
    path: '/',
    name: 'ImageHome',
    component: ImageHome,
  },
  {
    path: '/asset/:id',
    name: 'ImageDetail',
    component: ImageDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;