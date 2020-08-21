/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:31:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-18 08:56:52
 */
'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async userInfo () {
    const params = this.ctx.request.body;
    await this.ctx.service.message.userInfo(params);
  }
}

module.exports = MessageController;