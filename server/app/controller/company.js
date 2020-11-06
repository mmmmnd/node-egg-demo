/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 10:36:05
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-06 11:34:30
 */

'use strict';

const Controller = require('egg').Controller;

class ServicesController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;

    const company = await this.ctx.service.company.index(params)
    const aboutSingleMenu = await this.ctx.service.menu.details(15, 14);
    await this.ctx.helper.checkData({ data: { company, aboutSingleMenu } });
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const services = await this.ctx.service.services.update(params);
    await this.ctx.helper.checkData(services);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const services = await this.ctx.service.services.edit(params)
    await this.ctx.helper.checkData(services);
  }
}

module.exports = ServicesController;