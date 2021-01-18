/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 14:45:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-18 18:16:41
 */
'use strict';
const Controller = require('egg').Controller;

class AboutSingleController extends Controller {
  /**
   * 修改
   */
  async index () {
    const params = this.ctx.query;

    const aboutSingle = await this.ctx.service.aboutSingle.index(params);
    await this.ctx.helper.checkData(aboutSingle);
  }
  /**
   * 详情
   */
  async detail () {
    const params = this.ctx.query;

    const aboutSingle = await this.ctx.service.aboutSingle.detail(params.cid, true);
    await this.ctx.helper.checkData(aboutSingle);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const aboutSingle = await this.ctx.service.aboutSingle.edit(params)
    await this.ctx.helper.checkData(aboutSingle);
  }
}

module.exports = AboutSingleController