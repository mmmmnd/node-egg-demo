/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-14 09:59:11
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593516950179_1189';

  // add your middleware config here
  config.middleware = [];

  // ejs
  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'egg-demo',
    timezone: '+08:00',
    define: {  // model的全局配置
      timestamps: true,   // 添加create,update,delete时间戳
      paranoid: true,   // 添加软删除
      freezeTableName: true,  // 防止修改表名为复数
      underscored: false  // 防止驼峰式字段被默认转为下划线
    },
    dialectOptions: {  // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast (field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
