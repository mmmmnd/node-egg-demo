/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 20:59:29
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-30 18:02:27
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
const GetTree = require('../utils/getTree');
const HttpStatus = require('../utils/httpStatus');

class RoutesService extends Service {

	async index (params, admin) {
		var permissionsRoutes = [];
		var data1 = [];
		var data2 = [];
		const constantRoutes = await this.ctx.model.MzcRoutes.findAll({
			where: {
				role: 0,
				deleted_at: null
			},
			attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
		});


		data1 = await this.ctx.model.MzcRoutes.findAll({
			where: {
				role: { [Op.ne]: 0 },
			},
			attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
		});

		// if (params.role !== 0) {
		// 	data1 = await this.ctx.model.MzcRoutes.findAll({
		// 		where: {
		// 			role: { [Op.gte]: params.role },
		// 		},
		// 		attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
		// 	});
		// 	if (params.roles !== '0') {
		// 		data2 = await this.ctx.model.MzcRoutes.findAll({
		// 			where: {
		// 				id: params.roles,
		// 			},
		// 			attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
		// 		});
		// 	}

		// 	permissionsRoutes.push(...data1, ...data2);
		// }

		return {
			data: {
				constantRoutes: GetTree.routesList(constantRoutes),
				permissionsRoutes: GetTree.routesList(data1, [], params, admin),
			}
		}
	}
}

module.exports = RoutesService;