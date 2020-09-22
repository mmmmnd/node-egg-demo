/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:35:57
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-22 10:16:41
 */
'use strict';

const Service = require('egg').Service;
/**
 * 轮播图广告
 */
class AboutSingleService extends Service {
  /**
   * 轮播图列表
   */
  async detail (cid = 2) {
    return await this.ctx.model.MzcAboutSingle.findOne({
      where: {
        deleted_at: null,
        category_id: cid
      }
    });
  }
}

module.exports = AboutSingleService;
