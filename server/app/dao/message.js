/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 16:36:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-02 15:29:39
 */
'use strict';

/**
 * 基本设置
 */
class MessageDao {

  /**
   * 基本设置列表
   * @param { Object } ctx 全局this
   * @param { Object } params 前端发送参数
   */
  static async create (ctx, params) {
    const { name, phone, email, title, remarks, captcha } = params;
    const code = ctx.session.code;
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
        await ctx.model.MzcMessage.create({
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
  static async list (ctx) {
    return await ctx.model.MzcMessage.findAll();
  }

}

module.exports = MessageDao;
