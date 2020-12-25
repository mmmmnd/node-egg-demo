/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 11:01:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-25 17:30:33
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

export function rolesList (params) {
  return request({
    url: '/roles/list',
    method: 'get',
    params
  })
}

export function adminList (params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params
  })
}

export function adminEdit (data) {
  return request({
    url: '/admin/edit',
    method: 'post',
    data
  })
}

export function adminAdd (data) {
  return request({
    url: '/admin/add',
    method: 'post',
    data
  })
}

export function adminUpdate (data) {
  return request({
    url: '/admin/update',
    method: 'put',
    data
  })
}
