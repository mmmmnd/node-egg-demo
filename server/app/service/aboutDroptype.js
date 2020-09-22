/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:12:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 10:19:54
 */
'use strict';

const Service = require('egg').Service;
/**
 * 下拉菜单
 */
class AboutDroptypeService extends Service {
  /**
   * 下拉菜单列表
   * @param { String } cid 二级菜单id
   */
  async list (cid) {
    const aboutDroptype = await this.ctx.model.MzcAboutDroptype.findAll({
      where: {
        dropId: cid,
        deleted_at: null,
      },
      include: [{
        as: 'info',
        model: this.ctx.model.MzcAbout,
        order: [['id', 'ASC']],
      }],
      order: [['id', 'ASC']],
    });

    if (cid === '4') {
      const about = await this.ctx.service.about.list(cid);

      aboutDroptype[0].info = about;
      aboutDroptype[0].dataValues.info = about;
      aboutDroptype[0]._previousDataValues.info = about;
    }

    return { ...aboutDroptype }

  }
  async detail (cid = 2) {
    return await this.ctx.model.MzcAboutDroptype.findOne({
      where: {
        dropId: cid,
        deleted_at: null,
      },
      include: [{
        as: 'info',
        model: this.ctx.model.MzcAbout,
        order: [['id', 'ASC']],
      }],
    })
  }
}

module.exports = AboutDroptypeService;
