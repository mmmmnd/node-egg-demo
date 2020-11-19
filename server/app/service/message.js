/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:32:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-19 15:46:18
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');


class MessageService extends Service {
  /**
   * 创建留言
   * @param { String } name 姓名
   * @param { String } phone 电话
   * @param { String } email 邮箱
   * @param { String } title 标题
   * @param { String } remarks 内容
   * @param { String } captcha 验证码
   * 
   */
  async create ({ name, phone, email, title, remarks, captcha }) {
    const code = this.ctx.session.code;
    try {

      if (!captcha) return { msg: '验证码为空', errorStatus: HttpStatus.INVALID_REQUEST };
      else if (code !== captcha) return { msg: '验证码错误', errorStatus: HttpStatus.UNAUTHORIZED };

      await this.ctx.model.MzcMessage.create({
        name, phone, email, title, remarks
      });

      return { httpStatus: HttpStatus.OK }

    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = MessageService;