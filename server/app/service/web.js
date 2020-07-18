/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 14:49:27
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-18 16:32:03
 */
'use strict';
// const getTree = require('../getTree.js').getTree;
const MenuDao = require('../dao/menu');
const AboutDao = require('../dao/about');
const settingDao = require('../dao/setting');
const advertisingDao = require('../dao/advertising');

const Service = require('egg').Service;

class WebService extends Service {

  async index() {
    const { ctx } = this;
    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const settingList = await settingDao.list(ctx); // 基本设置
    const advertisingList = await advertisingDao.list(ctx); // 轮播图广告

    const data = { advertisingList, menuList, settingList };

    await ctx.render('index/index.ejs', { data });
  }

  async about(query) {
    const { ctx } = this;
    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const AboutList = await AboutDao.list(ctx, query); // 导航栏菜单
    const settingList = await settingDao.list(ctx); // 基本设置
    const advertisingList = await advertisingDao.list(ctx); // 轮播图广告

    const data = { menuList, settingList, advertisingList, AboutList };

    await ctx.render('about/index.ejs', { data });
  }

}

module.exports = WebService;
