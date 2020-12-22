/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-11 15:33:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-22 18:25:40
 */
'use strict';
/**
 * 群组
 */
const Service = require('egg').Service;
const GetTree = require('../utils/getTree');
const HttpStatus = require('../utils/httpStatus');

class RolesService extends Service {
  /**
  * 获取列表
  * @param { String } limit 最大限制
  * @param { String } page 分页
  */
  async index ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);
    const roles = await this.ctx.model.MzcRoles.findAndCountAll({
      where: {
        deleted_at: null
      },
      offset: (page - 1) * maxPage,
      limit: maxPage,
    })

    if (roles.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return {
      data: {
        data: roles.rows,
        meta: {
          current_page: Number(page),
          per_page: maxPage,
          total: roles.count,
          total_pages: Math.ceil(roles.count / maxPage),
        }
      }
    }

  }
  /**
   * 详情
   * @param { Number } id 群组id
   */
  async detail (id) {
    return await this.ctx.model.MzcRoles.findOne({
      where: { id }
    })
  }
  /**
   * 增加
   * @param { Object } params 参数
   */
  async add ({ menu_id = '', api_id = '', roles_name, describe, status, sort }) {
    await this.ctx.model.MzcRoles.create({
      menu_id, api_id, roles_name, describe, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = RolesService;
