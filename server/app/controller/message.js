/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:31:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-19 15:48:02
 */
'use strict';
const MessageValidators = require('../validators/message');
const messageValidators = new MessageValidators();

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async create () {
    const params = this.ctx.request.body;

    const validators = await this.ctx.validate(messageValidators, params)
    if (!validators) return false;

    const messageCreate = await this.service.message.create(params);
    await this.ctx.helper.checkData(messageCreate);

  }
}

module.exports = MessageController;