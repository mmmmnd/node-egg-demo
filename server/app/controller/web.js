/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 10:04:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-25 17:19:59
 */
'use strict';

const Controller = require('egg').Controller;

class WebController extends Controller {
  async index () {
    await this.ctx.service.web.index();
  }
  async about () {
    const params = this.ctx.params
    await this.ctx.service.web.about(params);
  }
  async services () {
    const params = this.ctx.params
    await this.ctx.service.web.services(params);
  }
  async company () {
    const params = this.ctx.params
    await this.ctx.service.web.company(params);
  }
  async culture () {
    const params = this.ctx.params
    await this.ctx.service.web.culture(params);
  }
  async culture_info () {
    const params = this.ctx.params
    await this.ctx.service.web.culture_info(params);
  }
  async news () {
    const params = this.ctx.params
    await this.ctx.service.web.news(params);
  }
  async news_info () {
    const params = this.ctx.params
    await this.ctx.service.web.news_info(params);
  }
  async cases () {
    const params = this.ctx.params
    await this.ctx.service.web.cases(params);
  }
  async cases_info () {
    const params = this.ctx.params
    await this.ctx.service.web.cases_info(params);
  }
  async recruit () {
    const params = this.ctx.params
    await this.ctx.service.web.recruit(params);
  }
  async contact () {
    const params = this.ctx.params
    await this.ctx.service.web.contact(params);
  }
  async captcha () {
    const { query } = this.ctx;
    await this.ctx.service.web.captcha(query);
  }
  async error () {
    this.ctx.status = 404;
    await this.ctx.render('commom/404.ejs');
  }
}

module.exports = WebController;
