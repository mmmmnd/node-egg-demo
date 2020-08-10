/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-30 11:26:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-10 15:42:04
 */
'use strict';
const { Op } = require('sequelize')
/**
 * 企业文化
 */
class CultureDao {
  /**
   * 关于我们列表
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   * @param { Number } page 分页
   */
  static async list (ctx, cid, page) {
    const pageSize = 5;
    const culture = await ctx.model.MzcCulture.findAndCountAll({
      where: {
        category_id: cid,
        delete_at: null
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    })

    if (culture.rows.length == 0) throw new Error('没有找到相关信息');

    return {
      data: culture.rows,
      meta: {
        current_page: parseInt(page),
        per_page: pageSize,
        total: culture.count,
        total_pages: Math.ceil(culture.count / pageSize),
      }
    }

  }
  /**
   * 详情页
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   * @param { Number } id 文章id号 
   */
  static async info (ctx, cid, id) {

    const previous = await ctx.model.MzcCulture.findOne({
      where: {
        category_id: cid,
        id: { [Op.lt]: id }
      }
    });

    const current = await ctx.model.MzcCulture.findOne({
      where: {
        category_id: cid,
        id: id
      }
    });

    const next = await ctx.model.MzcCulture.findOne({
      where: {
        category_id: cid,
        id: { [Op.gt]: id }
      }
    });

    if (!current) throw new Error('没有找到相关文章');

    return {
      previous, current, next,
    };
  }
  /**
   * 点击浏览量
   * @param { Object } ctx 全局this
   * @param { Number } id 文章id号 
   * @param { Number } click 点击次数
   */
  static async updateClick (ctx, id, click) {
    const culture = await ctx.model.MzcCulture.findByPk(id);

    if (!culture) throw new Error('没有找到相关文章');

    culture.click = click;
    culture.save();
  }
}

module.exports = CultureDao;
