/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-06 09:11:37
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.web.index);
  router.get('/about', controller.web.about);
  router.get('/services', controller.web.services);
  router.get('/company', controller.web.company);
  router.get('/culture', controller.web.culture);
  router.get('/culture_info', controller.web.culture_info);

  // app.resources('home', '/home', app.controller.home);
  router.get('*', controller.web.error); // 404
};
