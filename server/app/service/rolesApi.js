/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-15 10:25:53
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-15 15:38:49
 */
'use strict';
/**
 * 个人提权接口
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class rolesApiService extends Service {
  /**
   * 详情
   * @param { Number } roles_id 群组id
   */
  async detail (user_id) {
    return await this.ctx.model.MzcRolesApi.findOne({
      where: { user_id }
    })

  }
}

module.exports = rolesApiService;
