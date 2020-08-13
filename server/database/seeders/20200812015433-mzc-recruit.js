/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-12 09:54:33
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-12 17:32:21
 */
'use strict';

const moment = require('moment');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('mzc-recruit', [{
      category_id: '0',
      title: '海南昆仑体育文化股份有限公司',
      keywords: '海南昆仑体育文化股份有限公司',
      companyDescription: '海南昆仑体育文化股份有限公司',
      position: '职位',
      address: '地址',
      people: '人数',
      education: '学历',
      sex: '性别',
      content: '',
      created_time: moment().format('YYYY-MM-DD'),
      created_at: moment(Date.now()).valueOf(),
      updated_at: null,
      delete_at: null
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mzc-recruit', null, {});
  }
};
