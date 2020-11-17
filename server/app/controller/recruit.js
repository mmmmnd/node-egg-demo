/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-17 11:47:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-17 17:14:12
 */
const Controller = require('egg').Controller;

class RecruitController extends Controller {
  /**
   * 列表
   */
  async index () {
    const params = this.ctx.query;

    const recruit = await this.ctx.service.recruit.index(params)
    await this.ctx.helper.checkData(recruit);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const recruit = await this.ctx.service.recruit.update(params);
    await this.ctx.helper.checkData(recruit);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const recruit = await this.ctx.service.recruit.destroy(params);
    await this.ctx.helper.checkData(recruit);
  }
}

module.exports = RecruitController