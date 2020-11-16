/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-13 08:23:42
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-16 10:20:35
 */
'use strict';
const Controller = require('egg').Controller;

class CasesController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;

    const cases = await this.ctx.service.cases.index(params);
    const aboutSingleMenu = await this.ctx.service.menu.details(12, 8);
    await this.ctx.helper.checkData({ data: { cases, aboutSingleMenu } });

  }
  // 修改
  async update () {
    const params = this.ctx.request.body;

    const cases = await this.ctx.service.cases.update(params);
    await this.ctx.helper.checkData(cases);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const cases = await this.ctx.service.cases.destroy(params);
    await this.ctx.helper.checkData(cases);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const cases = await this.ctx.service.cases.edit(params)
    await this.ctx.helper.checkData(cases);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const cases = await this.ctx.service.cases.add(params)
    await this.ctx.helper.checkData(cases);
  }
}
module.exports = CasesController;