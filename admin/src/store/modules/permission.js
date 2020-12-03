/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-01 10:02:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-03 23:54:18
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { routesRoles } from '@/api/routes'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}



/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */

export function generaMenu (routes = [], data) {
  data.forEach(item => {

    const menu = {
      path: item.path,
      component: item.children ? Layout : componentsMap[item.component],
      redirect: item.redirect,
      hidden: item.hidden,
      children: [],
      name: item.name,
      meta: item.meta
    }
    item.children && generaMenu(menu.children, item.children)

    routes.push(menu)
  })
  return routes;
}

export const componentsMap = {
  '/views/dashboard/index': () => import('@/views/dashboard/index'),
  '/views/about/single': () => import('@/views/about/single'),
  '/views/about/list': () => import('@/views/about/list'),
  '/views/about/classify': () => import('@/views/about/classify'),
  '/views/services/index': () => import('@/views/services/index'),
  '/views/company/index': () => import('@/views/company/index'),
  '/views/culture/index': () => import('@/views/culture/index'),
  '/views/news/index': () => import('@/views/news/index'),
  '/views/cases/case': () => import('@/views/cases/case'),
  '/views/cases/partner': () => import('@/views/cases/partner'),
  '/views/recruit/index': () => import('@/views/recruit/index'),
  '/views/recruit/list': () => import('@/views/recruit/list'),
  '/views/menu/index': () => import('@/views/menu/index'),
  '/views/setting/bsic': () => import('@/views/setting/bsic'),
  '/views/setting/advertising': () => import('@/views/setting/advertising'),
}


/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      routesRoles().then(response => {
        const data = response.data
        if (response.code !== 0) {
          this.$message({
            message: '菜单数据加载异常',
            type: 0
          })
        } else {
          const loadMenuData = generaMenu([], data)
          const asyncRoutes = filterAsyncRoutes(loadMenuData, roles)
          asyncRoutes.push({ path: '*', redirect: '/404', hidden: true });
          commit('SET_ROUTES', asyncRoutes)
          resolve(asyncRoutes)
        }
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}