/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-17 10:22:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 09:30:47
 */
const Controller = require('egg').Controller;

class RecruitController extends Controller {
  /**
   * 列表
   */
  async index () {
    const params = this.ctx.query;

    const recruitDroptype = await this.ctx.service.recruitDroptype.index(params)
    await this.ctx.helper.checkData(recruitDroptype);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const recruitDroptype = await this.ctx.service.recruitDroptype.update(params);
    await this.ctx.helper.checkData(recruitDroptype);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const recruitDroptype = await this.ctx.service.recruitDroptype.destroy(params);
    await this.ctx.helper.checkData(recruitDroptype);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const recruitDroptype = await this.ctx.service.recruitDroptype.edit(params)
    await this.ctx.helper.checkData(recruitDroptype);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const recruitDroptype = await this.ctx.service.recruitDroptype.add(params)
    await this.ctx.helper.checkData(recruitDroptype);
  }
}

module.exports = RecruitController