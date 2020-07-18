/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 16:35:49
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-18 15:08:41
 */
'use strict';

class AdvertisingDao {

  /**
   * 轮播图广告
   * @param { Object } ctx 全局this
   */
  static async list(ctx) {
    return await ctx.model.MzcAdvert.findAll();
  }

}

module.exports = AdvertisingDao;
