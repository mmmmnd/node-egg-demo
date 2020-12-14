/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-14 17:11:49
 */

'use strict';
const Controller = require('egg').Controller;

class RoutesController extends Controller {
  /**
   * 获取列表
   */
  async roles () {
    const { userInfo } = global

    const roles = await this.ctx.service.roles.detail(userInfo.userRolesId); // 获取群组权限
    const rolesMenu = await this.ctx.service.rolesMenu.detail(userInfo.userId); // 获取单独权限
    const routes = await this.ctx.service.routes.roles(roles, rolesMenu);
    await this.ctx.helper.checkData(routes);
  }
}
module.exports = RoutesController;