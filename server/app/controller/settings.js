/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-18 10:22:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 15:57:43
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
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const settings = await this.ctx.service.settings.edit(params);
    await this.ctx.helper.checkData(settings);
  }
}

module.exports = settingsController