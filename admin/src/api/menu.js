/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-10-12 16:22:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-15 15:25:10
 */
import request from '@/utils/request'

export function menuList (params) {
  return request({
    url: '/menu/index',
    method: 'get',
    params
  })
}

export function menuUpdate (data) {
  return request({
    url: '/menu/update',
    method: 'put',
    data
  })
}

export function menuEdit (data) {
  return request({
    url: '/menu/edit',
    method: 'post',
    data
  })
}

export function menuAdd (data) {
  return request({
    url: '/menu/add',
    method: 'post',
    data
  })
}