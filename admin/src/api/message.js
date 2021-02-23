/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-23 11:23:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-23 11:42:54
 */
import request from '@/utils/request'

export function messageList (params) {
  return request({
    url: '/message/list',
    method: 'get',
    params
  })
}

export function messageDestroy (data) {
  return request({
    url: '/message/destroy',
    method: 'delete',
    data
  })
}