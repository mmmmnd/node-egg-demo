/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:59:21
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-29 10:16:37
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

export function aboutSingleList (params) {
  return request({
    url: '/aboutSingle/index',
    method: 'get',
    params
  })
}

export function aboutSingleUpdate (data) {
  return request({
    url: '/aboutSingle/update',
    method: 'post',
    data
  })
}

export function aboutSingleDetail (id) {
  return request({
    url: '/aboutSingle/detail',
    method: 'get',
    params: { cid: id }
  })
}

export function aboutSingleEdit (data) {
  return request({
    url: '/aboutSingle/edit',
    method: 'post',
    data
  })
}