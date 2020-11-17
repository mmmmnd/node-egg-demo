/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 11:29:26
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-17 16:05:07
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class RecruitDroptypeService extends Service {
  /**
  * 获取列表
  */
  async index () {
    const recruitDroptype = await this.ctx.model.MzcRecruitDroptype.findAll({
      where: {
        deleted_at: null
      }
    });

    return { data: recruitDroptype }
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
        order: [['id', 'ASC']],
      }],
      order: [['id', 'ASC']],
    });
  }

}

module.exports = RecruitDroptypeService;