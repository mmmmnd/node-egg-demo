/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-18 15:37:40
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-19 08:44:21
 */
module.exports = app => {
  app.beforeStart(async () => {
    // 从配置中心获取 MySQL 的配置
    await app.model.sync({ force: false });
  });
};