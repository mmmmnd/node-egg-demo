/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:20:38
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-12 12:01:31
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 新闻
 */
class NewsService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1, category_id }) {
    const maxPage = Number(limit);
    const filter = category_id
      ? { category_id, status: true, deleted_at: null }
      : { deleted_at: null };

    try {
      const news = await this.ctx.model.MzcNews.findAndCountAll({
        where: filter,
        offset: (page - 1) * maxPage,
        limit: maxPage,
      })

      if (news.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

      return {
        data: news.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: news.count,
          total_pages: Math.ceil(news.count / maxPage),
        }
      }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    try {
      const company = await this.ctx.model.MzcNews.update({ [key]: value }, {
        where: {
          id,
          deleted_at: null
        },
      })

      if (!company[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 删除
   * @param { Number } id 
   */
  async destroy ({ id }) {
    const company = await this.ctx.model.MzcNews.findByPk(id);

    if (!company) return { httpStatus: HttpStatus.NOT_FOUND, msg: '没有找到相关信息' };

    company.destroy();

    return { msg: 1, httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, category_id, title, keywords, companyDescription, cultureTitle, cultureDescription, filepath, content, status, sort } = params;

    try {
      await this.ctx.model.MzcNews.update({
        category_id, title, keywords, companyDescription, cultureTitle, cultureDescription, filepath, content, status, sort
      }, {
        where: {
          id,
          deleted_at: null
        },
      })
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 增加
   * @param { Object } params 参数
   */
  async add (params) {
    const { category_id, title, keywords, companyDescription, cultureTitle, cultureDescription, filepath, content, status, sort } = params;

    try {
      await this.ctx.model.MzcNews.create({
        category_id, title, keywords, companyDescription, cultureTitle, cultureDescription, filepath, content, status, sort
      });
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 详情
   * @param { Number } cid 二级菜单id
   * @param { Number } page 分页
   */
  async detail (cid, page) {
    const pageSize = 5;
    const news = await this.ctx.model.MzcNews.findAndCountAll({
      where: {
        category_id: cid,
        deleted_at: null,
        status: true,
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['sort', 'DESC'], ['id', 'DESC']],
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
   * 详情页
   * @param { Number } cid 二级菜单id
   * @param { Number } id 文章id号 
   */
  async info (cid, id) {
    let current, previous, next;
    const news = await this.ctx.model.MzcNews.findAll({
      where: {
        category_id: cid,
        deleted_at: null,
        status: true,
      },
      order: [['sort', 'DESC'], ['id', 'DESC']],
    });

    news.find((item, index) => {
      if (item.id == id) {
        current = item;
        previous = news[index - 1];
        next = news[index + 1];
      }
    })

    if (!news) throw new Error('没有找到相关文章');

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
