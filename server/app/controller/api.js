/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-15 10:24:00
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-15 11:45:18
 */
'use strict';
const Controller = require('egg').Controller;

class ApiController extends Controller {
  /**
   * 接口校验
   * @param { String } urlPathName 接口名
   */
  async check (urlPathName) {
    const { userInfo } = global

    return 123
    // const urlPathNameId = await this.ctx.service.api.detail(urlPathName) // 获取接口id
    // const roles = await this.ctx.service.roles.detail(userInfo.userRolesId); // 获取群组接口权限
    // const rolesApi = await this.ctx.service.rolesApi.detail(userInfo.userId); // 获取单独接口权限

  }
}
module.exports = ApiController;