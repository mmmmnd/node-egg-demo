/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:11:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-29 17:22:13
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class AdvertService extends Service {

  /**
   * 轮播图列表
   */
  async list () {
    return await this.ctx.model.MzcAdvert.findAll({
      where: {
        status: true,
        deleted_at: null
      },
      order: [['sort', 'DESC']],
    });
  }
  /**
 * 详情
 * @param { String } key 字段名
 * @param { String } value 字段值
 */
  async detail ({ key, value }) {

    const advert = await this.ctx.model.MzcAdvert.findAll({
      where: {
        [key]: value,
        deleted_at: null
      }
    });

    return { data: advert }
  }
  /**
  * 增加
  * @param { Object } params 参数
  */
  async add (params) {
    const { title, url = '', file_path = '', place = '', parent_id = '', status, ser_id = '', remark = '' } = params;

    await this.ctx.model.MzcAdvert.create({
      title, url, file_path, place, parent_id, status, ser_id, remark
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
  * 编辑
  * @param { Object } params 参数
  */
  async edit (params) {
    const { id, title, url, file_path, place, parent_id, ser_id, remark, status, sort } = params;

    await this.ctx.model.MzcAdvert.update({
      title, url, file_path, place, parent_id, ser_id, remark, status, sort
    }, {
      where: {
        id,
        deleted_at: null
      },
    });

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 删除
   * @param { Number } id 
   */
  async destroy ({ id }) {
    const advert = await this.ctx.model.MzcAdvert.findByPk(id);

    if (!advert) return { httpStatus: HttpStatus.NOT_FOUND, msg: '没有找到相关信息' };

    advert.destroy();

    return { httpStatus: HttpStatus.OK }
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    try {
      let aboutDroptype = await this.ctx.model.MzcAdvert.update({ [key]: value }, {
        where: {
          id,
          deleted_at: null
        },
      })

      if (!aboutDroptype[0]) return { msg: '没有找到相关信息', errorStatus: HttpStatus.INVALID_REQUEST };

      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}

module.exports = AdvertService;