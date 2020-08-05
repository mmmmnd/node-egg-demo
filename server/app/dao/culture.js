/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-30 11:26:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-05 18:16:16
 */
'use strict';

/**
 * 关于我们
 */
class CultureDao {
  /**
   * 关于我们列表
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  static async list (ctx, cid, page) {
    const pageSize = 5;
    const culture = await ctx.model.MzcCulture.findAndCountAll({
      where: {
        category_id: cid,
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    })

    if (culture.rows.length == 0) throw new Error('没有找到相关信息');

    return {
      data: culture.rows,
      meta: {
        // 当前页码
        current_page: parseInt(page),
        // 每页多少条
        per_page: pageSize,
        // 总数
        total: culture.count,
        // 总页数
        total_pages: Math.ceil(culture.count / pageSize),
      }
    }

  }
}

module.exports = CultureDao;
