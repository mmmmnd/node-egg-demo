/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 10:04:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-30 08:51:11
 */
'use strict';
const moment = require('moment');
const svgCaptcha = require('svg-captcha');
const Controller = require('egg').Controller;

class WebController extends Controller {
  async index () {
    const { ctx, service } = this

    const menuList = await service.menu.list(); // 导航栏菜单
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const newsList = await service.news.lists(); // services数据
    const casesList = await service.cases.lists(26); // case数据
    const casesLists = await service.cases.lists(27); // case数据
    const servicesList = await service.services.lists(); // services数据
    const aboutSingleDetail = await service.aboutSingle.detail(2); // about单页数据

    const data = { advertisingList, menuList, settingList, aboutSingleDetail, servicesList, newsList, casesList, casesLists };
    await ctx.render('index/index.ejs', data);
  }
  async about () {
    const { ctx, service } = this;
    const { pid = 0, cid = 2 } = ctx.params;
    const err = error(pid, cid, 7, 1, 0);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告
    const aboutSingleDetail = await service.aboutSingle.detail(cid); // about单页数据
    const aboutDroptypeList = await service.aboutDroptype.list(cid); // about下拉菜单

    const data = { menuList, settingList, advertisingList, aboutSingleDetail, aboutDroptypeList, moment };
    await ctx.render('about/index.ejs', data);
  }
  async services () {
    const { ctx, service } = this;
    const { pid = 1, cid = 8 } = ctx.params;

    const err = await error(pid, cid, 13, 7, 1);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const servicesList = await service.services.list(cid); // services数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const data = { menuList, settingList, servicesList, advertisingList }
    await ctx.render('services/index.ejs', data);
  }
  async company () {
    const { ctx, service } = this;
    const { pid = 2, cid = 14 } = ctx.params;

    const err = await error(pid, cid, 16, 13, 2);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const companyList = await service.company.list(cid); // services数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const data = { menuList, settingList, companyList, advertisingList }
    await ctx.render('company/index.ejs', data);
  }
  async culture () {
    const { ctx, service } = this;
    const { pid = 3, cid = 17, page = 1 } = ctx.params;
    const url = `/culture/pid/${pid}/cid/${cid}`;
    const urlInfo = `/culture_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, 21, 16, 3);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const cultureList = await service.culture.list(cid, page); // culture数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const data = { menuList, settingList, cultureList, pages: cultureList.meta, advertisingList, url, urlInfo }
    await ctx.render('culture/index.ejs', data);
  }
  async culture_info () {
    const { ctx, service } = this;
    const { pid = 3, cid = 17, id = 1 } = ctx.params;
    const urlInfo = `/culture_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, 21, 16, 3);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const papeInfo = await service.culture.info(cid, id); // 详情页数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    await service.culture.updateClick(id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingList, papeInfo, advertisingList, urlInfo }
    await ctx.render('info/index.ejs', data);

  }
  async news () {
    const { ctx, service } = this;
    const { pid = 4, cid = 22, page = 1 } = ctx.params;
    const url = `/news/pid/${pid}/cid/${cid}`;
    const urlInfo = `/news_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, 25, 21, 4);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const newsList = await service.news.list(cid, page); // culture数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const data = { menuList, settingList, newsList, pages: newsList.meta, advertisingList, url, urlInfo }
    await ctx.render('news/index.ejs', data);
  }
  async news_info () {
    const { ctx, service } = this;
    const { pid = 4, cid = 22, id = 1 } = ctx.params;
    const urlInfo = `news_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, 25, 21, 4);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const papeInfo = await service.news.info(cid, id); // 详情页数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    await service.news.updateClick(id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingList, papeInfo, advertisingList, urlInfo }
    await ctx.render('info/index.ejs', data);
  }
  async cases () {
    const { ctx, service } = this;
    const { pid = 5, cid = 26, page = 1 } = ctx.params;
    const url = `cases/pid/${pid}/cid/${cid}`;
    const urlInfo = `cases_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, 28, 25, 5);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const casesList = await service.cases.list(cid, page); // case数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const data = { menuList, settingList, casesList, pages: casesList.meta, advertisingList, url, urlInfo }
    await ctx.render('cases/index.ejs', data);
  }
  async cases_info () {
    const { ctx, service } = this;
    const { pid = 5, cid = 26, id = 1 } = ctx.params;
    const urlInfo = `cases_info/pid/${pid}/cid/${cid}`;

    const menuList = await service.menu.list(); // 导航栏菜单
    const papeInfo = await service.cases.info(cid, id); // 详情页数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    await service.cases.updateClick(id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingList, papeInfo, advertisingList, urlInfo }
    await ctx.render('info/index.ejs', data);
  }
  async recruit () {
    const { ctx, service } = this;
    const { pid = 6, cid = 29 } = ctx.params;

    const err = await error(pid, cid, 31, 28, 6);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const recruitList = await service.recruit.list(); // recruit页面数据
    const recruitDroptypeList = await service.recruitDroptype.list(); //  recruit公司数据
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const data = { menuList, settingList, recruitList, recruitDroptypeList, advertisingList }
    await ctx.render('recruit/index.ejs', data);
  }
  async contact () {
    const { ctx, service } = this;
    const { pid = 7, cid = 32 } = ctx.params;

    const err = await error(pid, cid, 34, 31, 7);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const settingList = await service.setting.list(); // 基本设置
    const advertisingList = await service.advertising.list(); // 轮播图广告

    const data = { menuList, settingList, advertisingList }
    await ctx.render('contact/index.ejs', data);
  }
  async captcha () {
    const { ctx } = this;
    const { width = 50, height = 100, fontSize = 50 } = ctx.query;
    const options = {
      size: 4,
      ignoreChars: '0oO1ilI',
      fontSize,
      width,
      height,
      color: true,
      bacground: '#cc9966'
    };

    // let captcha = svgCaptcha.createMathExpr(options)
    let captcha = svgCaptcha.create(options)
    ctx.session.code = captcha.text.toLowerCase();
    ctx.response.type = 'image/svg+xml';
    return ctx.body = captcha.data;
  }
  async error () {
    this.ctx.status = 404;
    await this.ctx.render('commom/404.ejs');
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
const error = (pid, cid, maxIndex, minIndex, index) => {
  if (cid >= maxIndex || cid <= minIndex || pid != index) return true;
}
const render = async ctx => {
  ctx.status = 404;
  return await ctx.render('commom/404.ejs');
}
module.exports = WebController;
