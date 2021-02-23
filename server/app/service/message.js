/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-17 16:32:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-23 11:44:11
 */
'use strict';

const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');


class MessageService extends Service {
  /**
   * 创建留言
   * @param { String } name 姓名
   * @param { String } phone 电话
   * @param { String } email 邮箱
   * @param { String } title 标题
   * @param { String } remarks 内容
   * @param { String } captcha 验证码
   * 
   */
  async create ({ name, phone, email, title, remarks, captcha }) {
    const code = this.ctx.session.code;
    try {

      if (!captcha) return { msg: '验证码为空', errorStatus: HttpStatus.INVALID_REQUEST };
      else if (code !== captcha) return { msg: '验证码错误', errorStatus: HttpStatus.UNAUTHORIZED };

      await this.ctx.model.MzcMessage.create({
        name, phone, email, title, remarks, ip: this.ctx.ip
      });

      return { httpStatus: HttpStatus.OK }

    } catch (err) {
      throw new Error(err);
    }
  }
  /**
   * 获取列表
   * @param { String } limit 最大限制
   * @param { String } page 分页
   */
  async list ({ limit = 20, page = 1 }) {
    const maxPage = Number(limit);
    const message = await this.ctx.model.MzcMessage.findAndCountAll({
      where: {
        deleted_at: null
      },
      offset: (page - 1) * maxPage,
      limit: maxPage,
    })

    if (message.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

    return {
      data: {
        data: message.rows,
        meta: {
          current_page: parseInt(page),
          per_page: maxPage,
          total: message.count,
          total_pages: Math.ceil(message.count / maxPage),
        }
      }
    }
  }
  /**
   * 删除
   * @param { Array }  params id数组
   */
  async destroy ({ id }) {
    await this.ctx.model.MzcMessage.destroy({
      where: { id }
    })

    return { httpStatus: HttpStatus.OK }
  }
}

module.exports = MessageService;