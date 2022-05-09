import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('@/views/homePages/index'),
    children: [
      {
        path: '/',
        redirect: '/index'
      },
      {
        path: '/index',
        component: () => import('@/views/homePages/index'),
        name: '博客',
        meta: {
          title: '博客'
        }
      }
    ]
  },
  {
    path: '/index/profile',
    component: () => import('@/views/userProfile/index'),
    name: '个人资料',
    meta: {
      title: '个人资料'
    },
    children: [
     {
      path: 'userProfile',
      name: 'userProfile',
      component: () => import('@/views/userProfile/profile'),
      meta: {
        title: '个人信息'
      }
     },
     {
      path: 'message',
      name: 'message',
      component: () => import('@/views/userProfile/message'),
      meta: {
        title: '文章管理'
      }
     }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/messageDetail',
    name: 'messageDetail',
    component: () => import('@/views/messageDetail/index'),
    meta: {
      title: '博客文章'
    }
  },
  {
    path: '/writeMessage',
    name: '/writeMessage',
    component: () => import('@/views/writeMessage/index'),
    meta: {
      title: '写文章'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
})
  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  });



export default router
