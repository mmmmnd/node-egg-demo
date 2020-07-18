/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 16:36:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-18 15:08:17
 */
'use strict';

class SettingDao {

  /**
   * 基本设置
   * @param { Object } ctx 全局this
   */
  static async list(ctx) {
    return await ctx.model.MzcSetting.findAll();
  }

}

module.exports = SettingDao;
