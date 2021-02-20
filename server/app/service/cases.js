/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:21:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 16:21:44
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 合作案例
 */
class CasesService extends Service {
  /**
   * 获取列表
   * @param { Number } limit 限制页
   * @param { Number } page 当前页
   * @param { String } category_id  二级菜单id
   * @param { Number } product_id  分类id
   */
  async index ({ limit = 20, page = 1, category_id, product_id }) {
    const maxPage = Number(limit);
    const filter = product_id
      ? { product_id, category_id, deleted_at: null }
      : { category_id, deleted_at: null };

    const cases = await this.ctx.model.MzcCases.findAndCountAll({
      where: filter,
      offset: (page - 1) * maxPage,
      limit: maxPage,
      order: [['id', 'DESC']],
    })

    if (cases.rows.length == 0) throw new Error('没有找到相关信息');

    return {
      data: {
        data: cases.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: cases.count,
          total_pages: Math.ceil(cases.count / maxPage),
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
    const cases = await this.ctx.model.MzcCases.update({ [key]: value }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!cases[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 删除
   * @param { Number } id 
   */
  async destroy ({ id }) {
    const cases = await this.ctx.model.MzcCases.findByPk(id);

    if (!cases) return { httpStatus: HttpStatus.NOT_FOUND, msg: '没有找到相关信息' };

    cases.destroy();

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, category_id, product_id, site_title, keywords, description, title, image, content, status, sort } = params;

    await this.ctx.model.MzcCases.update({
      category_id, product_id, site_title, keywords, description, title, image, content, status, sort
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
    const { category_id, product_id, site_title, keywords, description, title, image, content, status, sort } = params;

    await this.ctx.model.MzcCases.create({
      category_id, product_id, site_title, keywords, description, title, image, content, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 列表
   * @param { Number } category_id 二级菜单id
   * @param { Number } page 分页
   */
  async list (category_id, page) {
    const pageSize = category_id == 26 ? 9 : 20;
    const cases = await this.ctx.model.MzcCases.findAndCountAll({
      where: {
        category_id,
        status: true,
        deleted_at: null
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['sort', 'DESC'], ['id', 'DESC']],
    })

    if (cases.rows.length == 0) throw new Error('没有找到相关信息');

    return {
      data: cases.rows,
      meta: {
        current_page: parseInt(page),
        per_page: pageSize,
        total: cases.count,
        total_pages: Math.ceil(cases.count / pageSize),
      }
    }

  }
  /**
   * 详情
   * @param { Number } category_id 二级菜单id
   */
  async detail (category_id) {
    return await this.ctx.model.MzcCases.findAll({
      where: {
        category_id,
        status: true,
        deleted_at: null
      },
      limit: category_id == 26 ? 5 : 10,
      order: [['sort', 'DESC'], ['id', 'DESC']],
    })
  }
  /**
   * 详情页
   * @param { Number } category_id 二级菜单id
   * @param { Number } id 文章id号 
   */
  async info (category_id, id) {
    let current, previous, next;
    const cases = await this.ctx.model.MzcCases.findAll({
      where: {
        category_id,
        deleted_at: null,
        status: true,
      },
      order: [['sort', 'DESC'], ['id', 'DESC']],
    });
    cases.find((item, index) => {
      if (item.id == id) {
        current = item;
        previous = cases[index - 1];
        next = cases[index + 1];
      }
    })

    if (!cases) throw new Error('没有找到相关文章');

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
    const cases = await this.ctx.model.MzcCases.findByPk(id);

    if (!cases) throw new Error('没有找到相关文章');

    cases.click = click;
    cases.save();
  }
  /**
   * 移动
   * @param { Number } product_id 类别id
   * @param { Array } ids 移动的数组
   */
  async move ({ product_id, ids }) {
    const cases = await this.ctx.model.MzcCases.findAll({
      where: { id: ids }
    });

    cases.map(item => {
      item.product_id = product_id
      item.save();
    })

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = CasesService;
