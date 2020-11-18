/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 11:27:03
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 08:41:34
 */
'use strict';
/**
 * 服务领域
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
class RecruitService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1, id }) {
    const maxPage = Number(limit);
    const filter = id
      ? { category_id: id, deleted_at: null }
      : { deleted_at: null };

    try {
      const recruit = await this.ctx.model.MzcRecruit.findAndCountAll({
        where: filter,
        offset: (page - 1) * maxPage,
        limit: maxPage,
      })

      if (recruit.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

      return {
        data: {
          data: recruit.rows,
          meta: {
            current_page: parseInt(page),
            per_page: maxPage,
            total: recruit.count,
            total_pages: Math.ceil(recruit.count / maxPage),
          }
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
      const recruit = await this.ctx.model.MzcRecruit.update({ [key]: value }, {
        where: {
          id,
          deleted_at: null
        },
      })

      if (!recruit[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

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
    const recruit = await this.ctx.model.MzcRecruit.findByPk(id);

    if (!recruit) return { httpStatus: HttpStatus.NOT_FOUND, msg: '没有找到相关信息' };

    recruit.destroy();

    return { msg: 1, httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, category_id, title, keywords, companyDescription, position, address, people, education, sex, content, status, sort } = params;

    try {
      await this.ctx.model.MzcRecruit.update({
        category_id, title, keywords, companyDescription, position, address, people, education, sex, content, status, sort
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
    const { category_id, title, keywords, companyDescription, position, address, people, education, sex, content, status, sort } = params;

    try {
      await this.ctx.model.MzcRecruit.create({
        category_id, title, keywords, companyDescription, position, address, people, education, sex, content, status, sort
      });
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 详情
   */
  async detail (id = 4) {
    return await this.ctx.model.MzcRecruit.findByPk(id);
  }
}

module.exports = RecruitService;
