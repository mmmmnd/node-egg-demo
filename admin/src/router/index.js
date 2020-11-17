import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注意：子菜单仅在路由children.length> = 1时出现
 * 详细信息请参见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目不会显示在边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项具有多个子路线时，
 *                                它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（您可以设置多个角色）
    title: 'title'               名称显示在侧边栏和面包屑中（推荐设置）
    icon: 'svg-name'/'el-icon-x' 侧栏中的图标显示
    affix: true                  若果设置为true，它则会固定在tags-view中(默认 false)
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false            如果设置为false，则该项目将隐藏在面包屑中（默认为true）
    activeMenu: '/example/list'  如果设置了路径，则侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 可以访问所有角色
 */
export const constantRoutes = [
  {
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
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
  },

  {
    path: '/about',
    component: Layout,
    redirect: '/about/single',
    name: 'About',
    meta: { title: '关于我们', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'single',
        name: 'Single',
        component: () => import('@/views/about/single'),
        meta: { title: '单页', icon: '' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/about/list'),
        meta: { title: '列表', icon: '', noCache: true }
      },
      {
        path: 'classify',
        name: 'classify',
        component: () => import('@/views/about/classify'),
        meta: { title: '分类', icon: '', noCache: true }
      }
    ]
  },

  {
    path: '/services',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Services',
        component: () => import('@/views/services/index'),
        meta: { title: '服务领域', icon: 'el-icon-service', noCache: true }
      }
    ]
  },

  {
    path: '/company',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Company',
        component: () => import('@/views/company/index'),
        meta: { title: '旗下公司', icon: 'company', noCache: true }
      }
    ]
  },

  {
    path: '/culture',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Culture',
        component: () => import('@/views/culture/index'),
        meta: { title: '企业文化', icon: 'culture', noCache: true }
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'News',
        component: () => import('@/views/news/index'),
        meta: { title: '新闻中心', icon: 'news', noCache: true }
      }
    ]
  },

  {
    path: '/cases',
    component: Layout,
    redirect: '/cases/case',
    name: 'Cases',
    meta: { title: '合作案例', icon: 'el-icon-suitcase' },
    children: [
      {
        path: 'case',
        name: 'Case',
        component: () => import('@/views/cases/case'),
        meta: { title: '服务案例', icon: '' }
      },
      {
        path: 'partner',
        name: 'Partner',
        component: () => import('@/views/cases/partner'),
        meta: { title: '合作伙伴', icon: '', noCache: true }
      }
    ]
  },

  {
    path: '/recruit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Recruit',
        component: () => import('@/views/recruit/index'),
        meta: { title: '人力资源', icon: 'hr', noCache: true }
      }
    ]
  },

  {
    path: '/menu',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '菜单', icon: 'el-icon-menu', noCache: true }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

//详细请看: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由器
}

export default router
