/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-01 10:02:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-06 17:15:30
 */
import { constantRoutes } from '@/router'
import { routesIndex } from '@/api/routes'
import Layout from '@/layout'

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */

export function generaMenu (data, routes = []) {
  data.forEach(item => {
    const menu = {
      path: item.path,
      component: item.pid == 0 ? Layout : componentsMap[item.component],
      redirect: item.children ? item.redirect : '',
      hidden: item.hidden,
      name: item.name,
      meta: item.meta
    }
    if (item.children) {
      menu.children = []
      generaMenu(item.children, menu.children)
    }

    routes.push(menu)
  })
  return routes;
}

export const componentsMap = {
  login: () => import('@/views/login/index'),
  404: () => import('@/views/404'),
  dashboard: () => import('@/views/dashboard/index'),
  aboutSingle: () => import('@/views/about/single'),
  aboutList: () => import('@/views/about/list'),
  aboutClassify: () => import('@/views/about/classify'),
  servicesIndex: () => import('@/views/services/index'),
  companyIndex: () => import('@/views/company/index'),
  cultureIndex: () => import('@/views/culture/index'),
  newsIndex: () => import('@/views/news/index'),
  casesCase: () => import('@/views/cases/case'),
  casesPartner: () => import('@/views/cases/partner'),
  recruitIndex: () => import('@/views/recruit/index'),
  recruitList: () => import('@/views/recruit/list'),
  menusIndex: () => import('@/views/menu/index'),
  settingBsic: () => import('@/views/setting/bsic'),
  settingAdvertising: () => import('@/views/setting/advertising'),
  permissionsRoles: () => import('@/views/permissions/roles'),
  permissionsAdmin: () => import('@/views/permissions/admin'),
  permissionsPower: () => import('@/views/permissions/power'),
  permissionsPowerApi: () => import('@/views/permissions/power/api'),
  permissionsPowerMenu: () => import('@/views/permissions/power/menu'),
  permissionsPowerCode: () => import('@/views/permissions/power/code'),
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
      routesIndex().then(response => {
        const data = response.data
        if (response.code !== 0) {
          this.$message({
            message: '菜单数据加载异常',
            type: 0
          })
        } else {
          const asyncRoutes = generaMenu(data)
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