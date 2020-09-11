/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-04 15:04:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-11 11:45:42
 */
module.exports = {
  /**
   * 主要返回前端data数据
   * @param { Object } ctx //全局this
   * @param { Object } data //返回对象
   * @param { TXT } msg //错误提示语
   */
  success (ctx, data = {}, msg = '请求成功') {
    ctx.status = 200
    return ctx.body = { code: 0, data, msg }
  },
  /**
   * 返回json形式
   * @param { Object } ctx //全局this
   * @param { TXT } msg //错误提示语
   * @param { Number } errorStatus //http状态码
   * @param { Number } code //1 -> 错误 0-> 正确
   */
  json (ctx, msg = '请求成功', httsStatus = 200, code = 0) {
    ctx.status = httsStatus;
    return ctx.body = { code, msg };
  },
  /**
   * http错误状态码主要返回前端提示
   * @param { Object } ctx //全局this
   * @param { TXT } message //错误提示语
   * @param { Number } errorStatus //http状态码
   * @param { Number } code //1 -> 错误 0-> 正确
   */
  error (ctx, message = '错误请求', errorStatus = 400, code = 1) {
    ctx.status = 200;
    msg = `状态码：${errorStatus}，信息：${message}！`;
    return ctx.body = { code, msg };
  }
};