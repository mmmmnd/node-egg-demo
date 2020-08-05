/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-30 09:51:56
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-30 11:05:26
 */
'use strict';

const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('mzc-culture', [
      {
        category_id: '0',
        title: '海南昆仑体育文化股份有限公司',
        keywords: '海南昆仑体育文化股份有限公司',
        companyDescription: '海南昆仑体育文化股份有限公司',
        cultureTitle: '团建强基础，党建上台阶”主题党日活动总结',
        cultureDescription: '为了贯彻落实学校党委工作部署精神，在党委指导和支持下，昆仑股份党支部以培养昆仑股份团队凝聚力为着手点，以创新拓展培训为形式，以“党员做先锋、支部成堡垒”为主要内容，开展了“团建强基础，党建上台阶”主题党日活动。党支部的全体党员、预备党员、入党积极分子及公司其他员工一百余人次积极参加了这次的活动。',
        url: '###',
        filepath: '/public/images/wh_img1.png',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mzc-culture', null, {});
  }
};
