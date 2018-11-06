import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import qs from 'qs'
import login from '@/components/login'
import home from '@/components/home'
import hellow from '@/components/hellow'
import list from '@/components/list'
import dist from '@/components/dist'
import add from '@/components/add'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'login',
    component: login,
  }, {
    path: '/home',
    name: 'home',
    component: home,
    children: [{
      name: 'list',
      path: '/home/list',
      component: list,
    }, {
      name: 'dist',
      path: '/home/dist',
      component: dist,
    }, {
      name: 'add',
      path: '/home/add',
      component: add,
    }, {
      name: 'hellow',
      path: '/home/hellow',
      component: hellow,
    }]
  }]
})
