/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-04 15:19:35
 */

'use strict';
const Controller = require('egg').Controller;

class RoutesController extends Controller {
  /**
   * 获取列表
   */
  async roles () {
    const { userInfo } = global

    const routes = await this.ctx.service.routes.roles(userInfo);
    await this.ctx.helper.checkData(routes);
  }
}
module.exports = RoutesController;