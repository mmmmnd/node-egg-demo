/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-01 09:47:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-04 15:03:58
 */
'use strict'
const HttpStatus = require('../utils/httpStatus');

module.exports = (options) => {
  return async (ctx, next) => {
    try {
      const token = await ctx.get(ctx.app.config.usetToken);
      const userInfo = await ctx.app.jwt.verify(token, options.secret, ctx.app.config.jwt.params); //校验token
      const redisToken = await ctx.app.redis.get(ctx.app.config.usetToken + userInfo.userId); //获取userToken

      if (token === redisToken) {
        global.userInfo = userInfo
        await ctx.app.redis.expire(ctx.app.config.usetToken + userInfo.userId, ctx.app.config.expired) // 未响应30分钟后删除token
        await next();
      } else if (redisToken !== token) {
        global.userInfo = '';
        await ctx.helper.checkData({ msg: 'token 已过期! 请重新获取令牌', errorStatus: HttpStatus.UNAUTHORIZED, code: 50014 }) //redist Token 过期 
      }
    } catch (error) {
      global.userInfo = '';
      if (error.message == 'jwt must be provided')
        await ctx.helper.checkData({ msg: '您没有权限访问该接口!', errorStatus: HttpStatus.UNAUTHORIZED })
      else if (error.message == 'invalid signature')
        await ctx.helper.checkData({ msg: 'token信息不一致！', errorStatus: HttpStatus.UNAUTHORIZED, code: 50008 })
      else if (error.message == 'jwt expired')
        await ctx.helper.checkData({ msg: 'token 已过期! 请重新获取令牌', errorStatus: HttpStatus.UNAUTHORIZED, code: 50014 }) //token 过期
      else
        await ctx.helper.checkData({ msg: error.message, errorStatus: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }
};