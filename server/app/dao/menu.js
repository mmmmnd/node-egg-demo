/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 16:36:23
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-11 16:26:40
 */
'use strict';

// const getTree = require('../getTree.js').getTree;
const GetTree = require('../getTree');

/**
 * 导航菜单
 */
class MenuDao extends GetTree {
  /**
   * 导航菜单列表
   * @param { Object } ctx 全局this
   */
  static async list (ctx) {
    const menu = await ctx.model.MzcMenu.findAll();
    return await super.menuList(menu, 0);
  }

}

module.exports = MenuDao;
