/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-15 10:50:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-26 17:07:52
 */
'use strict';
/**
 * 接口
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class ApiService extends Service {
  /**
   * 获取接口id
   * @param { String } urlPathName 接口名
   */
  async detail (urlPathName) {
    const api = await this.ctx.model.MzcApi.findAll({
      where: { api: urlPathName }
    })
    return api ? api : false
  }
  /**
   * 校验接口
   * @param { String } urlPathName 接口名
   * @param { Object } userInfo 用户信息
   */
  async check (urlPathName, userInfo) {
    const whiteList = [
      '/api/admin/logout',
      '/api/admin/current',
      '/api/routes/index',
      '/api/api/getUserApi',
      '/api/admin/editPass'
    ]; // 白名单
    if (whiteList.includes(urlPathName)) return true

    const apiId = await this.detail(urlPathName); // 查找接口id
    const adminApi = await this.ctx.service.admin.current(); // 个人接口权限
    const roles = await this.ctx.service.roles.detail(userInfo.userRolesId); // 群组接口权限

    if (!roles.api_id) roles.api_id = '[]'
    if (!adminApi.data.api_id) adminApi.data.api_id = '[]'

    roles.api_id = JSON.parse(roles.api_id)
    adminApi.data.api_id = JSON.parse(adminApi.data.api_id)

    for (var item of apiId) {
      if (roles.api_id.includes(item.id) || adminApi.data.api_id.includes(item.id)) {
        return true
      }
    }
  }
  /**
   * 获取接口列表
   */
  async index () {
    return await this.ctx.model.MzcApi.findAll({
      where: {
        deleted_at: null
      }
    })

  }
  /**
   * 获取群组已选中的接口
   * @param { Number } roles 群组api_id
   */
  async detailId (id) {
    return await this.ctx.model.MzcApi.findAll({
      where: {
        id,
        deleted_at: null
      }
    })
  }
  /**
   * 增加
   * @param { Number } pid 父id
   * @param { String } api 接口
   * @param { String } describe 描述
   * @param { String } code 描述
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async add ({ pid, api, describe, code, status = 1, sort = 0 }) {
    await this.ctx.model.MzcApi.create({
      pid, api, describe, code, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 修改
   * @param { Number } id 群组id
   * @param { Number } pid 父id
   * @param { String } api 接口
   * @param { String } describe 描述
   * @param { String } code 描述
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async edit ({ id, pid, api, describe, code, status = 1, sort = 0 }) {
    const Api = await this.ctx.model.MzcApi.update({
      pid, api, describe, code, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!Api[0]) return { httpStatus: HttpStatus.INVALID_REQUEST, msg: '没有找到相关信息' };

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 查找群组和个人接口权限
   * @param { Array } userRolesApi 群组和个人数组
   */
  async getRolesAndUserApi (userRolesApi) {
    return await this.ctx.model.MzcApi.findAll({
      where: {
        id: [...new Set(userRolesApi)], //去重
      },
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    })
  }
}

module.exports = ApiService;
