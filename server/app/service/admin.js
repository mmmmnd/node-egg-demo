/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-07 17:33:18
 */
'use strict';

const AdminDao = require('../dao/admin');

const Service = require('egg').Service;

class AdminService extends Service {

	async userCreate (params) {
		const { ctx } = this;
		await AdminDao.cerate(ctx, params);
	}

	async userVerify (params) {
		const { ctx } = this;
		await AdminDao.verify(ctx, params);
	}

	async userDetail (params) {
		const { ctx } = this;
		await AdminDao.detail(ctx, params);
	}

	async userLogout (params) {
		const { ctx } = this;
		await AdminDao.logout(ctx, params);
	}

}

module.exports = AdminService;
