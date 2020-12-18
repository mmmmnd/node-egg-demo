/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 10:00:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-18 15:08:21
 */
'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {
  /**
   * 列表
   */
  async index () {
    const params = this.ctx.query;

    const roles = await this.ctx.service.roles.index(params) //群组
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
}

module.exports = RolesController