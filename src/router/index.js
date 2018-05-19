import Vue from 'vue';
import Router from 'vue-router';
import QRView from '@/components/qr-view.component';
import Login from '@/components/auth/login.component';
import Register from '@/components/auth/register.component';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QRView',
      component: QRView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});
