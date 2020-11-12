/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-09 10:30:40
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-10 10:13:18
 */
import request from '@/utils/request'

export function cultureIndex (params) {
  return request({
    url: '/culture/index',
    method: 'get',
    params
  })
}

export function cultureUpdate (data) {
  return request({
    url: '/culture/update',
    method: 'put',
    data
  })
}

export function cultureDestroy (data) {
  return request({
    url: '/culture/destroy',
    method: 'delete',
    data
  })
}

export function cultureEdit (data) {
  return request({
    url: '/culture/edit',
    method: 'post',
    data
  })
}

export function cultureAdd (data) {
  return request({
    url: '/culture/add',
    method: 'post',
    data
  })
}