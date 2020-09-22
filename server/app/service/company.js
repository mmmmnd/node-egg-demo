/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:27:48
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:50:18
 */
'use strict';


const Service = require('egg').Service;
/**
 * 旗下公司
 */
class CompanyService extends Service {
  /**
   * 关于我们列表
   * @param { Object } ctx 全局this
   * @param { Number } cid 二级菜单id
   */
  async list (cid) {
    return await this.ctx.model.MzcCompany.findAll({
      where: {
        category_id: cid,
        deleted_at: null
      },
    });// 公司简介
  }
}

module.exports = CompanyService;
