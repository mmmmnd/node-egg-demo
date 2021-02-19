/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 10:36:05
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-19 09:19:04
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
    await this.ctx.helper.checkData(news);
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
  /**
   * 移动
   */
  async move () {
    const params = this.ctx.request.body;

    const news = await this.ctx.service.news.move(params)
    await this.ctx.helper.checkData(news);
  }
}

module.exports = newsController;