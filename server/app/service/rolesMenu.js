/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-11 15:51:16
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-11 15:52:39
 */
'use strict';
/**
 * 个人提权菜单
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
class RolesService extends Service {
  /**
   * 详情
   * @param { Number } roles_id 群组id
   */
  async detail (user_id) {
    return await this.ctx.model.MzcRolesMenu.findAll({
      where: {
        user: user_id
      }
    })
  }
}

module.exports = RolesService;
