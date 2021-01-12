/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-15 19:42:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-12 16:00:04
 */
'use strict';
/**
 * 异常记录
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class ExceptionService extends Service {
  /**
   * 获取列表
   * @param { String } limit 最大限制
   * @param { String } page 分页
   */
  async index ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);

    const exception = await this.ctx.model.MzcException.findAndCountAll({
      where: { deleted_at: null },
      offset: (page - 1) * maxPage,
      limit: maxPage,
      order: [['id', 'DESC']],
    })

    if (exception.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return {
      data: {
        data: exception.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: exception.count,
          total_pages: Math.ceil(exception.count / maxPage),
        }
      }
    }
  }
  /**
   * 增加
   * @param { String } urlPathName 接口地址
   * @param { Object } userInfo 用户信息
   * @param { Object || String} headers 浏览器头部信息
   */
  async add (urlPathName, userInfo, headers) {

    const create = new this.ctx.model.MzcException
    create.user_id = userInfo.userId
    create.ip = this.ctx.ip
    create.headers = headers
    create.api = urlPathName

    create.save()

  }

}

module.exports = ExceptionService;
