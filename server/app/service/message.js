/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:32:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-18 10:49:01
 */
'use strict';

const MessageDao = require('../dao/message');

const Service = require('egg').Service;

class MessageService extends Service {
  async userInfo (params) {
    const { ctx } = this;
    const messageCreate = await MessageDao.create(ctx, params);

    ctx.body = messageCreate
  }
}

module.exports = MessageService;