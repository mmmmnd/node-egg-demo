/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-01 09:47:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-02 15:36:35
 */
'use strict'

module.exports = (options) => {
  return async (ctx, next) => {
    let { token } = ctx.request.header;
    if (token) {
      try {
        ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (error) {
        if (error.message === 'jwt expired') {
          return ctx.body = { message: 'token 已过期! 请重新获取令牌' };
        } else if (error.message === 'invalid token') {
          return ctx.body = { message: 'Token 令牌不合法!' };
        } else {
          return ctx.body = { message: error.message };
        }
      }
    } else {
      return ctx.body = { message: '您没有权限访问该接口!' };
    }
  }
};