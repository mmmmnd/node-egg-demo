/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-11 15:33:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-23 09:51:34
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
   * @param { String } menu_id 
   * @param { String } api_id 
   * @param { String } roles_name 
   * @param { String } describe 
   * @param { Boolean } status 
   * @param { Number } sort 
   */
  async add ({ menu_id = '[]', api_id = '[]', roles_name, describe, status, sort }) {
    await this.ctx.model.MzcRoles.create({
      menu_id, api_id, roles_name, describe, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    const roles = await this.ctx.model.MzcRoles.update({ [key]: value }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!roles[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 修改
   * @param { Number } id 群组id
   * @param { String } menu_id 数组菜单
   * @param { String } api_id 数组接口
   * @param { String } roles_name 群组名
   * @param { String } describe 描述
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async edit ({ id, menu_id = '[]', api_id = '[]', roles_name, describe, status, sort }) {
    const roles = await this.ctx.model.MzcRoles.update({
      menu_id, api_id, roles_name, describe, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!roles[0]) return { httpStatus: HttpStatus.INVALID_REQUEST, msg: '没有找到相关信息' };

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = RolesService;
