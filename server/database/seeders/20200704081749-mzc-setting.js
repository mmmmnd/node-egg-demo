/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-04 16:17:49
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-14 20:37:36
 */
'use strict';

const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('mzc-setting', [
      {
        title: '海南昆仑体育文化股份有限公司',
        companyName: '海南昆仑体育文化股份有限公司',
        keywords: '海南昆仑体育文化股份有限公司',
        companyDescription: '海南昆仑体育文化股份有限公司',
        logo: '/public/images/menu-logo.png',
        address: '海南省海口市桂林洋高校区海口经济学院昆仑体育文化大厦',
        phone: '0898-65771519',
        email: 'xuhao7jump@msn.cn',
        longitude: '110.492659',
        latitude: '19.971976',
        record: '琼ICP备88888888号',
        weChatCode: '/public/images/qrcode.png',
        weiboCode: '/public/images/qrcode.png',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mzc-setting', null, {});
  },
};
