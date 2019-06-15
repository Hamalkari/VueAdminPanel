import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Table from '@/components/TableOfUsers';
import UserCreate from '@/components/CreateUser';
import Home from '@/components/Home';
import User from '@/components/User';
import NotFound from '@/components/NotFound';
import NetworkIssue from '@/components/NetworkIssue';
import UpdateUser from '@/components/UpdateUser';

import Nprogress from 'nprogress';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'users',
      path: '/users',
      component: Table,
      props: true,
      beforeEnter(to, from, next) {
        store
          .dispatch('getUsers')
          .then(users => {
            to.params.users = users;
            next();
          })
          .catch(() => {
            to.params.users = [];
            next({ name: 'network-issue' });
          });
      }
    },
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'create-user',
      path: '/users/create',
      component: UserCreate
    },
    {
      name: 'user',
      path: '/users/:id',
      component: User,
      props: true,
      beforeEnter(to, from, next) {
        store
          .dispatch('getUser', to.params.id)
          .then(user => {
            to.params.user = user;
            next();
          })
          .catch(() => {
            next({ name: '404', params: { resource: 'пользователя' } });
          });
      }
    },
    {
      name: 'update-user',
      path: '/users/:id/update',
      component: UpdateUser,
      props: true
    },
    {
      name: '404',
      path: '/404',
      component: NotFound,
      props: true
    },
    {
      name: 'network-issue',
      path: '/network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'страница' } }
    }
  ]
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
