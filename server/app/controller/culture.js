/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 10:36:05
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-08 16:40:54
 */

'use strict';

const Controller = require('egg').Controller;

class CultureController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;

    const culture = await this.ctx.service.culture.index(params)
    await this.ctx.helper.checkData(culture);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const culture = await this.ctx.service.culture.update(params);
    await this.ctx.helper.checkData(culture);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const culture = await this.ctx.service.culture.destroy(params);
    await this.ctx.helper.checkData(culture);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const culture = await this.ctx.service.culture.edit(params)
    await this.ctx.helper.checkData(culture);
  }
  /**
   * 新增
   */
  async add () {
    const params = this.ctx.request.body;

    const culture = await this.ctx.service.culture.add(params)
    await this.ctx.helper.checkData(culture);
  }
  /**
   * 移动
   */
  async move () {
    const params = this.ctx.request.body;

    const culture = await this.ctx.service.culture.move(params)
    await this.ctx.helper.checkData(culture);
  }
}

module.exports = CultureController;