/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-12 11:11:53
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-19 10:01:17
 */

import request from '@/utils/request'

export function newsIndex (params) {
  return request({
    url: '/news/index',
    method: 'get',
    params
  })
}

export function newsUpdate (data) {
  return request({
    url: '/news/update',
    method: 'put',
    data
  })
}

export function newsDestroy (data) {
  return request({
    url: '/news/destroy',
    method: 'delete',
    data
  })
}

export function newsEdit (data) {
  return request({
    url: '/news/edit',
    method: 'post',
    data
  })
}

export function newsAdd (data) {
  return request({
    url: '/news/add',
    method: 'post',
    data
  })
}

export function newsMove (data) {
  return request({
    url: '/news/move',
    method: 'post',
    data
  })
}