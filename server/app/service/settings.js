/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:11:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 11:07:16
 */
'use strict';

const Service = require('egg').Service;

class SettingsService extends Service {

  /**
   * 基本设置列表
   */
  async list (data = {}) {
    const res = await this.ctx.model.MzcSettings.findAll({
      where: {
        deleted_at: null
      },
    });

    res.forEach(item => data[item.name] = item.value)

    return data
  }
}

module.exports = SettingsService;