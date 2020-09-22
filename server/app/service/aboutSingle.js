/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:35:57
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 17:06:26
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 单页
 */
class AboutSingleService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);
    try {
      const aboutSingle = await this.ctx.model.MzcAboutSingle.findAndCountAll({
        where: {
          deleted_at: null
        },
        offset: (page - 1) * maxPage,
        limit: maxPage,
      })

      if (aboutSingle.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

      return {
        data: {
          data: aboutSingle.rows,
          meta: {
            current_page: parseInt(page),
            per_page: maxPage,
            total: aboutSingle.count,
            total_pages: Math.ceil(aboutSingle.count / maxPage),
          }
        }
      }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 详情
   * @param { String } cid 父id
   */
  async detail (cid = 2) {
    return await this.ctx.model.MzcAboutSingle.findOne({
      where: {
        category_id: cid,
        status: true,
        deleted_at: null,
      }
    });
  }
  /**
  * 修改
  * @param { String } id 当前id
  * @param { String } key 字段名
  * @param { String } value 字段值
  */
  async update ({ id, key, value }) {
    try {
      await this.ctx.model.MzcAboutSingle.update({ [key]: value }, {
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
}

module.exports = AboutSingleService;
