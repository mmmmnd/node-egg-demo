/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-27 11:40:32
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-27 11:42:09
 */ 
'use strict';

/**
 * 关于我们
 */
class CompanyDao {
  /**
   * 关于我们列表
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  static async list(ctx, cid) {
    return await ctx.model.MzcCompany.findAll({
      where: {
        category_id: cid,
      },
    });// 公司简介
  }
}

module.exports = CompanyDao;
