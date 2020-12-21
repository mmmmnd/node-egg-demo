/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 10:00:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-21 17:29:35
 */
'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {
  /**
   * 列表
   */
  async index () {
    const params = this.ctx.query;

    const roles = await this.ctx.service.roles.index(params)
    await this.ctx.helper.checkData(roles);
  }
}

module.exports = RolesController