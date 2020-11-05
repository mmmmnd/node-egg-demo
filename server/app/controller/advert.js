/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-10-23 11:10:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-05 10:47:05
 */
'use strict';

const Controller = require('egg').Controller;

class AdvertController extends Controller {
  /**
   * 详情
   */
  async detail () {
    const params = this.ctx.query;

    const advert = await this.ctx.service.advert.detail(params)
    await this.ctx.helper.checkData(advert);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const advert = await this.ctx.service.advert.add(params)
    await this.ctx.helper.checkData(advert);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const advert = await this.ctx.service.advert.destroy(params)
    await this.ctx.helper.checkData(advert);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const advert = await this.ctx.service.advert.update(params)
    await this.ctx.helper.checkData(advert);
  }
}

module.exports = AdvertController;