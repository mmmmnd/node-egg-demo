/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 11:54:33
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-06 17:26:23
 */

import request from '@/utils/request'

export function companyIndex (params) {
  return request({
    url: '/company/index',
    method: 'get',
    params
  })
}

export function companyUpdate (data) {
  return request({
    url: '/company/update',
    method: 'put',
    data
  })
}

export function companyEdit (data) {
  return request({
    url: '/company/edit',
    method: 'post',
    data
  })
}

export function companyDestroy (data) {
  return request({
    url: '/company/destroy',
    method: 'delete',
    data
  })
}