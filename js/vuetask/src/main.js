// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from 'qs'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'

Vue.prototype.$http = axios
Vue.prototype.$moment = moment;
Vue.use(ElementUI);

//vue验证
import VeeValidate, {
  Validator
} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'; //引入中文包，提示信息可以以中文形式显示
Validator.addLocale(zh_CN); // 设置提示信息中文方式显示

const config = {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 100,
  locale: 'zh_CN',
  strict: true,
  enableAutoClasses: true,
  events: 'blur',
  inject: true
};
Vue.use(VeeValidate, config); //一般插件都要use一下


//富文本
// import VueQuillEditor from 'vue-quill-editor'
// // require styles 引入样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>'
});

Vue.filter('types', function (data) {
  switch (data) {
    case 0:
      return "首页banner";
    case 1:
      return "找职位banner";
    case 2:
      return "找精英banner";
    case 3:
      return "行业大图";
  }
});

Vue.filter("statu1", data => {
  switch (data) {
    case 1:
      return "草稿";
    case 2:
      return "上线";
  }
})
Vue.filter("statu2", data => {
  switch (data) {
    case 2:
      return "草稿";
    case 1:
      return "上线";
  }
})
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm';
  return moment(value).format(formatString);
})
