/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-23 20:20:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-12 12:38:58
 */
'use strict';

/**
 * 服务领域
 */
class ServicesDao {
  /**
   * 服务领域列表
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  static async list (ctx, cid) {
    return await ctx.model.MzcServices.findAll({
      where: {
        category_id: cid,
      },
    })
  }
}

module.exports = ServicesDao;
