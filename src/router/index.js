import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dd',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index')
    },
    {
      path: '/index1',
      name: 'index1',
      component: () => import('@/views/index1')
    },
    {
      path: '/dd',
      name: 'dd',
      component: () => import('@/views/yu/dd')
    },
    {
      path: '/imgupload',
      name: 'imgupload',
      component: () => import('@/views/imgupload/imgupload')
    }
  ]
})
