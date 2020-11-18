/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-18 10:22:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 11:06:02
 */
const Controller = require('egg').Controller;

class settingsController extends Controller {
  /**
   * 列表
   */
  async list () {
    const settings = await this.ctx.service.settings.list();

    await this.ctx.helper.checkData({ data: settings });
  }

}

module.exports = settingsController