/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-10-23 11:10:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-26 18:16:07
 */
'use strict';

const Controller = require('egg').Controller;

class ServicesController extends Controller {
  /**
   * 获取列表
   */
  async list () {
    const services = await this.ctx.service.services.list()

    await this.ctx.helper.checkData({ data: services });
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
  /**
   * 详情
   */
  async detail () {
    const aboutSingleMenu = await this.ctx.service.menu.details(7);

    await this.ctx.helper.checkData({ data: aboutSingleMenu });
  }
}

module.exports = ServicesController;