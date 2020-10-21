/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:12:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-21 16:54:18
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 下拉菜单
 */
class AboutDroptypeService extends Service {
  /**
   * 下拉菜单列表
   * @param { String } cid 二级菜单id
   */
  async list (cid) {

    const filter = cid
      ? { dropId: cid, status: true, deleted_at: null }
      : { status: true, deleted_at: null };

    const include = cid ? [{
      as: 'info',
      model: this.ctx.model.MzcAbout,
      order: [['id', 'ASC']],
    }] : '';

    let aboutDroptype = await this.ctx.model.MzcAboutDroptype.findAll({
      include,
      where: filter,
      order: [['id', 'ASC']],
    });

    if (cid == 4) {
      const about = await this.ctx.service.about.list(cid);

      aboutDroptype = JSON.parse(JSON.stringify(aboutDroptype));
      aboutDroptype[0].info = about;
    }

    return aboutDroptype
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
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    try {
      let aboutDroptype = await this.ctx.model.MzcAboutDroptype.update({ [key]: value }, {
        where: {
          id,
          deleted_at: null
        },
      })

      if (!aboutDroptype[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}

module.exports = AboutDroptypeService;
