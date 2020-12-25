/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-25 17:35:41
 */
'use strict';

const moment = require('moment');
const bcrypt = require('bcryptjs')
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class AdminService extends Service {
	/**
	 * 注册
	 * @param { Object || String } params 用户信息
	 */
	async create ({ nickname, password }) {
		const { ctx } = this;

		try {
			const admin = await ctx.model.MzcAdmin.findOne({
				where: {
					nickname: nickname,
					deleted_at: null
				}
			})

			if (admin) return { msg: '管理员已存在', httpStatus: HttpStatus.FORBIDDEN };

			await this.ctx.model.MzcAdmin.create({
				nickname, password, register_ip: ctx.ip
			});

			return { msg: '管理员注册成功', httpStatus: HttpStatus.CREATED };
		} catch (error) {
			return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
		}
	}

	/**
	 * 登录
	 * @param { Object || String } params 用户信息
	 */
	async login (params) {
		const { ctx } = this;

		try {
			const admin = await ctx.model.MzcAdmin.findOne({
				where: {
					nickname: params.nickname,
					deleted_at: null
				}
			})

			if (!admin) return { msg: '账号不存在或者密码不正确', errorStatus: HttpStatus.INVALID_REQUEST };

			const login = bcrypt.compareSync(params.password, admin.password);

			if (!login) return { msg: '账号不存在或者密码不正确', errorStatus: HttpStatus.INVALID_REQUEST };

			if (!admin.status) return { msg: `当前账号已被禁用，有疑惑请联系系统管理员`, errorStatus: HttpStatus.FORBIDDEN };

			const adminRoles = await this.ctx.service.roles.detail(admin.roles_id);

			if (!adminRoles.status) return { msg: `当前[${adminRoles.roles_name}]角色已被禁用，有疑惑请联系系统管理员`, errorStatus: HttpStatus.FORBIDDEN };

			//颁发token secret -> 加密类型 params -> jwt参数
			const token = await ctx.app.jwt.sign({
				userId: admin.id,
				userRolesId: admin.roles_id
			}, ctx.app.config.jwt.secret, ctx.app.config.jwt.params);

			//获取redis保存的token
			const redisGetToken = await ctx.app.redis.get(ctx.app.config.usetToken + admin.id);
			if (redisGetToken) {
				//校验token令牌 secret -> 加密类型 params -> jwt参数
				const redisToken = await ctx.app.jwt.verify(redisGetToken, ctx.app.config.jwt.secret, ctx.app.config.jwt.params);

				return redisToken.userId === admin.id
					? { msg: '用户已登录！请半小时后再重新登录', errorStatus: HttpStatus.FORBIDDEN, code: 50012 }
					: { msg: '未知错误！', errorStatus: HttpStatus.INTERNAL_SERVER_ERROR };

			} else {
				//保存token 设置过期时间
				await ctx.app.redis.set(ctx.app.config.usetToken + admin.id, token);
				await ctx.app.redis.expire(ctx.app.config.usetToken + admin.id, ctx.app.config.expired);

				// 添加最后一次ip 次数 时间
				admin.last_login_ip = ctx.ip;
				admin.login_count = ++admin.login_count;
				admin.last_login_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
				admin.save();

				return { data: { token }, msg: '登录成功！' };
			}

		} catch (error) {
			return { msg: error.message, errorStatus: HttpStatus.INTERNAL_SERVER_ERROR };
		}
	}

	/**
	 * 查找用户信息
	 * @param { String } params token
	 */
	async current () {
		const [ctx, userInfo] = [this.ctx, global.userInfo];

		const admin = await ctx.model.MzcAdmin.findByPk(userInfo.userId, {
			attributes: { exclude: ['password'] }
		});

		return { data: admin, msg: '获取用户信息成功！' };
	}

	/**
	 * 退出
	 */
	async logout () {
		const [ctx, userInfo] = [this.ctx, global.userInfo];

		if (userInfo) {
			await ctx.app.redis.del(this.ctx.app.config.usetToken + userInfo.userId);
			return { msg: '退出登录成功', errorStatus: HttpStatus.OK, code: 0 };
		} else {
			return { msg: '非法请求！', errorStatus: HttpStatus.INTERNAL_SERVER_ERROR };
		}

	}
	/**
	 * 获取用户数据
	 * @param { String } limit 最大限制
	 * @param { String } page 分页
	 */
	async list ({ limit = 20, page = 1 }) {
		const maxPage = Number(limit);
		const admin = await this.ctx.model.MzcAdmin.findAndCountAll({
			where: {
				deleted_at: null
			},
			offset: (page - 1) * maxPage,
			limit: maxPage,
			attributes: { exclude: ['password'] }
		})

		if (admin.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

		return {
			data: {
				data: admin.rows,
				meta: {
					current_page: parseInt(page),
					per_page: maxPage,
					total: admin.count,
					total_pages: Math.ceil(admin.count / maxPage),
				}
			}
		}
	}
	/**
	 * 编辑
	 * @param { Object } params 参数
	 */
	async edit (params) {
		const { id, roles_id, menu_id, api_id, nickname, user_name, avatar_image, phone, email, status } = params;

		await this.ctx.model.MzcAdmin.update({
			roles_id, menu_id, api_id, nickname, user_name, avatar_image, phone, email, status
		}, {
			where: {
				id,
				deleted_at: null
			},
		})
		return { httpStatus: HttpStatus.OK }
	}
	/**
	 * 增加
	 * @param { Object } params 参数
	 */
	async add (params) {
		const { roles_id, menu_id, api_id, nickname, user_name, password, avatar_image, phone, email, status } = params;

		const admin = await this.ctx.model.MzcAdmin.findOne({
			where: {
				nickname: nickname,
				deleted_at: null
			}
		})

		if (admin) return { msg: '管理员已存在', httpStatus: HttpStatus.FORBIDDEN };

		await this.ctx.model.MzcAdmin.create({
			roles_id, menu_id, api_id, nickname, user_name, password, avatar_image, phone, email, status, register_ip: this.ctx.ip
		});

		return { httpStatus: HttpStatus.OK }
	}
	/**
	 * 修改
	 * @param { String } id 当前id
	 * @param { String } key 字段名
	 * @param { String } value 字段值
	 */
	async update ({ id, key, value }) {
		const admin = await this.ctx.model.MzcAdmin.update({ [key]: value }, {
			where: {
				id,
				deleted_at: null
			},
		})

		if (!admin[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

		return { httpStatus: HttpStatus.OK }
	}
}

module.exports = AdminService;
