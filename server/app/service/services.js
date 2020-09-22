/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:24:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 09:35:03
 */
'use strict';
/**
 * 服务领域
 */
const Service = require('egg').Service;

class ServicesService extends Service {
  /**
   * 服务领域列表
   * @param { Number } cid 二级菜单id
   */
  async list (cid) {
    return await this.ctx.model.MzcServices.findAll({
      where: {
        category_id: cid,
        deleted_at: null
      },
    })
  }

  /**
   * 服务领域列表
   */
  async lists () {
    return await this.ctx.model.MzcServices.findAll({
      where: {
        deleted_at: null
      },
    })
  }
}

module.exports = ServicesService;
