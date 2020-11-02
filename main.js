import Vue from 'vue'
import App from './App'
import api from './common/request.js'
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$token = 'Bearer ' + uni.getStorageSync('token');
App.mpType = 'app'
import message from '@/components/quick-message/quick-message.vue'
Vue.component('quick-message',message);
const app = new Vue({
	...App
})
app.$mount()
