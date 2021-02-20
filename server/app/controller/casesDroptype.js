/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-19 17:50:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 11:57:12
 */
'use strict';
const Controller = require('egg').Controller;

class CasesController extends Controller {
  /**
   * 获取列表
   */
  async list () {
    const casesDroptype = await this.ctx.service.casesDroptype.list();
    await this.ctx.helper.checkData({ data: casesDroptype });
  }
  /**
   * 列表
   */
  async index () {
    const params = this.ctx.query;

    const casesDroptype = await this.ctx.service.casesDroptype.index(params);
    await this.ctx.helper.checkData(casesDroptype);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const casesDroptype = await this.ctx.service.casesDroptype.update(params);
    await this.ctx.helper.checkData(casesDroptype);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const casesDroptype = await this.ctx.service.casesDroptype.destroy(params);
    await this.ctx.helper.checkData(casesDroptype);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const casesDroptype = await this.ctx.service.casesDroptype.edit(params);
    await this.ctx.helper.checkData(casesDroptype);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const casesDroptype = await this.ctx.service.casesDroptype.add(params);
    await this.ctx.helper.checkData(casesDroptype);
  }
}
module.exports = CasesController;