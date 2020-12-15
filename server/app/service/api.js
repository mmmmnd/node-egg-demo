/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-15 10:50:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-15 19:02:19
 */
'use strict';
/**
 * 接口
 */
const Service = require('egg').Service;
const await = require('await-stream-ready/lib/await');
const HttpStatus = require('../utils/httpStatus');

class ApiService extends Service {
  /**
   * 获取接口id
   * @param { String } urlPathName 接口名
   */
  async detail (urlPathName) {
    const api = await this.ctx.model.MzcApi.findOne({
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
      '/api/routes/roles'
    ]; // 白名单
    if (whiteList.includes(urlPathName)) return true

    const apiId = await this.detail(urlPathName); // 查找接口id
    var roles = await this.ctx.service.roles.detail(userInfo.userRolesId); // 群组接口权限
    var rolesApi = await this.ctx.service.rolesApi.detail(userInfo.userId); // 个人接口权限

    if (roles === null) { roles = {}; roles.api_id = '' }
    if (rolesApi === null) { rolesApi = {}; rolesApi.api_id = '' }

    return roles.api_id.includes(apiId.id) || rolesApi.api_id.includes(apiId.id)
  }

}

module.exports = ApiService;
