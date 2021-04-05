// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { store }  from './store/store';

import './styles/tiptap/main.scss';

Vue.config.productionTip = false;

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$store = store;

Vue.use(Antd);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
