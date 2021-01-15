/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-17 17:34:59
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-15 15:47:11
 */
'use strict';

const { Op } = require('sequelize')
const GetTree = require('../utils/getTree');
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class MenuService extends Service {
  /**
   * 获取列表
   */
  async index () {
    const menu = await this.ctx.model.MzcMenu.findAll({
      where: {
        deleted_at: null
      },
      order: [
        ['id', 'ASC'], ['pid', 'ASC']
      ]
    });
    return { data: GetTree.menuList(menu, 'menu') }
  }
  /**
   * 修改
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字段值
   */
  async update ({ id, key, value }) {
    try {
      await this.ctx.model.MzcMenu.update({ [key]: value }, {
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
  /**
   * 编辑
   * @param { String } title 标题
   * @param { String } url 模板地址
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   * @param { Number } id id
   * @param { Number } pid 父id
   */
  async edit ({ url, title, status, sort, id, pid }) {
    try {
      await this.ctx.model.MzcMenu.update({
        pid, title, url, status, sort
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
  /**
  * 导航菜单列表
  */
  async list () {
    const menu = await this.ctx.model.MzcMenu.findAll({
      where: {
        status: true,
        deleted_at: null
      },
      order: [
        ['sort', 'ASC'], ['id', 'ASC']
      ]
    });
    return GetTree.menuList(menu, 'menu');
  }
  /**
   * 获取模板排序顺序
   * @param { Number } pid 
   */
  async info (pid) {
    return await this.ctx.model.MzcMenu.findAll({
      where: {
        pid,
        deleted_at: null
      }
    })
  }
  /**
   * 获取分类详情
   * @param { Number } maxId 最大id
   * @param { Number } minId 最小id
   */
  async details (maxId = 0, minId = 0) {
    return await this.ctx.model.MzcMenu.findAll({
      where: {
        id: { [Op.gte]: minId, [Op.lte]: maxId },
        deleted_at: null
      }
    })
  }
  /**
   * 增加
   * @param { Number } pid 父id
   * @param { String } title 标题
   * @param { String } url 模板地址
   * @param { Boolean } status 状态
   * @param { Number } sort 排序
   */
  async add ({ pid, title, url, status, sort }) {
    await this.ctx.model.MzcMenu.create({
      pid, title, url, status, sort
    });
  }
}

module.exports = MenuService;
