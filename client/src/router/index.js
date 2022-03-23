import Vue from 'vue'

import store from '../store/store'

import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'
import CreatePage from '@/components/CreatePage'
import BoardPage from '@/components/BoardPage'
import UpdatePage from '@/components/UpdatePage'
import MainDetailPage from '@/components/MainDetailPage'
import MyPage from '@/components/MyPage'
import RegisterPage from '@/components/RegisterPage'

import TapHome from '@/components/Tap/TapHome'
import TapAsk from '@/components/Tap/TapAsk'
import TapPreview from '@/components/Tap/TapPreview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component : RegisterPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/create',
      name: 'CreatePage',
      component: CreatePage,
      props: true
    },
    {
      // path: '/qna/:boardNum', qna를 하나로 줄였음..!
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
      path: '/main-detail/:contentId/:roomNum',
      name: 'MainDetailPage',
      component: MainDetailPage,
      props: true
      // props를 true로 설정하면 데이터를 props로 받아올수있다. 안쓰면 $route.params.contendId 이런식으로 써야할듯 
    },
    {
      path: '/my-page/:roomNum', // roomNum이 1이면 내가 쓴 글 2면 내가 좋아요 누른 글
      name: 'MyPage',
      component: MyPage,
      props: true
    },
    {
      path: '/tap-home/:roomNum', // roomNum이 1이면 내가 쓴 글 2면 내가 좋아요 
      name: 'TapHome',
      component: TapHome,
      props: true
    },
    {
      path: '/tap-ask/:roomNum', // roomNum이 1이면 내가 쓴 글 2면 내가 좋아요 
      name: 'TapAsk',
      component: TapAsk,
      props: true
    },
    {
      path: '/tap-preview', 
      name: 'TapPreview',
      component: TapPreview,
      props: true
    },



  ]
})
