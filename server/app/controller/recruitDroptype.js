/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-17 10:22:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-17 11:55:04
 */
const Controller = require('egg').Controller;

class RecruitController extends Controller {
  /**
   * 列表
   */
  async index () {

    const recruitDroptype = await this.ctx.service.recruitDroptype.index()
    await this.ctx.helper.checkData(recruitDroptype);
  }

}

module.exports = RecruitController