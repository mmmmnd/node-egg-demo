/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-18 15:29:49
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 16:00:42
 */
import request from '@/utils/request'

export function settingsList (params) {
  return request({
    url: '/settings/list',
    method: 'get',
    params
  })
}

export function settingsEdit (data) {
  return request({
    url: '/settings/edit',
    method: 'post',
    data
  })
}

