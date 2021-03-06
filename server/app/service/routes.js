/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 20:59:29
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-18 19:51:00
 */
'use strict';

const await = require('await-stream-ready/lib/await');
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
    if (!roles.api_id) rolesMenu.api_id = '[]'
    if (!rolesMenu.api_id) rolesMenu.api_id = '[]'
    if (!rolesMenu.menu_id) rolesMenu.menu_id = '[]'

    const userRolesApi = [...JSON.parse(roles.api_id), ...JSON.parse(rolesMenu.api_id)]
    const userRolesMenu = [...JSON.parse(roles.menu_id), ...JSON.parse(rolesMenu.menu_id)]
    /**
     * 群组和个人权限合集
     */
    const api = await this.ctx.service.api.getRolesAndUserApi(userRolesApi); // 个人接口权限
    const menu = await this.ctx.model.MzcRoutes.findAll({
      where: {
        id: [...new Set(userRolesMenu)], //去重
        status: true,
        deleted_at: null
      },
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    });

    return { data: GetTree.menuAndApiList(menu, api, 'router') };
  }
  /**
   * 获取列表
   * @param { String } type 类型
   */
  async list (type) {
    const routes = await this.ctx.model.MzcRoutes.findAll({
      where: {
        deleted_at: null
      },
    });

    return type !== 'apiGetRoutes'
      ? { data: GetTree.apiList(routes, [], 'apiList') }
      : routes
  }
  /**
   * 增加
   * @param { Number } pid 父id
   * @param { String } path 路径
   * @param { String } name name名
   * @param { String } component 对应前端路由
   * @param { String } redirect 重定向
   * @param { String } title 标题
   * @param { String } icon icon图标
   * @param { Boolean } noCache 是否缓存
   * @param { Boolean } hidden 是否隐藏
   * @param { Boolean } breadcrumb 是否隐藏面包屑
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async add ({ pid = 0, path, name, component, redirect, title, icon, affix, noCache, hidden, breadcrumb, status, sort }) {
    await this.ctx.model.MzcRoutes.create({
      pid, path, name, component, redirect, title, icon, affix, noCache, hidden, breadcrumb, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Number } index id
   * @param { Number } pid 父id
   * @param { String } path 路径
   * @param { String } name name名
   * @param { String } component 对应前端路由
   * @param { String } redirect 重定向
   * @param { String } title 标题
   * @param { String } icon icon图标
   * @param { Boolean } noCache 是否缓存
   * @param { Boolean } hidden 是否隐藏
   * @param { Boolean } breadcrumb 是否隐藏面包屑
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async edit ({ index, pid = 0, path, name, component, redirect, title, icon, affix, noCache, hidden, breadcrumb, status, sort }) {
    const routes = await this.ctx.model.MzcRoutes.update({
      pid, path, name, component, redirect, title, icon, affix, noCache, hidden, breadcrumb, status, sort
    }, {
      where: {
        id: index,
        deleted_at: null
      },
    })

    if (!routes[0]) return { httpStatus: HttpStatus.INVALID_REQUEST, msg: '没有找到相关信息' };

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = RoutesService;
