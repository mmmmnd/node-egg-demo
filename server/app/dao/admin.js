/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-02 15:44:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-08 17:44:56
 */
'use strict';

const HttpStatus = require('../utils/httpStatus');
const bcrypt = require('bcryptjs')

/**
 * 管理员
 */
class AdminDao extends HttpStatus {
  constructor() { super(); }
  /**
   * 注册
   * @param { Object } ctx 全局this
   * @param { Object || String } params 用户信息
   * @param { Class } super 继承父类
   */
  static async cerate (ctx, params) {
    if (!params.nickname || !params.password) {
      return await ctx.helper.json(ctx, '用户名或密码未输入');
    } else if (params.password.length < 6) {
      return await ctx.helper.json(ctx, '密码不能少于6位数');
    } else if (params.password !== params.passwords) {
      return await ctx.helper.json(ctx, '两次密码输入不一致');
    }

    try {
      const admin = await ctx.model.MzcAdmin.findOne({
        where: {
          nickname: params.nickname,
          deleted_at: null
        }
      })

      if (admin) return await ctx.helper.json(ctx, '管理员已存在');

      const create = new ctx.model.MzcAdmin;
      create.nickname = params.nickname;
      create.password = params.password;
      create.save();

      return await ctx.helper.json(ctx, '管理员注册成功', super.CREATED);

    } catch (error) {
      return await ctx.helper.json(ctx, error.message, super.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * 校验颁发token
   * @param { Object } ctx 全局this
   * @param { Object || String } params 用户信息
   * @param { Class } super 继承父类
   */
  static async verify (ctx, params) {
    if (!params.nickname || !params.password) return await ctx.helper.json(ctx, '用户名或密码未输入');

    try {
      const admin = await ctx.model.MzcAdmin.findOne({
        where: {
          nickname: params.nickname,
          deleted_at: null
        }
      })

      if (!admin) return await ctx.helper.json(ctx, '账号不存在或者密码不正确', super.INVALID_REQUEST);

      const verify = bcrypt.compareSync(params.password, admin.password);

      if (!verify) return await ctx.helper.json(ctx, '账号不存在或者密码不正确', super.INVALID_REQUEST);

      const token = ctx.app.jwt.sign({
        userId: admin.id,
      }, ctx.app.config.jwt.secret, {
        algorithm: 'HS256',
      });

      const redisGetToken = await ctx.app.redis.get('token');
      if (redisGetToken) {
        const redisToken = await ctx.app.jwt.verify(redisGetToken, ctx.app.config.jwt.secret, { algorithm: 'HS256' });
        if (redisToken.userId === admin.id) {
          return await ctx.helper.json(ctx, '用户已登录！请半小时后再重新登录', super.FORBIDDEN);
        } else {
          return await ctx.helper.json(ctx, '未知错误！', super.INTERNAL_SERVER_ERROR);
        }
      } else {
        await ctx.app.redis.set('token', token);
        return await ctx.helper.success(ctx, { token }, '登录成功！');
      }

    } catch (error) {
      return await ctx.helper.json(ctx, error.message, super.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 查找用户信息
   * @param { Object } ctx 全局this
   * @param { String } params token
   * @param { Class } super 继承父类
   */
  static async detail (ctx, params) {

    const adminToken = await ctx.app.jwt.verify(params, ctx.app.config.jwt.secret, {
      algorithm: 'HS256'
    });
    const admin = await ctx.model.MzcAdmin.findByPk(adminToken.userId, {
      attributes: { exclude: ['password'] }
    });

    return await ctx.helper.success(ctx, admin, '获取用户信息成功！');

  }

  /**
   * 用户退出登录
   * @param { Object } ctx 全局this
   * @param { String } params token
   * @param { Class } super 继承父类
   */
  static async logout (ctx, params) {
    const redisToken = await ctx.app.redis.get('token');
    if (redisToken === params) {
      await ctx.app.redis.del('token')
      return await ctx.helper.json(ctx, '退出登录成功', super.OK, 0);
    } else {
      return await ctx.helper.json(ctx, '非法请求！', super.INTERNAL_SERVER_ERROR);
    }

  }
}

module.exports = AdminDao;
