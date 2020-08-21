/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:40:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-19 17:14:00
 */
'use strict';

/**
 * 下拉菜单
 */
class AboutDroptypeDao {
  /**
   * 下拉菜单列表
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  static async list (ctx, cid) {
    return await ctx.model.MzcAboutDroptype.findAll({
      where: {
        dropType: cid,
        deleted_at: null
      },
    });
  }
}

module.exports = AboutDroptypeDao;
