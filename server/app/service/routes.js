/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 20:59:29
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-07 15:47:01
 */
'use strict';

const { Op } = require('sequelize');
const Service = require('egg').Service;
const GetTree = require('../utils/getTree');
const HttpStatus = require('../utils/httpStatus');
class RoutesService extends Service {

  /**
   * 角色权限
   * @param { Array } userInfo 用户数据
   */
  async roles ({ userRole, userRoles }) {

    const permissionsRoutes = []

    /**
     * 群组
     */
    const role = await this.ctx.model.MzcRoutes.findAll({
      where: {
        role: { [Op.gte]: userRole },
      },
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    });

    permissionsRoutes.push(...role)

    /**
     * 单独权限
     */
    if (userRoles) {
      userRoles = userRoles.split(',')
      const roles = await this.ctx.model.MzcRoutes.findAll({
        where: {
          id: userRoles,
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
      });

      permissionsRoutes.push(...roles)
    }

    return { data: GetTree.menuList(permissionsRoutes, 'router') };
  }
}

module.exports = RoutesService;
