/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-17 10:53:39
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 09:34:06
 */
import request from '@/utils/request'

export function recruitDroptypeIndex () {
  return request({
    url: '/recruitDroptype/index',
    method: 'get',
  })
}

export function recruitIndex (params) {
  return request({
    url: '/recruit/index',
    method: 'get',
    params
  })
}

export function recruitUpdate (data) {
  return request({
    url: '/recruit/update',
    method: 'put',
    data
  })
}

export function recruitDestroy (data) {
  return request({
    url: '/recruit/destroy',
    method: 'delete',
    data
  })
}

export function recruitAdd (data) {
  return request({
    url: '/recruit/add',
    method: 'post',
    data
  })
}

export function recruitEdit (data) {
  return request({
    url: '/recruit/edit',
    method: 'post',
    data
  })
}

export function recruitDroptypeUpdate (data) {
  return request({
    url: '/recruitDroptype/update',
    method: 'put',
    data
  })
}

export function recruitDroptypeDestroy (data) {
  return request({
    url: '/recruitDroptype/destroy',
    method: 'delete',
    data
  })
}

export function recruitDroptypeAdd (data) {
  return request({
    url: '/recruitDroptype/add',
    method: 'post',
    data
  })
}

export function recruitDroptypeEdit (data) {
  return request({
    url: '/recruitDroptype/edit',
    method: 'post',
    data
  })
}