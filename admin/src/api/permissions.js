/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 11:01:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-16 17:36:08
 */
import request from '@/utils/request'

export function rolesIndex (params) {
  return request({
    url: '/roles/index',
    method: 'get',
    params
  })
}

export function rolesRoutesDetail (params) {
  return request({
    url: '/roles/routesDetail',
    method: 'get',
    params
  })
}