/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-30 09:23:14
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-30 15:55:27
 */
import request from '@/utils/request'

export function routesIndex (data) {
  return request({
    url: '/routes/index',
    method: 'post',
    data
  })
}
