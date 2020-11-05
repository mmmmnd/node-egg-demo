/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-04 17:03:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-05 10:50:35
 */
import request from '@/utils/request'

export function advertDetail (params) {
  return request({
    url: '/advert/detail',
    method: 'get',
    params
  })
}

export function advertAdd (data) {
  return request({
    url: '/advert/add',
    method: 'post',
    data
  })
}

export function advertDestroy (data) {
  return request({
    url: '/advert/destroy',
    method: 'delete',
    data
  })
}

export function advertUpdate (data) {
  return request({
    url: '/advert/update',
    method: 'put',
    data
  })
}