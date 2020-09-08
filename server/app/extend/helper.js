/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-04 15:04:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-08 10:53:02
 */
module.exports = {
  success (ctx, data = {}, msg = '请求成功') {
    ctx.status = 200
    return ctx.body = { code: 0, data, msg }
  },
  json (ctx, message = '错误请求', errorStatus = 400, code = 1) {
    ctx.status = 200;
    msg = `状态码：${errorStatus}，信息：${message}！`;
    return ctx.body = { code, msg };
  }
};