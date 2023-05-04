import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue';
import UsersView from '../views/UsersView.vue';
import PiniaView from '../views/PiniaView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/register', component: RegisterView },
    { path: '/users', component: UsersView },
    { path: '/pinia', component: PiniaView },
  ]
})

export default router
