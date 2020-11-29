/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 20:59:29
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-29 21:48:25
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
const GetTree = require('../utils/getTree');
const HttpStatus = require('../utils/httpStatus');

class RoutesService extends Service {

	async index(params){
		const permissionsRoutes = [];
		const constantRoutes = await this.ctx.model.MzcRoutes.findAll({
			where: {
				role: { [Op.gte]: 4 },
			},
			attributes: { exclude: ['created_at','updated_at','deleted_at'] }
		});

		const data1 = await this.ctx.model.MzcRoutes.findAll({
			where: {
				role: { [Op.gte]: 3 },
			},
			attributes: { exclude: ['created_at','updated_at','deleted_at'] }
		});

		const data2 = await this.ctx.model.MzcRoutes.findAll({
			where: {
				id:params.roles,
			},
			attributes: { exclude: ['created_at','updated_at','deleted_at'] }
		});
		permissionsRoutes.push(...data1,...data2);

		return { 
			data: {
				constantRoutes:GetTree.routesList(constantRoutes),
				permissionsRoutes:GetTree.routesList(permissionsRoutes),
			} 
		}
	}
}

module.exports = RoutesService;