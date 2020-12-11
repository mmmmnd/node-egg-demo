/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-11 15:41:45
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
	async create (params) {
		const { ctx } = this;

		try {

			const admin = await ctx.model.MzcAdmin.findOne({
				where: {
					nickname: params.nickname,
					deleted_at: null
				}
			})

			if (admin) return { msg: '管理员已存在', httpStatus: HttpStatus.FORBIDDEN };

			const create = new ctx.model.MzcAdmin;
			create.nickname = params.nickname;
			create.password = params.password;
			create.register_ip = this.ctx.ip;
			create.save();

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

			//颁发token secret -> 加密类型 params -> jwt参数
			const token = await ctx.app.jwt.sign({
				userId: admin.id,
				userRolesId: admin.roles_id
			}, ctx.app.config.jwt.secret, ctx.app.config.jwt.params);

			//获取redis保存的token
			const redisGetToken = await ctx.app.redis.get(ctx.app.config.usetToken + admin.id,);
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
				admin.last_login_ip = this.ctx.ip;
				admin.login_count = ++admin.login_count;
				admin.last_login_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
				admin.save();

				return { data: { token }, msg: '登录成功！' };
			}

		} catch (error) {
			return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
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
	 */
	async list () {
		return await this.ctx.model.MzcAdmin.findAll({
			where: {
				deleted_at: null
			},
			attributes: { exclude: ['password'] }
		});
	}

}

module.exports = AdminService;
