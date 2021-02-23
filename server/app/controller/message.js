/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:31:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-23 11:11:19
 */
'use strict';
const MessageValidators = require('../validators/message');
const messageValidators = new MessageValidators();

const Controller = require('egg').Controller;

class MessageController extends Controller {
  /**
   * 留言
   */
  async create () {
    const params = this.ctx.request.body;

    const validators = await this.ctx.validate(messageValidators, params)
    if (!validators) return false;

    const messageCreate = await this.service.message.create(params);
    await this.ctx.helper.checkData(messageCreate);
  }
  /**
   * 获取列表
   */
  async list () {
    const params = this.ctx.query;

    const message = await this.ctx.service.message.list(params)
    await this.ctx.helper.checkData(message);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const message = await this.ctx.service.message.destroy(params)
    await this.ctx.helper.checkData(message);
  }
}

module.exports = MessageController;