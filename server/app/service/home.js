/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-27 14:47:08
 */
'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async list (id = 1) {
    // return await this.ctx.model.MzcMessage.findByPk(id);
    // return this.ctx.model.MzcRecruitDroptype.findAll({
    //   include: [{
    //     as: 'recruit',
    //     model: this.ctx.model.MzcRecruit,
    //     order: [['id', 'ASC']],
    //   }],
    //   order: [['id', 'ASC']],
    // });
    const info = await this.ctx.model.MzcAbout.findAll({
      where: {
        deleted_at: null,
      }
    });
    const list = await this.ctx.model.MzcAboutDroptype.findAll({
      where: {
        deleted_at: null,
      },
      include: [{
        as: 'info',
        model: this.ctx.model.MzcAbout,
        order: [['id', 'ASC']],
      }],
      order: [['id', 'ASC']],
    });

    list[0].info = info;
    list[0].dataValues.info = info;
    list[0]._previousDataValues.info = info;

    return {
      ...list
    }


  }
}

module.exports = HomeService;
