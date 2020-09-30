/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-29 11:17:48
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-30 11:31:46
 */
'use strict';

const Controller = require('egg').Controller;

class AboutDroptypeController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const params = this.ctx.query;

    const about = await this.ctx.service.about.index(params); // 列表数据
    const aboutDroptype = await this.ctx.service.aboutDroptype.list(); // 下拉分类
    const aboutSingleMenu = await this.ctx.service.menu.details(6, 4) // 父分类
    await this.ctx.helper.checkData({ data: { about, aboutDroptype, aboutSingleMenu } });
  }
}

module.exports = AboutDroptypeController;