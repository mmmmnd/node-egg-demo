/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-12 09:28:24
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-13 11:38:06
 */
'use strict';

/**
 * 人力资源
 */
class RecruitDao {
  /**
   * 列表
   * @param { Object } ctx 全局this
   */
  static async list (ctx, id = 4) {
    return await ctx.model.MzcRecruit.findByPk(id);
  }

}

module.exports = RecruitDao;