/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-06 15:58:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-25 15:56:50
 */
'use strict';
/**
 * 接口
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class ApiCodeService extends Service {
  /**
   * 查询
   * @param { Number } limit 限制页
   * @param { Number } page 当前页
   */
  async index () {
    const apiCode = await this.ctx.model.MzcApiCode.findAll({
      where: { deleted_at: null }
    })

    return { data: apiCode }
  }
  /**
   * 增加
   * @param { String } describe 描述
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async add ({ describe, status, sort }) {
    await this.ctx.model.MzcApiCode.create({
      describe, status, sort
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 编辑
   * @param { Number } id id
   * @param { String } describe 描述
   * @param { String } code 识别码
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async edit ({ id, describe, code, status, sort }) {
    const apiCode = await this.ctx.model.MzcApiCode.update({
      describe, code, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    })

    if (!apiCode) return { httpStatus: HttpStatus.INVALID_REQUEST, msg: '没有找到相关信息' };

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = ApiCodeService;
