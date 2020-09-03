/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-03 10:32:22
 */
'use strict';

const AdminDao = require('../dao/admin');

const Service = require('egg').Service;

class AdminService extends Service {

	async userCreate (params) {
		const { ctx } = this;
		const adminCreate = await AdminDao.cerate(ctx, params);
		return ctx.body = adminCreate;
	}

	async userVerify (params) {
		const { ctx } = this;
		const adminVerify = await AdminDao.verify(ctx, params);
		return ctx.body = adminVerify;
	}

	async userDetail (params) {
		const { ctx } = this;
		const adminDetail = await AdminDao.detail(ctx, params);
		return ctx.body = adminDetail;
	}

}

module.exports = AdminService;
