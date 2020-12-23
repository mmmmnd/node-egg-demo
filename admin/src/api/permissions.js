/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 11:01:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-23 09:49:24
 */
import request from '@/utils/request'

export function rolesIndex (params) {
  return request({
    url: '/roles/index',
    method: 'get',
    params
  })
}

export function apiIndex () {
  return request({
    url: '/api/index',
    method: 'get',
  })
}

export function routesList () {
  return request({
    url: '/routes/list',
    method: 'get',
  })
}

export function rolesAdd (data) {
  return request({
    url: '/roles/add',
    method: 'post',
    data
  })
}

export function rolesUpdate (data) {
  return request({
    url: '/roles/update',
    method: 'put',
    data
  })
}

export function rolesEdit (data) {
  return request({
    url: '/roles/edit',
    method: 'post',
    data
  })
}