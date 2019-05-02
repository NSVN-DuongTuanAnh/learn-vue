import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import 'babel-polyfill'
import router from './router'
import './global-components'
import VueFetch from './plugins/fetch'
import state from './state'
import VueState from './plugins/state'

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router,
  data: state
});

Vue.use(VueFetch, {
  baseUrl:'http://localhost:3000/'
});

Vue.use(VueState, state);
