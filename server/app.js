/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-18 15:37:40
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-11 17:31:23
 */
'use strict'

// module.exports = app => {
//   app.beforeStart(async () => {
//     // 从配置中心获取 MySQL 的配置
//     await app.model.sync({ force: false });
//   });
// };

const path = require('path');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  async willReady () {
    await this.app.model.sync({ force: false });
  }

  async didLoad () {
    // 引入validate目录，并注入app实例
    const directory = path.join(this.app.config.baseDir, 'app/validate');
    this.app.loader.loadToApp(directory, 'validate');
  }
}

module.exports = AppBootHook;