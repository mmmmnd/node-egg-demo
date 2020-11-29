/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-29 21:31:03
 */

'use strict';
const Controller = require('egg').Controller;

class RoutesController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const admin = {}
    admin.role = 3;
    admin.roles = [20,21,22,23,24];
    
    const routes = await this.ctx.service.routes.index(admin);
    await this.ctx.helper.checkData(routes);
  }
}
module.exports = RoutesController;