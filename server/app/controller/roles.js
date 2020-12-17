/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 10:00:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-17 18:20:27
 */
'use strict';

const await = require('await-stream-ready/lib/await');
const GetTree = require('../utils/getTree');
const Controller = require('egg').Controller;

class RolesController extends Controller {
  /**
   * 列表
   */
  async index () {
    const params = this.ctx.query;

    const api = await this.ctx.service.api.index() //接口列表
    const roles = await this.ctx.service.roles.index(params) //群组
    const rolesApi = await this.ctx.service.api.detailId(roles) //群组接口
    const routes = await this.ctx.service.routes.detail('pid', 0) //菜单名称
    const data = GetTree.checkedList(api, rolesApi, roles, routes)

    await this.ctx.helper.checkData(roles);
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const roles = await this.ctx.service.roles.update(params);
    await this.ctx.helper.checkData(roles);
  }
  /**
   * 删除
   */
  async destroy () {
    const params = this.ctx.request.body;

    const roles = await this.ctx.service.roles.destroy(params);
    await this.ctx.helper.checkData(roles);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const roles = await this.ctx.service.roles.edit(params)
    await this.ctx.helper.checkData(roles);
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const roles = await this.ctx.service.roles.add(params)
    await this.ctx.helper.checkData(roles);
  }
  /**
   * 角色接口
   */
  async routesDetail () {

    const api = await this.ctx.service.api.index()
    const routes = await this.ctx.service.routes.detail('pid', 0)
    const data = GetTree.menuList(routes, 'roles', api);

    await this.ctx.helper.checkData({ data });
  }
}

module.exports = RolesController