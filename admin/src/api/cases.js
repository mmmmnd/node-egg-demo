/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-13 14:49:19
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 15:16:27
 */
import request from '@/utils/request'

export function casesIndex (params) {
  return request({
    url: '/cases/index',
    method: 'get',
    params
  })
}

export function casesUpdate (data) {
  return request({
    url: '/cases/update',
    method: 'put',
    data
  })
}

export function casesDestroy (data) {
  return request({
    url: '/cases/destroy',
    method: 'delete',
    data
  })
}

export function casesEdit (data) {
  return request({
    url: '/cases/edit',
    method: 'post',
    data
  })
}

export function casesAdd (data) {
  return request({
    url: '/cases/add',
    method: 'post',
    data
  })
}

export function casesMove (data) {
  return request({
    url: '/cases/move',
    method: 'post',
    data
  })
}

export function casesDroptypeList () {
  return request({
    url: '/casesDroptype/list',
    method: 'get',
  })
}

export function casesDroptypeIndex (params) {
  return request({
    url: '/casesDroptype/index',
    method: 'get',
    params
  })
}

export function casesDroptypeUpdate (data) {
  return request({
    url: '/casesDroptype/update',
    method: 'put',
    data
  })
}

export function casesDroptypeDestroy (data) {
  return request({
    url: '/casesDroptype/destroy',
    method: 'delete',
    data
  })
}

export function casesDroptypeEdit (data) {
  return request({
    url: '/casesDroptype/edit',
    method: 'post',
    data
  })
}

export function casesDroptypeAdd (data) {
  return request({
    url: '/casesDroptype/add',
    method: 'post',
    data
  })
}