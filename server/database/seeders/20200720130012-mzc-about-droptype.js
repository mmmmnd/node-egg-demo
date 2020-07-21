/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-20 21:00:12
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-21 09:59:20
 */
'use strict';

const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('mzc-about-droptype', [
      {
        dropType: '4',
        dropContent: '全部',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      }, {
        dropType: '4',
        dropContent: '执行董事',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      }, {
        dropType: '4',
        dropContent: '非执行董事',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      }, {
        dropType: '4',
        dropContent: '独立非执行董事',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      }, {
        dropType: '5',
        dropContent: '2019',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      }, {
        dropType: '5',
        dropContent: '2018',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      }, {
        dropType: '5',
        dropContent: '2017',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mzc-about-droptype', null, {});
  },
};
