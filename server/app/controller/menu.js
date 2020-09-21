/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-16 15:44:23
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-21 14:53:47
 */
'use strict';
const Controller = require('egg').Controller;

class MenuController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;
    const menu = await this.ctx.service.menu.index(params);
    await this.ctx.helper.checkData(menu);
  }
  /**
   * 修改
   */
  async update () {
    let params = this.ctx.request.body;

    const menu = await this.ctx.service.menu.update(params);
    await this.ctx.helper.checkData(menu);
  }
  /**
   * 编辑
   */
  async edit () {
    let params = this.ctx.request.body;

    const menu = await this.ctx.service.menu.edit(params)
    await this.ctx.helper.checkData(menu);
  }
}
module.exports = MenuController;