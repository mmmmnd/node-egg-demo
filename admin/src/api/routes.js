/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-30 09:23:14
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-01 10:47:57
 */
import request from '@/utils/request'

export function routesRoles () {
  return request({
    url: '/routes/roles',
    method: 'get',
  })
}

export function routesConstant () {
  return request({
    url: '/routes/constant',
    method: 'get',
  })
}
