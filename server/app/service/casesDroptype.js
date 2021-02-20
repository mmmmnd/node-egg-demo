/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-19 15:56:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 15:30:50
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 合作案例
 */
class CasesService extends Service {
  /**
   * 
   * @param { Number } limit 限制页
   * @param { Number } page 当前页
   */
  async index ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);
    const casesDroptype = await this.ctx.model.MzcCasesDroptype.findAndCountAll({
      where: {
        deleted_at: null
      },
      offset: (page - 1) * maxPage,
      limit: maxPage,
    })

    if (casesDroptype.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return {
      data: {
        data: casesDroptype.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: casesDroptype.count,
          total_pages: Math.ceil(casesDroptype.count / maxPage),
        }
      }
    }

  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    const casesDroptype = await this.ctx.model.MzcCasesDroptype.update({ [key]: value }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!casesDroptype) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 删除
   * @param { Number } id 
   */
  async destroy ({ id }) {
    const casesDroptype = await this.ctx.model.MzcCasesDroptype.findByPk(id);

    if (!casesDroptype) return { msg: '没有找到相关信息', httpStatus: HttpStatus.NOT_FOUND };

    casesDroptype.destroy();

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, title, status, sort } = params;

    await this.ctx.model.MzcCasesDroptype.update({
      title, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 增加
   * @param { Object } params 参数
   */
  async add (params) {
    const { title, status, sort } = params;

    await this.ctx.model.MzcCasesDroptype.create({
      title, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 列表
   */
  async list () {
    return await this.ctx.model.MzcCasesDroptype.findAll({
      where: {
        status: true,
        deleted_at: null
      }
    })

  }
}

module.exports = CasesService;
