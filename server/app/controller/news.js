/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 10:36:05
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-12 11:11:00
 */

'use strict';

const Controller = require('egg').Controller;

class newsController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;

    const news = await this.ctx.service.news.index(params)
    const aboutSingleMenu = await this.ctx.service.menu.details(24, 22);
    await this.ctx.helper.checkData({ data: { news, aboutSingleMenu } });
  }
  // 修改
  async update () {
    const params = this.ctx.request.body;

    const news = await this.ctx.service.news.update(params);
    await this.ctx.helper.checkData(news);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const news = await this.ctx.service.news.destroy(params);
    await this.ctx.helper.checkData(news);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const news = await this.ctx.service.news.edit(params)
    await this.ctx.helper.checkData(news);
  }
  async add () {
    const params = this.ctx.request.body;

    const news = await this.ctx.service.news.add(params)
    await this.ctx.helper.checkData(news);
  }
}

module.exports = newsController;