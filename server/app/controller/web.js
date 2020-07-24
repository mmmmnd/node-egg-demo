/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 10:04:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-24 09:19:20
 */
'use strict';

const Controller = require('egg').Controller;

class HelloController extends Controller {
  async index() {
    await this.ctx.service.web.index();
  }
  async about() {
    const query = this.ctx.query;
    await this.ctx.service.web.about(query);
  }
  async services() {
    const query = this.ctx.query;
    await this.ctx.service.web.services(query);
  }
  async company() {
    const query = this.ctx.query;
    await this.ctx.service.web.company(query);
  }
  async error() {
    this.ctx.status = 404;
    await this.ctx.render('commom/404.ejs');
  }
}

module.exports = HelloController;
