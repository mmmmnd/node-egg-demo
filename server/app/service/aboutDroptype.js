/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:12:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-27 16:49:49
 */
'use strict';

const { Op } = require('sequelize')
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
  async index (cid) {

    const filter = cid
      ? { dropId: cid, status: true, deleted_at: null }
      : { deleted_at: null };

    const include = cid ? [{
      as: 'info',
      where: { status: true },
      model: this.ctx.model.MzcAbout,
      order: [['id', 'ASC']],
    }] : '';

    let aboutDroptype = await this.ctx.model.MzcAboutDroptype.findAll({
      include,
      where: filter,
      order: [['sort', 'ASC']],
    });

    if (cid == 4) {
      const about = await this.ctx.service.about.list(cid);

      aboutDroptype = JSON.parse(JSON.stringify(aboutDroptype));
      aboutDroptype[0].info = about;
    }

    return aboutDroptype
  }
  /**
   * 详情
   * @param { String } cid 二级菜单id
   */
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
  /**
   * 编辑
   * @param { String } title 标题
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   * @param { Number } id id
   */
  async edit ({ dropId, dropContent, status, sort, id }) {
    try {
      await this.ctx.model.MzcAboutDroptype.update({
        dropId, dropContent, status, sort
      }, {
        where: {
          id,
          deleted_at: null
        },
      })
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 增加
   * @param { Number } dropId 下拉id
   * @param { String } dropContent 标题
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async add ({ dropId, dropContent, status, sort }) {
    try {
      await this.ctx.model.MzcAboutDroptype.create({
        dropId,
        dropContent,
        status,
        sort,
      });
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 删除
   * @param { Number } id 
   */
  async destroy ({ id }) {
    const aboutDroptype = await this.ctx.model.MzcAboutDroptype.findByPk(id);

    if (!aboutDroptype) return { httpStatus: HttpStatus.NOT_FOUND, msg: '没有找到相关信息' };

    aboutDroptype.destroy();

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 列表
   * @param { Number } id 不显示全部
   */
  async list (id = 1) {
    const aboutDroptype = await this.ctx.model.MzcAboutDroptype.findAll({
      where: {
        id: { [Op.gt]: id },
        deleted_at: null
      },
      order: [['sort', 'ASC']],
    });

    return { data: aboutDroptype }
  }
}

module.exports = AboutDroptypeService;
