/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 14:49:27
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-10 17:11:20
 */
'use strict';
// const getTree = require('../getTree.js').getTree;
const MenuDao = require('../dao/menu');
const NewsDao = require('../dao/news');
const CasesDao = require('../dao/cases');
const AboutDao = require('../dao/about');
const CultureDao = require('../dao/culture');
const companyDao = require('../dao/company');
const SettingDao = require('../dao/setting');
const servicesDao = require('../dao/services');
const AdvertisingDao = require('../dao/advertising');
const AboutDroptypeDao = require('../dao/aboutDroptype');


const Service = require('egg').Service;

class WebService extends Service {

  async index () {
    const { ctx } = this;

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    const data = { advertisingList, menuList, settingList };
    await ctx.render('index/index.ejs', data);
  }

  async about ({ pid = 0, cid = 2 }) {
    const { ctx } = this;

    const err = await error(pid, cid, 7, 1, 0);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const aboutList = await AboutDao.list(ctx, cid); // about单页数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告
    const aboutDroptypeList = await AboutDroptypeDao.list(ctx, cid); // 下拉菜单

    const data = { menuList, settingList, advertisingList, aboutList, aboutDroptypeList };
    await ctx.render('about/index.ejs', data);
  }

  async services ({ pid = 1, cid = 8 }) {
    const { ctx } = this;

    const err = await error(pid, cid, 13, 7, 1);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const servicesList = await servicesDao.list(ctx, cid); // services数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    const data = { menuList, settingList, servicesList, advertisingList }
    await ctx.render('services/index.ejs', data);
  }

  async company ({ pid = 2, cid = 14 }) {
    const { ctx } = this;

    const err = await error(pid, cid, 16, 13, 2);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const companyList = await companyDao.list(ctx, cid); // services数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    const data = { menuList, settingList, companyList, advertisingList }
    await ctx.render('company/index.ejs', data);
  }

  async culture ({ pid = 3, cid = 17, page = 1 }) {
    const { ctx } = this;
    const url = `culture?pid=${pid}&cid=${cid}`;
    const urlInfo = `culture_info?pid=${pid}&cid=${cid}`;

    const err = await error(pid, cid, 21, 16, 3);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const cultureList = await CultureDao.list(ctx, cid, page); // culture数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    const data = { menuList, settingList, cultureList, pages: cultureList.meta, advertisingList, url, urlInfo }
    await ctx.render('culture/index.ejs', data);
  }

  async culture_info ({ pid = 3, cid = 17, id = 1 }) {
    const { ctx } = this;
    const urlInfo = `culture_info?pid=${pid}&cid=${cid}`;

    const err = await error(pid, cid, 21, 16, 3);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const papeInfo = await CultureDao.info(ctx, cid, id); // 详情页数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    await CultureDao.updateClick(ctx, id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingList, papeInfo, advertisingList, urlInfo }
    await ctx.render('info/index.ejs', data);
  }

  async news ({ pid = 4, cid = 22, page = 1 }) {
    const { ctx } = this;
    const url = `news?pid=${pid}&cid=${cid}`;
    const urlInfo = `news_info?pid=${pid}&cid=${cid}`;

    const err = await error(pid, cid, 25, 21, 4);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const newsList = await NewsDao.list(ctx, cid, page); // culture数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    const data = { menuList, settingList, newsList, pages: newsList.meta, advertisingList, url, urlInfo }
    await ctx.render('news/index.ejs', data);
  }

  async news_info ({ pid = 4, cid = 22, id = 1 }) {
    const { ctx } = this;
    const urlInfo = `news_info?pid=${pid}&cid=${cid}`;

    const err = await error(pid, cid, 25, 21, 4);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const papeInfo = await NewsDao.info(ctx, cid, id); // 详情页数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    await NewsDao.updateClick(ctx, id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingList, papeInfo, advertisingList, urlInfo }
    await ctx.render('info/index.ejs', data);
  }

  async cases ({ pid = 5, cid = 26, id = 1, page = 1 }) {
    const { ctx } = this;
    const url = `cases?pid=${pid}&cid=${cid}`;
    const urlInfo = `cases_info?pid=${pid}&cid=${cid}`;

    const err = await error(pid, cid, 28, 25, 5);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const casesList = await CasesDao.list(ctx, cid, page); // case数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    const data = { menuList, settingList, casesList, pages: casesList.meta, advertisingList, url, urlInfo }
    await ctx.render('cases/index.ejs', data);
  }

  async cases_info ({ pid = 5, cid = 26, id = 1}) {
    const { ctx } = this;
    const urlInfo = `cases_info?pid=${pid}&cid=${cid}`;

    const err = await error(pid, cid, 28, 25, 5);
    if (err) return render(ctx);

    const menuList = await MenuDao.list(ctx); // 导航栏菜单
    const papeInfo = await CasesDao.info(ctx, cid, id); // 详情页数据
    const settingList = await SettingDao.list(ctx); // 基本设置
    const advertisingList = await AdvertisingDao.list(ctx); // 轮播图广告

    await CasesDao.updateClick(ctx, id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingList, papeInfo, advertisingList, urlInfo }
    await ctx.render('info/index.ejs', data);
  }
}

/**
 * 判断url导航栏参数
 * @param { Number } pid 一级导航id
 * @param { Number } cid 二级导航id
 * @param { Number } maxIndex 二级导航最大值
 * @param { Number } minIndex 二级导航最小值
 * @param { String } index 当前位置索引
 */
const error = async (pid, cid, maxIndex, minIndex, index) => {
  if (cid >= maxIndex || cid <= minIndex || pid != index) return true;
}
const render = async ctx => {
  ctx.status = 404;
  return await ctx.render('commom/404.ejs');
}

module.exports = WebService;
