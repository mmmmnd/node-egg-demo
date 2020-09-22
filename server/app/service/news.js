/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:20:38
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:50:11
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
/**
 * 新闻
 */
class NewsService extends Service {
  /**
   * 新闻列表
   * @param { Number } cid 二级菜单id
   * @param { Number } page 分页
   */
  async list (cid, page) {
    const pageSize = 5;
    const news = await this.ctx.model.MzcNews.findAndCountAll({
      where: {
        category_id: cid,
        deleted_at: null
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    })

    if (news.rows.length == 0) throw new Error('没有找到相关信息');

    return {
      data: news.rows,
      meta: {
        current_page: parseInt(page),
        per_page: pageSize,
        total: news.count,
        total_pages: Math.ceil(news.count / pageSize),
      }
    }

  }

  /**
   * 新闻列表
   */
  async lists () {
    return await this.ctx.model.MzcNews.findAll({
      where: {
        deleted_at: null
      },
    })

  }
  /**
   * 详情页
   * @param { Number } cid 二级菜单id
   * @param { Number } id 文章id号 
   */
  async info (cid, id) {
    const previous = await this.ctx.model.MzcNews.findOne({
      where: {
        category_id: cid,
        deleted_at: null,
        id: { [Op.lt]: id }
      }
    });

    const current = await this.ctx.model.MzcNews.findOne({
      where: {
        category_id: cid,
        deleted_at: null,
        id: id
      }
    });

    const next = await this.ctx.model.MzcNews.findOne({
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
    const news = await this.ctx.model.MzcNews.findByPk(id);

    if (!news) throw new Error('没有找到相关文章');

    news.click = click;
    news.save();
  }
}

module.exports = NewsService;
