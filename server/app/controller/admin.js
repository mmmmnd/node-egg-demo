/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:31:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-02 17:34:00
 */
'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
	async userCreate () {
		const params = this.ctx.request.body;
		await this.ctx.service.admin.userCreate(params);
	}
	async userVerify () {
		const params = this.ctx.request.body;
		await this.ctx.service.admin.userVerify(params);
	}
}

module.exports = AdminController;
