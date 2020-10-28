/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-10-23 11:10:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-28 14:44:52
 */
'use strict';

const Controller = require('egg').Controller;

class AboutController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;

    const about = await this.ctx.service.about.index(params)
    await this.ctx.helper.checkData(about);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.query;

    const about = await this.ctx.service.about.update(params)
    await this.ctx.helper.checkData(about);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const about = await this.ctx.service.about.add(params)
    await this.ctx.helper.checkData(about);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const about = await this.ctx.service.about.destroy(params)
    await this.ctx.helper.checkData(about);
  }
}

module.exports = AboutController;