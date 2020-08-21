/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-18 16:10:49
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const ctx = this.ctx;
    ctx.body = await ctx.service.home.list();
  }
}

module.exports = HomeController;
