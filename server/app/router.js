/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-18 16:53:45
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt); // token验证

  // 前端路由
  router.get('/', controller.web.index);
  router.get('/about/pid/:pid/cid/:cid', controller.web.about);
  router.get('/services/pid/:pid/cid/:cid', controller.web.services);
  router.get('/company/pid/:pid/cid/:cid', controller.web.company);
  router.get('/culture/pid/:pid/cid/:cid', controller.web.culture);
  router.get('/culture/pid/:pid/cid/:cid/page/:page', controller.web.culture);
  router.get('/culture_info/pid/:pid/cid/:cid/id/:id', controller.web.culture_info);
  router.get('/news/pid/:pid/cid/:cid', controller.web.news);
  router.get('/news/pid/:pid/cid/:cid/page/:page', controller.web.news);
  router.get('/news_info/pid/:pid/cid/:cid/id/:id', controller.web.news_info);
  router.get('/cases/pid/:pid/cid/:cid', controller.web.cases);
  router.get('/cases/pid/:pid/cid/:cid/page/:page', controller.web.cases);
  router.get('/cases_info/pid/:pid/cid/:cid/id/:id', controller.web.cases_info);
  router.get('/recruit/pid/:pid/cid/:cid', controller.web.recruit);
  router.get('/contact/pid/:pid/cid/:cid', controller.web.contact);
  router.get('/captcha', controller.web.captcha);

  // message
  router.post('/api/message/userInfo', controller.message.userInfo);

  // admin
  router.post('/api/admin/create', controller.admin.create);
  router.post('/api/admin/login', controller.admin.login);
  router.post('/api/admin/logout', jwt, controller.admin.logout);
  router.get('/api/admin/current', jwt, controller.admin.current);

  // menu
  router.get('/api/menu/index', jwt, controller.menu.index);
  router.post('/api/menu/update', jwt, controller.menu.update);


  app.resources('home', '/home', app.controller.home);
  router.get('*', controller.web.error); // 404

  // router.post('/home/login', controller.home.login);
  // router.post('/home/indexs', jwt, controller.home.indexs);

};
