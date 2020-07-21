/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:40:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-21 14:38:40
 */
'use strict';

class MzcAboutDroptypeDao {
  /**
   * 关于我们
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  static async list(ctx, cid) {
    return await ctx.model.MzcAboutDroptype.findAll({
      where: {
        dropType: cid,
      },
    });// 公司简介
  }
}

module.exports = MzcAboutDroptypeDao;
