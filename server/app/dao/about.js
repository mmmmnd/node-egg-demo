/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-18 15:05:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-19 17:16:01
 */
'use strict';

/**
 * 关于我们
 */
class AboutDao {
  /**
   * 关于我们列表
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  static async list (ctx, cid) {
    return await ctx.model.MzcAbout.findAll({
      where: {
        category_id: cid,
        deleted_at: null
      },
    });// 公司简介
  }
}

module.exports = AboutDao;
