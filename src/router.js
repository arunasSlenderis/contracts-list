import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/documents/contracts',
      name: 'contracts',
      meta: { menuGroup: 'documents', permissions: ['documents.*'] },
      component: () => import(/* webpackChunkName: "contracts" */ './components/contracts/Contracts.vue')
    },
    {
      path: 'documents/contracts/:id/supplements',
      name: 'contract-supplements',
      meta: {menuGroup: 'documents', permissions: ['documents.*']},
      component: () => import(/* webpackChunkName: "contract-supplements" */ './components/contracts/ContractSupplements.vue'),
    },
  ]
});
