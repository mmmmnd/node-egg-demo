/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:31:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:47:31
 */
'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async userInfo () {
    const { ctx, service } = this;
    const params = this.ctx.request.body;

    const messageCreate = await service.message.create(params);
    return ctx.body = messageCreate
  }
}

module.exports = MessageController;