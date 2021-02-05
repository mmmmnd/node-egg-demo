/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:27:48
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-05 11:38:19
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 旗下公司
 */
class CompanyService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1, category_id }) {
    const maxPage = Number(limit);
    const filter = category_id
      ? { category_id, deleted_at: null }
      : { deleted_at: null };

    const company = await this.ctx.model.MzcCompany.findAndCountAll({
      where: filter,
      offset: (page - 1) * maxPage,
      limit: maxPage,
    })

    if (company.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return {
      data: {
        data: company.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: company.count,
          total_pages: Math.ceil(company.count / maxPage),
        }
      }
    }
  }
  async list (cid) {
    return await this.ctx.model.MzcCompany.findAll({
      where: {
        category_id: cid,
        status: true,
        deleted_at: null
      },
      order: [['sort', 'DESC'], ['id', 'ASC']],
    });
  }
  /**
   * 详情
   * @param { Number } cid 二级菜单id
   * @param { Number } id 列表id
   */
  async detail (id, cid) {
    return await this.ctx.model.MzcCompany.findOne({
      where: {
        id,
        category_id: cid,
        status: true,
        deleted_at: null
      },
    });
  }
  /**
   * 查找当前二级菜单最大排序id
   * @param { Number } cid  二级菜单id
   */
  async getMaxId (cid) {
    const company = await this.ctx.model.MzcCompany.findOne({
      where: {
        category_id: cid,
        status: true,
        deleted_at: null
      },
      order: [['sort', 'DESC'], ['id', 'ASC']],
    });

    return company
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    const company = await this.ctx.model.MzcCompany.update({ [key]: value }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!company[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, category_id, site_title, keywords, description, title, content, image, address, website, email, phone, status, sort } = params;

    await this.ctx.model.MzcCompany.update({
      category_id, site_title, keywords, description, title, content, image, address, website, email, phone, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 删除
   * @param { Array }  params id数组
   */
  async destroy (params) {
    await this.ctx.model.MzcCompany.destroy({
      where: { id: params }
    })

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 增加
   * @param { Object } params 参数
   */
  async add (params) {
    const { category_id, site_title, keywords, description, title, content, image, address, website, email, phone, status, sort } = params;

    await this.ctx.model.MzcCompany.create({
      category_id, site_title, keywords, description, title, content, image, address, website, email, phone, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 移动
   * @param { Number } category_id 类别id
   * @param { Array } ids 移动的数组
   */
  async move ({ category_id, ids }) {
    const company = await this.ctx.model.MzcCompany.findAll({
      where: { id: ids }
    });

    company.map(item => {
      item.category_id = category_id
      item.save();
    })

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = CompanyService;
