/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-01 09:47:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-16 10:58:23
 */
'use strict'

const HttpStatus = require('../utils/httpStatus');

module.exports = (options) => {
  return async (ctx, next) => {
    const redisToken = await ctx.app.redis.get(ctx.app.config.usetToken);
    const token = ctx.get(ctx.app.config.usetToken);

    if (token === redisToken) {
      try {
        await ctx.app.redis.expire(ctx.app.config.usetToken, ctx.app.config.jwt.expired) // 未响应30分钟后删除token
        ctx.app.jwt.verify(token, options.secret, ctx.app.config.jwt.params);
        await next();
      } catch (e) {
        await ctx.helper.checkData({ msg: e.message, errorStatus: HttpStatus.INTERNAL_SERVER_ERROR })
      }
    } else if (!token) {
      await ctx.helper.checkData({ msg: '您没有权限访问该接口!', errorStatus: HttpStatus.UNAUTHORIZED })
    } else if (!redisToken) {
      await ctx.helper.checkData({ msg: 'token 已过期! 请重新获取令牌', errorStatus: HttpStatus.UNAUTHORIZED })
    } else if (token !== redisToken) {
      await ctx.helper.checkData({ msg: 'token 信息不一致', errorStatus: HttpStatus.UNAUTHORIZED })
    } else {
      await ctx.helper.checkData({ msg: '未知错误！', errorStatus: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }
};