import Vue from 'vue'

import store from '../store/store'

import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'
import CreatePage from '@/components/CreatePage'
import BoardPage from '@/components/BoardPage'
import UpdatePage from '@/components/UpdatePage'
import MainDetailPage from '@/components/MainDetailPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/create',
      name: 'CreatePage',
      component: CreatePage
    },
    {
      path: '/qna',
      name: 'BoardPage',
      component: BoardPage
    },
    {
      path: '/update-page',
      name: 'UpdatePage',
      component: UpdatePage
    },
    {
      path: '/main-detail/:contentId',
      name: 'MainDetailPage',
      component: MainDetailPage,
      props: true
      // props를 true로 설정하면 데이터를 props로 받아올수있다. 안쓰면 $route.params.contendId 이런식으로 써야할듯 
    }
  ]
})
