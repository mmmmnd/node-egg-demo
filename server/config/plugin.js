/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-02 10:45:19
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // ejs
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },

  // sequelize
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  redis: {
    enable: false,
    package: 'egg-redis',
  },

  jwt: {
    enable: true,
    package: "egg-jwt"
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
