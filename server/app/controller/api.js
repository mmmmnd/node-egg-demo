/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-21 11:35:21
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-29 16:13:39
 */
'use strict';

const GetTree = require('../utils/getTree');
const Controller = require('egg').Controller;

class AdvertController extends Controller {
  /**
   * 详情
   */
  async index () {
    const api = await this.ctx.service.api.index()
    const routes = await this.ctx.service.routes.list('apiGetRoutes')
    const data = GetTree.apiList(routes, api);

    await this.ctx.helper.checkData({ data });
  }
  /**
   * 增加
   */
  async add () {
    const params = this.ctx.request.body;

    const api = await this.ctx.service.api.add(params)
    await this.ctx.helper.checkData(api);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const api = await this.ctx.service.api.edit(params)
    await this.ctx.helper.checkData(api);
  }
}

module.exports = AdvertController;