/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-29 11:17:48
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-21 17:10:08
 */
'use strict';

const GetTree = require('../utils/getTree');
const Controller = require('egg').Controller;

class AboutDroptypeController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;

    const about = await this.ctx.service.about.index(params); // 列表数据
    const aboutDroptype = await this.ctx.service.aboutDroptype.list(); // 下拉分类
    const aboutSingleMenu = await this.ctx.service.menu.details(6, 4); // 父分类
    const data = GetTree.aboutList(about, aboutDroptype, aboutSingleMenu);

    await this.ctx.helper.checkData({ data });
  }
  /**
   * 修改
   */
  async update () {
    const params = this.ctx.request.body;

    const aboutDroptype = await this.ctx.service.aboutDroptype.update(params);
    await this.ctx.helper.checkData(aboutDroptype);
  }
  /**
   * 编辑
   */
  async edit () {
    const params = this.ctx.request.body;

    const aboutDroptype = await this.ctx.service.aboutDroptype.edit(params)
    await this.ctx.helper.checkData(aboutDroptype);
  }
}

module.exports = AboutDroptypeController;