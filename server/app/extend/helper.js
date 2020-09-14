/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-04 15:04:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-14 17:52:46
 */
module.exports = {
  /**
   * 主要返回前端data数据
   * @param { Object } data //返回对象
   * @param { TXT } msg //错误提示语
   */
  success (data = {}, msg = '请求成功') {
    this.ctx.status = 200
    return this.ctx.body = { code: 0, data, msg }
  },
  /**
   * 返回json形式
   * @param { TXT } msg //错误提示语
   * @param { Number } errorStatus //http状态码
   * @param { Number } code //1 -> 错误 0-> 正确
   */
  json (msg = '请求成功', httpStatus = 200, code = 0) {
    this.ctx.status = httpStatus;
    return this.ctx.body = { code, msg };
  },
  /**
   * http错误状态码主要返回前端提示
   * @param { TXT } message //错误提示语
   * @param { Number } errorStatus //http状态码
   * @param { Number } code //1 -> 错误 0-> 正确
   */
  error (message = '错误请求', errorStatus = 400, code = 1) {
    this.ctx.status = 200;
    msg = `状态码：${errorStatus}，信息：${message}！`;
    return this.ctx.body = { code, msg };
  }
};