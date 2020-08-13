/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 10:04:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-10 17:27:14
 */
'use strict';

const Controller = require('egg').Controller;

class HelloController extends Controller {
  async index () {
    await this.ctx.service.web.index();
  }
  async about () {
    const query = this.ctx.query;
    await this.ctx.service.web.about(query);
  }
  async services () {
    const query = this.ctx.query;
    await this.ctx.service.web.services(query);
  }
  async company () {
    const query = this.ctx.query;
    await this.ctx.service.web.company(query);
  }
  async culture () {
    const query = this.ctx.query;
    await this.ctx.service.web.culture(query);
  }
  async culture_info () {
    const { query } = this.ctx;
    await this.ctx.service.web.culture_info(query);
  }
  async news () {
    const query = this.ctx.query;
    await this.ctx.service.web.news(query);
  }
  async news_info () {
    const { query } = this.ctx;
    await this.ctx.service.web.news_info(query);
  }
  async cases () {
    const { query } = this.ctx;
    await this.ctx.service.web.cases(query);
  }
  async cases_info () {
    const { query } = this.ctx;
    await this.ctx.service.web.cases_info(query);
  }
  async recruit(){
    const { query } = this.ctx;
    await this.ctx.service.web.recruit(query);
  }
  async error () {
    this.ctx.status = 404;
    await this.ctx.render('commom/404.ejs');
  }
}

module.exports = HelloController;
