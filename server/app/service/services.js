/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:24:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-01 17:48:24
 */
'use strict';
/**
 * 服务领域
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class ServicesService extends Service {
  /**
   * 服务领域列表
   */
  async list () {
    return await this.ctx.model.MzcServices.findAll({
      where: {
        status: true,
        deleted_at: null
      },
    })
  }
  /**
   * 详情
   * @param { Number } params 分类id
   */
  async detail (params) {
    const filter = typeof params === 'object'
      ? { category_id: params.category_id, deleted_at: null }
      : { category_id: params, deleted_at: null, status: true };

    return await this.ctx.model.MzcServices.findOne({
      where: filter
    });
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, category_id, title, keywords, description, image, content, status, sort } = params;

    await this.ctx.model.MzcServices.update({
      category_id, title, keywords, description, image, content, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })
    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = ServicesService;
