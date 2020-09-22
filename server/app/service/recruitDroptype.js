/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 11:29:26
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:49:48
 */
'use strict';

const Service = require('egg').Service;

class RecruitDroptypeService extends Service {
  /**
   * 列表
   */
  async list () {
    return await this.ctx.model.MzcRecruitDroptype.findAll({
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