import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeUser.vue';
import Login from '../views/LoginUser.vue';
import Register from '../views/RegisterUser.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
];

const router = createRouter({
  history: createWebHistory(), // Use 'createWebHashHistory()' if you prefer hash mode
  routes
});

export default router;
