import Vue from 'vue';
import Router from 'vue-router';
import QRPage from '@/components/QRPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QRPage',
      component: QRPage
    }
  ]
});
