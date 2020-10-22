/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-15 14:44:34
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-22 17:10:32
 */
class HttpResolve {
  /**
   * 主要返回前端data数据
   * @param { Object } data //返回对象
   * @param { TXT } msg //错误提示语
   */
  async stsuccess ({ ctx, data = {}, msg = '请求成功' }) {
    ctx.status = 200;
    ctx.body = { code: 0, data, msg }
  }
  /**
   * 返回json形式
   * @param { TXT } msg //错误提示语
   * @param { Number } httpStatus //http状态码
   * @param { Number } code //1 -> 错误 0-> 正确
   */
  async json ({ ctx, msg = '请求成功', httpStatus = 200, code = 0 }) {
    ctx.status = httpStatus;
    ctx.body = { code, msg };
  }
  /**
   * http错误状态码主要返回前端提示
   * @param { TXT } msg //错误提示语
   * @param { Number } errorStatus //http状态码
   * @param { Number } code //1 -> 错误 0-> 正确
   */
  async error ({ ctx, msg = '错误请求', errorStatus = 400, code = 1 }) {
    ctx.status = 200;
    msg = `状态码：${errorStatus}，信息：${msg}`;
    ctx.body = { code, msg };
  }
}

module.exports = HttpResolve