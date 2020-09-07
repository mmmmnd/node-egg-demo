/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-04 15:04:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-07 16:35:00
 */
module.exports = {
  success (ctx, data = {}, msg = '请求成功', status = 200) {
    ctx.status = status
    return ctx.body = { code: 0, data, msg }
  },
  json (ctx, msg = '错误请求', status = 400, code = 1) {
    ctx.status = status;
    return ctx.body = { code, msg };
  }
};