/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 11:54:33
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-06 11:55:00
 */

import request from '@/utils/request'

export function companyIndex (params) {
  return request({
    url: '/company/index',
    method: 'get',
    params
  })
}