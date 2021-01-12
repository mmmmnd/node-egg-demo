/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-12 15:15:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-12 15:21:08
 */
'use strict';

const GetTree = require('../utils/getTree');
const Controller = require('egg').Controller;

class AdvertController extends Controller {
  /**
   * 详情
   */
  async index () {
    const params = this.ctx.query;

    const exception = await this.ctx.service.exception.index(params)
    await this.ctx.helper.checkData(exception);
  }
}

module.exports = AdvertController;