/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:11:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:49:59
 */
'use strict';

const Service = require('egg').Service;

class SettingService extends Service {

  /**
   * 基本设置列表
   */
  async list () {
    return await this.ctx.model.MzcSetting.findAll();
  }
}

module.exports = SettingService;