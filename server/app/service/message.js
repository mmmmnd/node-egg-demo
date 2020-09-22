/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:32:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:49:30
 */
'use strict';

const Service = require('egg').Service;

class MessageService extends Service {
  async create (params) {
    const { name, phone, email, title, remarks, captcha } = params;
    const code = this.ctx.session.code;
    try {
      if (!name || !phone || !email || !title || !remarks) {
        return {
          code: 0,
          msg: '必填信息不能为空',
        }
      } else if (!captcha) {
        return {
          code: 0,
          success: params,
          msg: '验证码为空',
        }
      } else if (code !== captcha) {
        return {
          code: 1,
          success: params,
          msg: '验证码错误',
        }
      } else {
        await this.ctx.model.MzcMessage.create({
          name,
          phone,
          email,
          title,
          remarks
        });
        return {
          code: 0,
          msg: '提交成功！',
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async list () {
    return await this.ctx.model.MzcMessage.findAll();
  }
}

module.exports = MessageService;