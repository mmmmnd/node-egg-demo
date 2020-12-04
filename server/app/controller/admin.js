/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:31:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-04 11:52:47
 */
'use strict';
const AdminValidators = require('../validators/admin');
const adminValidators = new AdminValidators();

const Controller = require('egg').Controller;

class AdminController extends Controller {
	/**
	 * 注册
	 */
	async create () {
		const params = this.ctx.request.body;

		//校验用户信息
		const validators = await this.ctx.validate(adminValidators, params)
		if (!validators) return false;

		const admin = await this.ctx.service.admin.create(params);
		await this.ctx.helper.checkData(admin);
	}
	/**
	 * 登录
	 */
	async login () {
		const params = this.ctx.request.body;

		//校验用户信息
		const { nickname, password } = adminValidators;
		const validators = await this.ctx.validate({ nickname, password }, params);
		if (!validators) return false;

		const admin = await this.ctx.service.admin.login(params);
		await this.ctx.helper.checkData(admin);
	}
	/**
	 * 当前用户信息
	 */
	async current () {
		const { token } = this.ctx.request.header;

		const admin = await this.ctx.service.admin.current(token);
		await this.ctx.helper.checkData(admin);
	}
	/**
	 * 退出
	 */
	async logout () {
		const admin = await this.ctx.service.admin.logout();
		await this.ctx.helper.checkData(admin);
	}
}

module.exports = AdminController;
