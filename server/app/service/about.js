/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:13:20
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-30 10:03:13
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 下拉详情
 */
class AboutService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);
    try {
      const about = await this.ctx.model.MzcAbout.findAndCountAll({
        where: {
          deleted_at: null
        },
        offset: (page - 1) * maxPage,
        limit: maxPage,
      })

      if (about.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

      return {
        data: about.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: about.count,
          total_pages: Math.ceil(about.count / maxPage),
        }
      }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 下拉列表
   * @param { String } cid 二级菜单id
   */
  async list (cid) {
    return await this.ctx.model.MzcAbout.findAll({
      where: {
        deleted_at: null,
        category_id: { [Op.lte]: cid }
      }
    });
  }
}

module.exports = AboutService;
