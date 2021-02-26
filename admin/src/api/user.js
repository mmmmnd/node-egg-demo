/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-31 10:33:51
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-26 17:04:12
 */
import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/admin/current',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function adminEditPass (data) {
  return request({
    url: '/admin/editPass',
    method: 'put',
    data
  })
}