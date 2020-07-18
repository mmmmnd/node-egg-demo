/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-18 15:05:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-18 16:29:08
 */
'use strict';

class AboutDao {
  /**
   * 关于我们
   * @param { Object } ctx 全局this
   * @param { Object } params url参数
   */
  static async list(ctx, params) {
    return await ctx.model.MzcAbout.findAll({
      where: {
        category_id: params.cid,
      },
    });// 公司简介

  }
}

module.exports = AboutDao;
