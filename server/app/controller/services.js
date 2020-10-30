/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-10-23 11:10:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-30 16:06:08
 */
'use strict';

const Controller = require('egg').Controller;

class ServicesController extends Controller {
  /**
   * 获取列表
   */
  async list () {

    const services = await this.ctx.service.services.list()
    const aboutSingleMenu = await this.ctx.service.menu.details(12, 8);
    await this.ctx.helper.checkData({ data: { services, aboutSingleMenu } });
  }
}

module.exports = ServicesController;