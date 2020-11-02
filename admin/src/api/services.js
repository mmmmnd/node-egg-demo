/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-10-30 15:03:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-02 11:05:48
 */
import request from '@/utils/request'

export function servicesList () {
  return request({
    url: '/services/list',
    method: 'get',
  })
}

export function servicesUpdate (data) {
  return request({
    url: '/services/update',
    method: 'put',
    data
  })
}