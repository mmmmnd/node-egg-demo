/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-18 15:05:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-28 15:50:06
 */
'use strict';

/**
 * 关于我们
 */
class aboutSingleDao {
  /**
   * 单页内容
   * @param { Object } ctx 全局this
   * @param { String } cid 二级菜单id
   */
  static async detail (ctx, cid = 2) {
    return await ctx.model.MzcAboutSingle.findOne({
      where: {
        deleted_at: null,
        category_id: cid
      }
    });
  }
}

module.exports = aboutSingleDao;
