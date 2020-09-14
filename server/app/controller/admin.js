/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:31:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-14 17:52:17
 */
'use strict';
const AdminValidators = require('../validators/admin');
const adminValidators = new AdminValidators();

const Controller = require('egg').Controller;

class AdminController extends Controller {
	async create () {
		const params = this.ctx.request.body;

		const validators = await this.ctx.validate(adminValidators, params)
		if (!validators) return false;

		const admin = await this.ctx.service.admin.create(params);
		await this.ctx.helper.json(...admin)
	}
	async verify () {
		const params = this.ctx.request.body;

		const { nickname, password } = adminValidators;
		const validators = await this.ctx.validate({ nickname, password }, params);
		if (!validators) return false;

		await this.ctx.service.admin.verify(params);
	}
	async detail () {
		const { token } = this.ctx.request.header;
		await this.ctx.service.admin.detail(token);
	}
	async logout () {
		const { token } = this.ctx.request.header;
		await this.ctx.service.admin.logout(token);
	}
}

module.exports = AdminController;
