import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import 'babel-polyfill'
import router from './router'
import './global-components'
import VueFetch, { $fetch } from './plugins/fetch'
import state from './state'
import VueState from './plugins/state'
import * as filters from './filter'
for (const key in filters) {
  Vue.filter(key, filters[key]);
}
Vue.use(VueFetch, {
  baseUrl:'http://localhost:3000/'
});

Vue.use(VueState, state);

async function main() {
  // get user info
  try {
    state.user = await $fetch('user');
  } catch (error) {
    console.warn(error);
  }
  // launch app
  new Vue({
    el: '#app',
    render: h => h(AppLayout),
    router,
    data: state
  });
}

main();



