/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 16:36:45
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-23 20:32:05
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
  static async list(ctx) {
    return await ctx.model.MzcSetting.findAll();
  }

}

module.exports = SettingDao;
