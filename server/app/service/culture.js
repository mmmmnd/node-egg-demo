/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-30 11:26:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:08:39
 */
'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize')
/**
 * 旗下公司
 */
class CultureService extends Service {
  /**
   * 关于我们列表
   * @param { Number } cid 二级菜单id
   * @param { Number } page 分页
   */
  async list (cid, page) {
    const pageSize = 5;
    const culture = await this.ctx.model.MzcCulture.findAndCountAll({
      where: {
        category_id: cid,
        deleted_at: null
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
   * @param { Number } cid 二级菜单id
   * @param { Number } id 文章id号 
   */
  async info (cid, id) {

    const previous = await this.ctx.model.MzcCulture.findOne({
      where: {
        category_id: cid,
        deleted_at: null,
        id: { [Op.lt]: id }
      }
    });

    const current = await this.ctx.model.MzcCulture.findOne({
      where: {
        category_id: cid,
        id: id
      }
    });

    const next = await this.ctx.model.MzcCulture.findOne({
      where: {
        category_id: cid,
        deleted_at: null,
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
   * @param { Number } id 文章id号 
   * @param { Number } click 点击次数
   */
  async updateClick (id, click) {
    const culture = await this.ctx.model.MzcCulture.findByPk(id);

    if (!culture) throw new Error('没有找到相关文章');

    culture.click = click;
    culture.save();
  }
}

module.exports = CultureService;
