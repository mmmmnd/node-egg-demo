/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 10:13:20
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 11:04:45
 */
'use strict';

const { Op } = require('sequelize')
const Service = require('egg').Service;
/**
 * 下拉详情
 */
class AboutService extends Service {
  /**
   * 下拉列表
   * @param { String } cid 二级菜单id
   */
  async list (cid) {
    return await this.ctx.model.MzcAbout.findAll({
      where: {
        deleted_at: null,
        category_id: { [Op.lte]: cid }
      }
    });
  }
}

module.exports = AboutService;
