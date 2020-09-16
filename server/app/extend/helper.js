/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-04 15:04:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-15 17:38:54
 */
const HttpResolve = require('../utils/httpResolve');
const httpResolve = new HttpResolve();
module.exports = {
  checkData (params) {
    const ctx = this.ctx;
    const { httpStatus, errorStatus } = params;
    if (httpStatus) {
      return httpResolve.json({ ctx, ...params })
    } else if (errorStatus) {
      return httpResolve.error({ ctx, ...params })
    } else {
      return httpResolve.stsuccess({ ctx, ...params })
    }
  }
};