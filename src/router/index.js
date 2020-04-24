import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页管理',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/club',
    component: Layout,
    redirect: '/club/clublist',
    name: 'club',
    meta: {
      title: '社团管理',
      icon: 'example'
    },
    children: [{
        path: 'clublist',
        name: 'clublist',
        component: () => import('@/views/club/clublist'),
        meta: {
          title: '社团列表',
          icon: 'table'
        }
      },
      {
        path: 'newclub',
        name: 'newclub',
        component: () => import('@/views/club/newclub'),
        meta: {
          title: '新建社团',
          icon: 'table'
        }
      },
      {
        path: 'clubtype',
        name: 'clubtype',
        component: () => import('@/views/club/clubtype'),
        meta: {
          title: '社团类型',
          icon: 'table'
        }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/users'),
      meta: {
        title: '用户管理',
        icon: 'form'
      }
    }]
  },

  {
    path: '/activity',
    component: Layout,
    children: [{
      path: 'activitylist',
      component: () => import('@/views/activity'), // Parent router-view
      name: 'activitylist',
      meta: {
        title: '活动列表',
        icon: 'nested'
      }
    }]
  },

  {
    path: '/message',
    component: Layout,
    children: [{
      path: 'messagelist',
      component: () => import("@/views/message"),
      meta: {
        title: '消息管理',
        icon: 'tree'
      }
    }]
  },
  {
    path: '/file',
    component: Layout,
    children: [{
      path: 'filelist',
      component: () => import("@/views/files"),
      meta: {
        title: '文件管理',
        icon: 'tree'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
