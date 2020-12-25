/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-25 10:06:38
 */

'use strict';
const Controller = require('egg').Controller;

class RoutesController extends Controller {
  /**
   * 群组菜单权限列表
   */
  async index () {
    const { userInfo } = global

    const roles = await this.ctx.service.roles.detail(userInfo.userRolesId); // 获取群组权限
    const adminMenu = await this.ctx.service.admin.current(); // 获取单独权限
    const routes = await this.ctx.service.routes.index(roles, adminMenu.data);
    await this.ctx.helper.checkData(routes);
  }
  /**
   * 获取列表
   */
  async list () {
    const routes = await this.ctx.service.routes.list();

    await this.ctx.helper.checkData(routes);
  }
}
module.exports = RoutesController;