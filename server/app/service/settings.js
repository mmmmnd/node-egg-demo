/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:11:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 17:32:31
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');
class SettingsService extends Service {
  /**
   * 基本设置列表
   * @param { Object } data 加工返回前端对象
   */
  async list (data = {}) {
    const res = await this.ctx.model.MzcSettings.findAll({
      where: {
        deleted_at: null
      },
    });

    res.forEach(item => data[item.name] = item.value)

    return data
  }
  /**
   * 批量更新
   * @param { Object } params 参数
   * @param { Object } data 批量更新数组对象 
   * bulkCreate必须主键冲突才能更新否则会批量插入
   */
  async edit (params, data = []) {
    const key = Object.keys(params)
    const value = Object.values(params)
    for (var i in key) data.push({ id: Number(i) + 1, name: key[i], value: value[i] })

    await this.ctx.model.MzcSettings.bulkCreate(data, { updateOnDuplicate: ["id", "name", "value"] });

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = SettingsService;