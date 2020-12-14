/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 20:59:29
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-14 18:29:26
 */
'use strict';

const { Op } = require('sequelize');
const Service = require('egg').Service;
const GetTree = require('../utils/getTree');
const HttpStatus = require('../utils/httpStatus');
class RoutesService extends Service {

  /**
   * 角色菜单权限
   * @param { String } roles 群组
   * @param { String } rolesMenu 个人
   * @param { Array } permissionsRoutes 路由菜单
   */
  async roles (roles, rolesMenu, permissionsRoutes = []) {
    const userRoles = roles.menu_id.split(',')
    /**
     * 群组
     */
    const rolesRoutes = await this.ctx.model.MzcRoutes.findAll({
      where: {
        id: userRoles,
      },
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    });

    permissionsRoutes.push(...rolesRoutes)

    if (rolesMenu) {
      const userRole = rolesMenu.menu_id.split(',')
      /**
       * 单独权限
       */
      const roleRole = await this.ctx.model.MzcRoutes.findAll({
        where: {
          id: userRole,
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
      });

      permissionsRoutes.push(...roleRole)
    }

    return { data: GetTree.menuList(permissionsRoutes, 'router') };
  }
}

module.exports = RoutesService;
