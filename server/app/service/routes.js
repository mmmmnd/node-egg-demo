/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 20:59:29
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-25 10:26:35
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
  async index (roles, rolesMenu) {
    if (!roles.menu_id) roles.menu_id = '[]'
    if (!rolesMenu.menu_id) rolesMenu.menu_id = '[]'
    const userRoles = [...JSON.parse(roles.menu_id), ...JSON.parse(rolesMenu.menu_id)]
    /**
    * 群组和个人菜单合集
    */
    const rolesRoutes = await this.ctx.model.MzcRoutes.findAll({
      where: {
        id: [...new Set(userRoles)], //去重
      },
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    });

    return { data: GetTree.menuList(rolesRoutes, 'router') };
  }
  /**
   * 获取列表
   */
  async list (type) {
    const routes = await this.ctx.model.MzcRoutes.findAll({
      where: {
        deleted_at: null
      },
    });

    return type !== 'apiGetRoutes'
      ? { data: GetTree.menuList(routes, 'menu') }
      : routes
  }
}

module.exports = RoutesService;
