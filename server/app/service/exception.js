/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-15 19:42:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-15 20:23:24
 */
'use strict';
/**
 * 异常记录
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class ExceptionService extends Service {
  /**
   * 增加
   * @param { String } urlPathName 接口地址
   * @param { Object } userInfo 用户信息
   * @param { Object || String} headers 浏览器头部信息
   */
  async add (urlPathName, userInfo, headers) {

    const create = new this.ctx.model.MzcException
    create.user_id = userInfo.userId
    create.ip = this.ctx.ip
    create.headers = headers
    create.api = urlPathName

    create.save()

  }

}

module.exports = ExceptionService;
