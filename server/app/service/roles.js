/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-11 15:33:52
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-14 17:22:58
 */
'use strict';
/**
 * 群组
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
class RolesService extends Service {
  /**
   * 详情
   * @param { Number } roles_id 群组id
   */
  async detail (roles_id) {
    return await this.ctx.model.MzcRoles.findOne({
      where: { roles_id }
    })

  }
}

module.exports = RolesService;
