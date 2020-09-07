/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-01 09:47:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-07 17:14:30
 */
'use strict'

const HttpStatus = require('../utils/httpStatus');

module.exports = (options) => {
  return async (ctx, next) => {
    const redisToken = await ctx.app.redis.get('token');
    const token = ctx.get('token');

    if (token === redisToken) {
      try {
        await ctx.app.redis.expire('token', 10) // 未响应30分钟后删除token
        ctx.app.jwt.verify(token, options.secret, { algorithm: 'HS256' });
        await next();
      } catch (e) {
        await ctx.helper.json(ctx, e.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    } else if (!token) {
      await ctx.helper.json(ctx, '您没有权限访问该接口!', HttpStatus.UNAUTHORIZED)
    } else if (!redisToken) {
      await ctx.helper.json(ctx, 'token 已过期! 请重新获取令牌', HttpStatus.UNAUTHORIZED)
    } else if (token !== redisToken) {
      await ctx.helper.json(ctx, 'token 信息不一致', HttpStatus.UNAUTHORIZED)
    } else {
      await ctx.helper.json(ctx, '未知错误！', HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};