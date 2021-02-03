/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 10:36:05
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-02 18:20:27
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
    await this.ctx.helper.checkData(company);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const company = await this.ctx.service.company.update(params);
    await this.ctx.helper.checkData(company);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const company = await this.ctx.service.company.edit(params)
    await this.ctx.helper.checkData(company);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const company = await this.ctx.service.company.destroy(params)
    await this.ctx.helper.checkData(company);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const company = await this.ctx.service.company.add(params)
    await this.ctx.helper.checkData(company);
  }
}

module.exports = ServicesController;