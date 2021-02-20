/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 11:29:26
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 16:59:45
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class RecruitDroptypeService extends Service {
  /**
  * 获取列表
  */
  async index ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);

    try {

      const recruitDroptype = await this.ctx.model.MzcRecruitDroptype.findAndCountAll({
        where: {
          deleted_at: null
        },
        offset: (page - 1) * maxPage,
        limit: maxPage,
      });

      if (recruitDroptype.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

      return {
        data: {
          data: recruitDroptype.rows,
          meta: {
            current_page: parseInt(page),
            per_page: maxPage,
            total: recruitDroptype.count,
            total_pages: Math.ceil(recruitDroptype.count / maxPage),
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
      const MzcRecruitDroptype = await this.ctx.model.MzcRecruitDroptype.update({ [key]: value }, {
        where: {
          id,
          deleted_at: null
        },
      })

      if (!MzcRecruitDroptype[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

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
    const MzcRecruitDroptype = await this.ctx.model.MzcRecruitDroptype.findByPk(id);

    if (!MzcRecruitDroptype) return { httpStatus: HttpStatus.NOT_FOUND, msg: '没有找到相关信息' };

    MzcRecruitDroptype.destroy();

    return { msg: 1, httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, dropContent, status, sort } = params;

    try {
      await this.ctx.model.MzcRecruitDroptype.update({
        dropContent, status, sort
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
    const { dropContent, status, sort } = params;

    try {
      await this.ctx.model.MzcRecruitDroptype.create({
        dropContent, status, sort
      });
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 列表
   */
  async list () {
    return await this.ctx.model.MzcRecruitDroptype.findAll({
      where: {
        status: true,
        deleted_at: null
      },
      include: [{
        as: 'recruit',
        model: this.ctx.model.MzcRecruit,
        order: [['sort', 'DESC'], ['id', 'ASC']],
      }],
      order: [['sort', 'DESC'], ['id', 'ASC']],
    });
  }

}

module.exports = RecruitDroptypeService;