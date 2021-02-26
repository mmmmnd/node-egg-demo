/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-23 15:57:03
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-23 15:58:04
 */
import request from '@/utils/request'

export function exceptionIndex (params) {
  return request({
    url: '/exception/index',
    method: 'get',
    params
  })
}