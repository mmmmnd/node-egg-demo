/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-30 11:26:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-08 17:43:30
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 旗下公司
 */
class CultureService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1, category_id }) {
    const maxPage = Number(limit);

    const culture = await this.ctx.model.MzcCulture.findAndCountAll({
      where: {
        category_id,
        deleted_at: null
      },
      offset: (page - 1) * maxPage,
      limit: maxPage,
    })

    if (culture.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return {
      data: {
        data: culture.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: culture.count,
          total_pages: Math.ceil(culture.count / maxPage),
        }
      }
    }
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    const company = await this.ctx.model.MzcCulture.update({ [key]: value }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!company[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 删除
   * @param { Array }  params id数组
   */
  async destroy (params) {
    await this.ctx.model.MzcCulture.destroy({
      where: { id: params }
    })

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, category_id, site_title, keywords, description, title, image, content, status, sort } = params;

    await this.ctx.model.MzcCulture.update({
      category_id, site_title, keywords, description, title, image, content, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 增加
   * @param { Object } params 参数
   */
  async add (params) {
    const { category_id, site_title, keywords, description, title, image, content, status, sort } = params;

    await this.ctx.model.MzcCulture.create({
      category_id, site_title, keywords, description, title, image, content, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 详情
   * @param { Number } cid 二级菜单id
   * @param { Number } page 分页
   */
  async list (cid, page) {
    const pageSize = 5;
    const culture = await this.ctx.model.MzcCulture.findAndCountAll({
      where: {
        category_id: cid,
        deleted_at: null,
        status: true,
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['sort', 'DESC'], ['id', 'DESC']],
    })

    if (culture.rows.length == 0) throw new Error('没有找到相关信息');

    return {
      data: culture.rows,
      meta: {
        current_page: parseInt(page),
        per_page: pageSize,
        total: culture.count,
        total_pages: Math.ceil(culture.count / pageSize),
      }
    }
  }
  /**
   * 详情页
   * @param { Number } cid 二级菜单id
   * @param { Number } id 文章id号 
   */
  async info (cid, id) {
    let current, previous, next;
    const culture = await this.ctx.model.MzcCulture.findAll({
      where: {
        category_id: cid,
        deleted_at: null,
        status: true,
      },
      order: [['sort', 'DESC'], ['id', 'DESC']],
    });

    culture.find((item, index) => {
      if (item.id == id) {
        current = item;
        previous = culture[index - 1];
        next = culture[index + 1];
      }
    })

    if (!culture) throw new Error('没有找到相关文章');

    return {
      previous, current, next,
    };
  }
  /**
   * 点击浏览量
   * @param { Number } id 文章id号 
   * @param { Number } click 点击次数
   */
  async updateClick (id, click) {
    const culture = await this.ctx.model.MzcCulture.findByPk(id);

    if (!culture) throw new Error('没有找到相关文章');

    culture.click = click;
    culture.save();
  }
  /**
   * 移动
   * @param { Number } category_id 类别id
   * @param { Array } ids 移动的数组
   */
  async move ({ category_id, ids }) {
    const culture = await this.ctx.model.MzcCulture.findAll({
      where: { id: ids }
    });

    culture.map(item => {
      item.category_id = category_id
      item.save();
    })

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = CultureService;
