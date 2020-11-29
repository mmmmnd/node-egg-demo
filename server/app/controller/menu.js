/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-16 15:44:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-28 20:48:06
 */
'use strict';
const Controller = require('egg').Controller;

class MenuController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const menu = await this.ctx.service.menu.index();
    await this.ctx.helper.checkData(menu);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const menu = await this.ctx.service.menu.update(params);
    await this.ctx.helper.checkData(menu);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const menu = await this.ctx.service.menu.edit(params)
    await this.ctx.helper.checkData(menu);
  }
}
module.exports = MenuController;