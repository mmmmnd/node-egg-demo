/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-01 10:02:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-01 17:37:45
 */
import { routesRoles, routesConstant } from '@/api/routes'
import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'


/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu (routes = [], data) {
  data.forEach(item => {
    const menu = {
      path: item.path,
      component: item.id === 1 || item.id === 2 || item.id === 28 ? Layout : () => import(item.redirect),
      redirect: item.id !== 1 && item.id !== 2 && item.id == 28 ? item.redirect : '',
      hidden: item.hidden,
      children: [],
      name: item.name,
      meta: item.meta
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {
  constantRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      routesConstant().then(response => {
        let data = response.data
        if (response.code !== 0) {
          this.$message({
            message: '菜单数据加载异常',
            type: 0
          })
        } else {
          generaMenu(constantRoutes, data)
          commit('SET_ROUTES', constantRoutes)

          resolve(constantRoutes)
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