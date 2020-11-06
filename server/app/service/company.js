/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:27:48
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-06 11:35:49
 */
'use strict';


const Service = require('egg').Service;
/**
 * 旗下公司
 */
class CompanyService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);

    try {
      const company = await this.ctx.model.MzcCompany.findAndCountAll({
        where: {
          deleted_at: null
        },
        offset: (page - 1) * maxPage,
        limit: maxPage,
      })

      if (company.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

      return {
        data: company.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: company.count,
          total_pages: Math.ceil(company.count / maxPage),
        }
      }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 详情
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  async detail (cid) {
    return await this.ctx.model.MzcCompany.findAll({
      where: {
        category_id: cid,
        deleted_at: null
      },
    });
  }
}

module.exports = CompanyService;
