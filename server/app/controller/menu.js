/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-16 15:44:23
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-03 16:59:15
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
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const menu = await this.ctx.service.menu.add(params)
    await this.ctx.helper.checkData(menu);
  }
  /**
   * 获取详情
   */
  async detail () {
    const params = this.ctx.query;

    const menu = await this.ctx.service.menu.detail(params)
    await this.ctx.helper.checkData({ data: menu });
  }
}
module.exports = MenuController;