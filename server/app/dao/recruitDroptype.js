/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-12 09:28:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-12 16:42:49
 */
'use strict';

/**
 * 人力资源
 */
class RecruitDroptypeDao {
  /**
   * 列表
   * @param { Object } ctx 全局this
   */
  static async list (ctx) {
    return await ctx.model.MzcRecruitDroptype.findAll({
      include: [{
        as: 'recruit',
        model: ctx.model.MzcRecruit,
        order: [['id', 'ASC']],
      }],
      order: [['id', 'ASC']],
    });
  }

}

module.exports = RecruitDroptypeDao;