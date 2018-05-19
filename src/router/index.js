import Vue from 'vue';
import Router from 'vue-router';
import store from 'Store';
import { routes } from './routes';

Vue.use(Router);

const routerConfig = {
  routes
};

const router = new Router(routerConfig);

router.isCurrentRoute = (routeName) => {
  return router.currentRoute.name === routeName;
};

router.beforeEach((to, from, next) => {
  if (to.meta.guest && store.getters.isLogged) {
    return next({ name: 'base' });
  }

  if (!to.meta.guest && !store.getters.isLogged) {
    return next({ name: 'login' });
  }

  return next();
});

export default router;
