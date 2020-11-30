/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-30 15:05:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-30 16:05:01
 */
import { routesIndex } from '@/api/routes'
import { asyncRoutes, constantRoutes } from '@/router'


const actions = {
  generateRoutes ({ commit }, data) {
    const { nickname, role, roles } = data;
    return new Promise((resolve, reject) => {
      routesIndex({ nickname, role, roles })
        .then(response => {
          console.log(response)

          const asyncRouter = filterAsyncRouter(detail)
          commit('SET_ROUTES', asyncRouter)
          resolve(asyncRouter)
        }).catch(error => {
          reject(error)
        })

    })
  }
}

export default {
  namespaced: true,
  actions
}
