/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-17 17:25:44
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

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler']

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  }
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
    logging: false,//输出日志信息
    define: {  // model的全局配置
      timestamps: true,   // 添加create,update,delete时间戳
      paranoid: true,   // 添加软删除
      freezeTableName: true,  // 防止修改表名为复数
      underscored: false,  // 防止驼峰式字段被默认转为下划线
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    }
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0
    }
  }

  config.jwt = {
    secret: "123456",//自定义 token 的加密条件字符串
    expired: 30 * 60,
    params: { algorithm: 'HS256' }
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.validatePlus = {
    resolveError (ctx, errors) {
      let type = '', msg = '';
      if (errors.length) {
        for (var item of errors) { type += item.field + ' '; msg += item.message + ' '; }
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
          code: 400,
          msg: `错误类型${type},错误信息${msg}`,
        };
      }
    }
  };

  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['.png', '.jpg'], // 扩展几种上传的文件格式
  };

  // add your user config here
  const userConfig = {
    usetToken: 'token',
  };

  return {
    ...config,
    ...userConfig,
  };
};
