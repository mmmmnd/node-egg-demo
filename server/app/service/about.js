/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:13:20
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-05 17:25:01
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 下拉详情
 */
class AboutService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1, category_id, product_id }) {
    const maxPage = Number(limit);
    const filter = category_id
      ? { category_id, deleted_at: null }
      : { product_id, deleted_at: null };


    let about = await this.ctx.model.MzcAbout.findAndCountAll({
      where: filter,
      offset: (page - 1) * maxPage,
      limit: maxPage,
    })

    if (about.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    const aboutDroptype = await this.ctx.service.aboutDroptype.index(); // 下拉分类

    about = JSON.parse(JSON.stringify(about));

    about.rows.map(item => {
      return aboutDroptype.map(childItem => {
        if (item.category_id == childItem.id) return item.dropContent = childItem.dropContent;
      })
    })

    return {
      data: {
        data: about.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: about.count,
          total_pages: Math.ceil(about.count / maxPage),
        }
      }
    }
  }
  /**
   * 下拉列表
   * @param { String } cid 二级菜单id
   */
  async list (cid) {
    const about = await this.ctx.model.MzcAbout.findAll({
      where: {
        status: true,
        deleted_at: null,
        product_id: cid
      },
      order: [['sort', 'DESC']],
    });

    return about
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    const aboutDroptype = await this.ctx.model.MzcAbout.update({ [key]: value }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!aboutDroptype) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 增加
   * @param { Object } params 参数
   */
  async add (params) {
    const { category_id, product_id, title, content, avatar_image, status, sort } = params;
    await this.ctx.model.MzcAbout.create({
      category_id, product_id, title, content, avatar_image, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 删除
   * @param { Array }  params id数组
   */
  async destroy (params) {
    await this.ctx.model.MzcAbout.destroy({
      where: { id: params }
    })

    return { httpStatus: HttpStatus.OK }
  }
  /**
  * 编辑
  * @param { Object } params 参数
  */
  async edit (params) {
    const { id, category_id, product_id, title, content, avatar_image, status, sort } = params;

    await this.ctx.model.MzcAbout.update({
      category_id, product_id, title, content, avatar_image, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })
    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 移动
   * @param { Number } category_id 类别id
   * @param { Array } ids 移动的数组
   * @param { Number } product_id 父id
   */
  async move ({ category_id, ids, product_id }) {
    const about = await this.ctx.model.MzcAbout.findAll({
      where: { id: ids }
    });

    about.map(item => {
      item.category_id = category_id
      item.product_id = product_id
      item.save();
    })

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = AboutService;
