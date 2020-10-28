/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:59:21
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-28 16:03:56
 */
import request from '@/utils/request'

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
    method: 'put',
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

export function aboutDroptypeIndex (params) {
  return request({
    url: '/aboutDroptype/index',
    method: 'get',
    params
  })
}

export function aboutDroptypeUpdate (data) {
  return request({
    url: '/aboutDroptype/update',
    method: 'put',
    data
  })
}

export function aboutDroptypeEdit (data) {
  return request({
    url: '/aboutDroptype/edit',
    method: 'post',
    data
  })
}

export function aboutDroptypeAdd (data) {
  return request({
    url: '/aboutDroptype/add',
    method: 'post',
    data
  })
}

export function aboutDroptypeDestroy (data) {
  return request({
    url: '/aboutDroptype/destroy',
    method: 'delete',
    data
  })
}

export function aboutDroptypeList () {
  return request({
    url: '/aboutDroptype/list',
    method: 'get',
  })
}

export function aboutIndex (params) {
  return request({
    url: '/about/index',
    method: 'get',
    params
  })
}

export function aboutUpdate (params) {
  return request({
    url: '/about/update',
    method: 'put',
    params
  })
}

export function aboutAdd (data) {
  return request({
    url: '/about/add',
    method: 'post',
    data
  })
}

export function aboutDestroy (data) {
  return request({
    url: '/about/destroy',
    method: 'delete',
    data
  })
}

export function aboutEdit (data) {
  return request({
    url: '/about/edit',
    method: 'post',
    data
  })
}

export function aboutFilters (params) {
  return request({
    url: '/about/filters',
    method: 'get',
    params
  })
}