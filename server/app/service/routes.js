/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 20:59:29
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-04 11:41:31
 */
'use strict';

const { Op } = require('sequelize');
const Service = require('egg').Service;
const GetTree = require('../utils/getTree');
const HttpStatus = require('../utils/httpStatus');
class RoutesService extends Service {

  /**
   * 角色权限
   * @param { Array } admin 用户数据
   */
  async roles (admin) {
    const permissionsRoutes = await this.ctx.model.MzcRoutes.findAll({
      where: {
        role: { [Op.ne]: 0 },
      },
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    });
    return { data: GetTree.routesList(permissionsRoutes, [], admin) };
  }
}

module.exports = RoutesService;
