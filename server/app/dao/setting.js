/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 16:36:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-14 16:53:50
 */
'use strict';

/**
 * 基本设置
 */
class SettingDao {

  /**
   * 基本设置列表
   * @param { Object } ctx 全局this
   */
  static async list (ctx) {
    return await ctx.model.MzcSetting.findAll();
  }
  static async create (ctx) {
    const { name, phone, email, title, content, captcha } = params.data;
    const code = ctx.session.code;

    if (code !== captcha) {
      return ctx.body = {
        code: 1,
        success: false,
        msg: '验证码错误',
      }
    } else {
      return ctx.body = {
        code: 0,
        success: true,
        msg: '提交成功！',
      }
    }
  }

}

module.exports = SettingDao;
