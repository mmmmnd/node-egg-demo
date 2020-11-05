/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:24:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-05 16:06:29
 */
'use strict';
/**
 * 服务领域
 */
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class ServicesService extends Service {
  /**
   * 服务领域列表
   * @param { Number } cid 二级菜单id
   */
  async list (cid) {
    const filter = cid == undefined
      ? { deleted_at: null }
      : { category_id: cid, status: true, deleted_at: null };

    return await this.ctx.model.MzcServices.findAll({
      where: filter,
    })
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    try {
      let services = await this.ctx.model.MzcServices.update({ [key]: value }, {
        where: {
          id,
          deleted_at: null
        },
      })

      if (!services[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 编辑
   * @param { Object } params 参数
   */
  async edit (params) {
    const { id, category_id, title, keywords, companyDescription, servicesImage, content, status } = params;

    try {
      await this.ctx.model.MzcServices.update({
        category_id, title, keywords, companyDescription, servicesImage, content, status
      }, {
        where: {
          id,
          deleted_at: null
        },
      })
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}

module.exports = ServicesService;
