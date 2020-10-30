/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:24:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-30 08:56:07
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
    const filter = cid == undefined
      ? { deleted_at: null }
      : { category_id: cid, deleted_at: null };

    return await this.ctx.model.MzcServices.findAll({
      where: filter,
    })
  }
}

module.exports = ServicesService;
