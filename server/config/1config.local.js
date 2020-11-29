/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-25 15:11:32
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-29 20:43:34
 */
/** */
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


  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'local-egg-demo',
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

  config.jwt = {
    secret: "123456",//自定义 token 的加密条件字符串
    params: {
      algorithm: 'HS256',
      expiresIn: 60 * 4 * 60,
    }
  };
  
  return {
    ...config,
  };
};
