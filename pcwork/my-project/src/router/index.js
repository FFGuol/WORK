import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BookDetail from '@/components/BookDetail'
import hello from '@/components/hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: HelloWorld
    },
    {
      path: '/книги',
      name: '书籍详情页',
      component: BookDetail
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    }
  ]
})
