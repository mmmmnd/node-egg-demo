/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-01 09:47:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-22 17:45:45
 */
'use strict'
const HttpStatus = require('../utils/httpStatus');

module.exports = (options) => {
  return async (ctx, next) => {
    try {
      const pathName = ctx.URL.pathname
      const headers = JSON.stringify(ctx.header)
      const token = await ctx.get(ctx.app.config.usetToken);
      const userInfo = await ctx.app.jwt.verify(token, options.secret, ctx.app.config.jwt.params); //校验token
      const redisToken = await ctx.app.redis.get(ctx.app.config.usetToken + userInfo.userId); //获取userToken

      if (token === redisToken) {
        global.userInfo = userInfo
        const isPathName = await ctx.service.api.check(pathName, userInfo) //校验接口权限
        if (isPathName) {
          await ctx.app.redis.expire(ctx.app.config.usetToken + userInfo.userId, ctx.app.config.expired) // 未响应30分钟后删除token
          await next();
        } else {
          await ctx.service.exception.add(pathName, userInfo, headers)
          await ctx.helper.checkData({ msg: '无权操作 非法请求！相关信息已被记录，请注意行为（别以为我不知道你想干嘛）！！！如有疑惑请联系开发者 -> handsome.mo@foxmail.com', errorStatus: HttpStatus.UNAUTHORIZED })
        }
      } else if (redisToken !== token) {
        global.userInfo = '';
        await ctx.helper.checkData({ msg: 'token 已过期! 请重新获取令牌', errorStatus: HttpStatus.UNAUTHORIZED, code: 50014 }) //redis Token 过期 
      }
    } catch (error) {
      global.userInfo = '';
      if (error.message == 'jwt must be provided')
        await ctx.helper.checkData({ msg: '您没有权限访问该接口!', errorStatus: HttpStatus.UNAUTHORIZED })
      else if (error.message == 'invalid signature')
        await ctx.helper.checkData({ msg: 'token信息不一致！', errorStatus: HttpStatus.UNAUTHORIZED, code: 50008 })
      else if (error.message == 'jwt expired') {
        await ctx.app.redis.del(ctx.app.config.usetToken + userInfo.userId);
        await ctx.helper.checkData({ msg: 'token 已过期! 请重新获取令牌', errorStatus: HttpStatus.UNAUTHORIZED, code: 50014 }) //token 过期
      }
      else
        await ctx.helper.checkData({ msg: error.message, errorStatus: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }
};