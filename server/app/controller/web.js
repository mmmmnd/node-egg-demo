/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 10:04:55
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-02 16:51:04
 */
'use strict';
const moment = require('moment');
const svgCaptcha = require('svg-captcha');
const Controller = require('egg').Controller;

class WebController extends Controller {
  async index () {
    const { ctx, service } = this

    const menuList = await service.menu.list(); // 导航栏菜单
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const newsDetail = await service.news.detail(24, 1); // 公告

    const newsList = await service.news.index({}); // newsList数据
    const casesDetail = await service.cases.detail(26); // case数据
    const casesInfo = await service.cases.detail(27); // case数据
    const servicesList = await service.services.list(); // services数据
    const aboutSingleDetail = await service.aboutSingle.detail(2); // about单页数据

    const data = { advertList, menuList, settingsList, aboutSingleDetail, servicesList, newsList: newsList.data, casesDetail, casesInfo, newsDetail: newsDetail.data, moment };
    await ctx.render('index/index.ejs', data);
  }
  async about () {
    const { ctx, service } = this;
    const { pid, cid } = ctx.params;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const aboutSingleDetail = await service.aboutSingle.detail(cid); // about单页数据
    const aboutDroptypeList = await service.aboutDroptype.index(cid); // about下拉菜单
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, advertList, aboutSingleDetail, aboutDroptypeList, moment, servicesList };
    await ctx.render('about/index.ejs', data);
  }
  async services () {
    const { ctx, service } = this;
    const { pid, cid } = ctx.params;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const servicesDetail = await service.services.detail(cid); // services数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, servicesDetail, advertList, servicesList }
    await ctx.render('services/index.ejs', data);
  }
  async company () {
    const { ctx, service } = this;
    var { pid, cid, id } = ctx.params;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    if (!id) {
      const companyId = await service.company.getMaxId(cid);
      id = companyId.id;
    }
    const menuList = await service.menu.list(); // 导航栏菜单
    const companyList = await service.company.list(cid); // company详情数据
    const companyDetail = await service.company.detail(id, cid); // company详情数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, companyList, companyDetail, advertList, servicesList }
    await ctx.render('company/index.ejs', data);
  }
  async culture () {
    const { ctx, service } = this;
    const { pid, cid, page = 1 } = ctx.params;
    const url = `/culture/pid/${pid}/cid/${cid}`;
    const urlInfo = `/culture_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const cultureDetail = await service.culture.detail(cid, page); // culture数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, cultureDetail, pages: cultureDetail.meta, advertList, url, urlInfo, moment, servicesList }
    await ctx.render('culture/index.ejs', data);
  }
  async culture_info () {
    const { ctx, service } = this;
    const { pid, cid, id = 1 } = ctx.params;
    const urlInfo = `/culture_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const papeInfo = await service.culture.info(cid, id); // 详情页数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    await service.culture.updateClick(id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingsList, papeInfo, advertList, urlInfo, servicesList, moment }
    await ctx.render('info/index.ejs', data);

  }
  async news () {
    const { ctx, service } = this;
    const { pid, cid, page = 1 } = ctx.params;
    const url = `/news/pid/${pid}/cid/${cid}`;
    const urlInfo = `/news_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const newsDetail = await service.news.detail(cid, page); // culture数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, newsDetail, pages: newsDetail.meta, advertList, url, urlInfo, servicesList, moment }
    await ctx.render('news/index.ejs', data);
  }
  async news_info () {
    const { ctx, service } = this;
    const { pid, cid, id = 1 } = ctx.params;
    const urlInfo = `/news_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const papeInfo = await service.news.info(cid, id); // 详情页数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    await service.news.updateClick(id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingsList, papeInfo, advertList, urlInfo, servicesList, moment }
    await ctx.render('info/index.ejs', data);
  }
  async cases () {
    const { ctx, service } = this;
    const { pid, cid, page = 1 } = ctx.params;
    const url = `cases/pid/${pid}/cid/${cid}`;
    const urlInfo = `cases_info/pid/${pid}/cid/${cid}`;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const casesList = await service.cases.list(cid, page); // case数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, casesList, pages: casesList.meta, advertList, url, urlInfo, servicesList, moment }
    await ctx.render('cases/index.ejs', data);
  }
  async cases_info () {
    const { ctx, service } = this;
    const { pid, cid, id = 1 } = ctx.params;
    const urlInfo = `/cases_info/pid/${pid}/cid/${cid}`;

    const menuList = await service.menu.list(); // 导航栏菜单
    const papeInfo = await service.cases.info(cid, id); // 详情页数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    await service.cases.updateClick(id, ++papeInfo.current.click); //点击浏览量

    const data = { menuList, settingsList, papeInfo, advertList, urlInfo, servicesList, moment }
    await ctx.render('info/index.ejs', data);
  }
  async recruit () {
    const { ctx, service } = this;
    const { pid, cid } = ctx.params;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const recruitDetail = await service.recruit.detail(); // recruit页面数据
    const recruitDroptypeList = await service.recruitDroptype.list(); //  recruit公司数据
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, recruitDetail, recruitDroptypeList, advertList, servicesList, moment }
    await ctx.render('recruit/index.ejs', data);
  }
  async contact () {
    const { ctx, service } = this;
    const { pid, cid } = ctx.params;

    const err = await error(pid, cid, this);
    if (err) return render(ctx);

    const menuList = await service.menu.list(); // 导航栏菜单
    const settingsList = await service.settings.list(); // 基本设置
    const advertList = await service.advert.list(); // 轮播图广告
    const servicesList = await service.services.list(); // serInfo 模板数据

    const data = { menuList, settingsList, advertList, servicesList }
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
 * @param { Number } maxId 二级导航最大值
 * @param { Number } minId 二级导航最小值
 * @param { String } MaxPid 当前位置索引
 */
const error = async (pid, cid, _this) => {
  const menuInfo = await _this.service.menu.info(pid); // 导航栏菜单
  if (menuInfo.length == 0) return true;
  const [maxId, minId, MaxPid] = [menuInfo.pop().id, menuInfo[0].id, menuInfo[0].pid];
  if (cid > maxId || cid < minId || pid != MaxPid || pid == 0) return true;
}
const render = async ctx => {
  ctx.status = 404;
  return await ctx.render('commom/404.ejs');
}
module.exports = WebController;
