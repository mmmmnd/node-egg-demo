/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-16 15:25:22
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-16 15:53:01
 */
module.exports = (options, app) => {
  return async function robotMiddleware (ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      return ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  }
};