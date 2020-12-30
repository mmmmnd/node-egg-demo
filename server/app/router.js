/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-30 15:16:02
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt); // token验证
  router.prefix = '/api/';

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
  router.post('/api/message/create', controller.message.create);

  // admin
  router.post('/api/admin/create', controller.admin.create);
  router.post('/api/admin/login', controller.admin.login);
  router.post('/api/admin/logout', jwt, controller.admin.logout);
  router.get('/api/admin/current', jwt, controller.admin.current);
  router.get('/api/admin/list', jwt, controller.admin.list)
  router.post('/api/admin/edit', jwt, controller.admin.edit)
  router.post('/api/admin/add', jwt, controller.admin.add)
  router.put('/api/admin/update', jwt, controller.admin.update)

  // menu
  router.get('/api/menu/index', jwt, controller.menu.index);
  router.put('/api/menu/update', jwt, controller.menu.update);
  router.post('/api/menu/edit', jwt, controller.menu.edit);

  // aboutSingle
  router.get('/api/aboutSingle/index', jwt, controller.aboutSingle.index)
  router.put('/api/aboutSingle/update', jwt, controller.aboutSingle.update)
  router.get('/api/aboutSingle/detail', jwt, controller.aboutSingle.detail)
  router.post('/api/aboutSingle/edit', jwt, controller.aboutSingle.edit)

  // about
  router.get('/api/about/index', jwt, controller.about.index)
  router.put('/api/about/update', jwt, controller.about.update);
  router.post('/api/about/add', jwt, controller.about.add);
  router.delete('/api/about/destroy', jwt, controller.about.destroy);
  router.post('/api/about/edit', jwt, controller.about.edit);
  router.get('/api/about/filters', jwt, controller.about.index);

  // aboutDroptype
  router.get('/api/aboutDroptype/index', jwt, controller.aboutDroptype.index)
  router.put('/api/aboutDroptype/update', jwt, controller.aboutDroptype.update)
  router.post('/api/aboutDroptype/edit', jwt, controller.aboutDroptype.edit);
  router.post('/api/aboutDroptype/add', jwt, controller.aboutDroptype.add);
  router.get('/api/aboutDroptype/list', jwt, controller.aboutDroptype.list)
  router.delete('/api/aboutDroptype/destroy', jwt, controller.aboutDroptype.destroy);

  // services
  router.get('/api/services/list', jwt, controller.services.list)
  router.put('/api/services/update', jwt, controller.services.update)
  router.post('/api/services/edit', jwt, controller.services.edit)

  // company
  router.get('/api/company/index', jwt, controller.company.index)
  router.put('/api/company/update', jwt, controller.company.update)
  router.post('/api/company/edit', jwt, controller.company.edit)
  router.delete('/api/company/destroy', jwt, controller.company.destroy);
  router.post('/api/company/add', jwt, controller.company.add);

  // culture
  router.get('/api/culture/index', jwt, controller.culture.index)
  router.put('/api/culture/update', jwt, controller.culture.update)
  router.delete('/api/culture/destroy', jwt, controller.culture.destroy);
  router.post('/api/culture/edit', jwt, controller.culture.edit);
  router.post('/api/culture/add', jwt, controller.culture.add);

  // news
  router.get('/api/news/index', jwt, controller.news.index)
  router.put('/api/news/update', jwt, controller.news.update)
  router.delete('/api/news/destroy', jwt, controller.news.destroy);
  router.post('/api/news/edit', jwt, controller.news.edit);
  router.post('/api/news/add', jwt, controller.news.add);

  // cases
  router.get('/api/cases/index', jwt, controller.cases.index)
  router.put('/api/cases/update', jwt, controller.cases.update)
  router.delete('/api/cases/destroy', jwt, controller.cases.destroy)
  router.post('/api/cases/edit', jwt, controller.cases.edit);
  router.post('/api/cases/add', jwt, controller.cases.add);

  // recruit
  router.get('/api/recruit/index', jwt, controller.recruit.index)
  router.put('/api/recruit/update', jwt, controller.recruit.update)
  router.delete('/api/recruit/destroy', jwt, controller.recruit.destroy)
  router.post('/api/recruit/edit', jwt, controller.recruit.edit);
  router.post('/api/recruit/add', jwt, controller.recruit.add);

  // recruitDroptype
  router.get('/api/recruitDroptype/index', jwt, controller.recruitDroptype.index)
  router.put('/api/recruitDroptype/update', jwt, controller.recruitDroptype.update)
  router.delete('/api/recruitDroptype/destroy', jwt, controller.recruitDroptype.destroy)
  router.post('/api/recruitDroptype/edit', jwt, controller.recruitDroptype.edit);
  router.post('/api/recruitDroptype/add', jwt, controller.recruitDroptype.add);

  // settings
  router.get('/api/settings/list', jwt, controller.settings.list);
  router.post('/api/settings/edit', jwt, controller.settings.edit);

  // upload
  router.post('/api/upload/create', jwt, controller.upload.create);

  // advert
  router.post('/api/advert/edit', jwt, controller.advert.edit);
  router.post('/api/advert/add', jwt, controller.advert.add)
  router.put('/api/advert/update', jwt, controller.advert.update)
  router.get('/api/advert/detail', jwt, controller.advert.detail)
  router.delete('/api/advert/destroy', jwt, controller.advert.destroy);

  // routes
  router.get('/api/routes/index', jwt, controller.routes.index)
  router.get('/api/routes/list', jwt, controller.routes.list)
  router.post('/api/routes/add', jwt, controller.routes.add)
  router.post('/api/routes/edit', jwt, controller.routes.edit)

  // api
  router.get('/api/api/index', jwt, controller.api.index)
  router.post('/api/api/add', jwt, controller.api.add)
  router.post('/api/api/edit', jwt, controller.api.edit)

  // roles
  router.get('/api/roles/index', jwt, controller.roles.index)
  router.post('/api/roles/add', jwt, controller.roles.add)
  router.put('/api/roles/update', jwt, controller.roles.update)
  router.post('/api/roles/edit', jwt, controller.roles.edit)
  router.get('/api/roles/list', jwt, controller.roles.list)

  // 404
  router.get('*', controller.web.error); // 404
};