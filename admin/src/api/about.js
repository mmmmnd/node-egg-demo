/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:59:21
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-21 11:41:34
 */
import request from '@/utils/request'

export function aboutMenuList (params) {
  return request({
    url: '/menu/index',
    method: 'get',
    params
  })
}

export function aboutMenuUpdate (data) {
  return request({
    url: '/menu/update',
    method: 'post',
    data
  })
}

export function aboutMenuEdit (data) {
  return request({
    url: '/menu/edit',
    method: 'post',
    data
  })
}

