/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:40:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-28 15:00:59
 */
'use strict';

const AboutDao = require('./about');

/**
 * 下拉菜单
 */
class AboutDroptypeDao extends AboutDao {
  /**
   * 下拉菜单列表
   * @param { Object } ctx 全局this
   * @param { String } cid 二级菜单id
   */
  static async list (ctx, cid) {
    const aboutDroptype = await ctx.model.MzcAboutDroptype.findAll({
      where: {
        dropId: cid,
        deleted_at: null,
      },
      include: [{
        as: 'info',
        model: ctx.model.MzcAbout,
        order: [['id', 'ASC']],
      }],
      order: [['id', 'ASC']],
    });

    if (cid === '4') {
      const about = await super.list(ctx, cid);

      aboutDroptype[0].info = about;
      aboutDroptype[0].dataValues.info = about;
      aboutDroptype[0]._previousDataValues.info = about;
    }

    return { ...aboutDroptype }

  }
  static async detail(ctx,cid = 2){
    return await ctx.model.MzcAboutDroptype.findOne({
      where: {
        dropId: cid,
        deleted_at: null,
      },
      include: [{
        as: 'info',
        model: ctx.model.MzcAbout,
        order: [['id', 'ASC']],
      }],
    })
  }
}

module.exports = AboutDroptypeDao;
