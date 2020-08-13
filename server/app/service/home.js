/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-12 17:17:32
 */
'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async list (id = 1) {
    // return await this.ctx.model.MzcRecruit.findByPk(id);
    return this.ctx.model.MzcRecruitDroptype.findAll({
      include: [{
        as: 'recruit',
        model: this.ctx.model.MzcRecruit,
        order: [['id', 'ASC']],
      }],
      order: [['id', 'ASC']],
    });
  }
}

module.exports = HomeService;
