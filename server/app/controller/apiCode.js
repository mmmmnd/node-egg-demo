/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-06 15:34:32
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-07 11:21:26
 */
'use strict';

const Controller = require('egg').Controller;

class ApiCodeController extends Controller {
  /**
   * 查询
   */
  async index () {
    const params = this.ctx.query;
    const apiCode = await this.ctx.service.apiCode.index(params)

    await this.ctx.helper.checkData(apiCode);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;
    const apiCode = await this.ctx.service.apiCode.add(params)

    await this.ctx.helper.checkData(apiCode);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;
    const apiCode = await this.ctx.service.apiCode.edit(params)

    await this.ctx.helper.checkData(apiCode);
  }
}

module.exports = ApiCodeController;