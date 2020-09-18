/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:59:21
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-18 17:30:13
 */
import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/menu/index',
    method: 'get',
    params
  })
}

export function menuUpdate (params) {
  return request({
    url: '/menu/update',
    method: 'post',
    params
  })
}

