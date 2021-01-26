/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:35:57
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-26 16:15:44
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
/**
 * 单页
 */
class AboutSingleService extends Service {
  /**
   * 获取详情列表
   * @param { String } product_id 父id
   */
  async index ({ product_id }) {
    const aboutSingle = await this.ctx.model.MzcAboutSingle.findOne({
      where: {
        product_id,
        deleted_at: null
      }
    });

    if (!aboutSingle) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return { data: aboutSingle }
  }
  /**
   * 详情
   * @param { String } product_id 父id
   */
  async detail (product_id) {
    const aboutSingle = await this.ctx.model.MzcAboutSingle.findOne({
      where: {
        product_id: product_id,
        status: true,
        deleted_at: null
      }
    });

    // if (!aboutSingle) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return aboutSingle
  }
  /**
   * 编辑
   * @param { String } title 标题
   * @param { String } keywords 关键词
   * @param { String } description 描述
   * @param { Text } content 内容
   * @param { Boolean } status 状态
   * @param { Number } id id
   */
  async edit ({ title, keywords, description, content, status, id }) {
    await this.ctx.model.MzcAboutSingle.update({
      title, keywords, description, content, status
    }, {
      where: {
        id,
        deleted_at: null
      },
    })
    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = AboutSingleService;
