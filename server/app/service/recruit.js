/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 11:27:03
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:49:39
 */
'use strict';
/**
 * 服务领域
 */
const Service = require('egg').Service;

class RecruitService extends Service {
  /**
   * 列表
   */
  async list (id = 4) {
    return await this.ctx.model.MzcRecruit.findByPk(id);
  }
}

module.exports = RecruitService;
