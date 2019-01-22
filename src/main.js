import Vue from 'vue';
import './plugins/vuetify';
import i18n from './i18n/i18n-config';
import VeeValidate from './config/vee-validate';
import App from './App.vue';
import router from './router';
import store from './store/store';

import PrimaryActionButton from './components/PrimaryActionButton.vue';

Vue.config.productionTip = false;

Vue.use(VeeValidate, {});

Vue.prototype.$isAdmin = function() {
  if (store.state.currentUser) {
    return store.state.currentUser.user.role === 'admin' || false;
  }
};

Vue.prototype.$can = function(permissions) {
  if (!Vue.prototype.$isAdmin()) {
    if (permissions && store.state.permissions) {
      return store.state.permissions.some(item => permissions.includes(item));
    }
  }
  return true;
};

Vue.component('primary-action-button', PrimaryActionButton);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
