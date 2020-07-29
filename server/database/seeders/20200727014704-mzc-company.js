/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-27 09:47:04
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-27 11:32:56
 */
'use strict';

const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('mzc-company', [
      {
        category_id: '0',
        title: '海南昆仑体育文化股份有限公司',
        keywords: '海南中环能检测技术有限公司是一家综合性、专业性的第三方环境服务检测机构，2014年取得省计量认证CMA资质，可向社会独立出具公正环境检测数据',
        companyDescription: '环境及生态调查与评估、环保竣工验收、环境影响评价、排污许可申报、大气环境检测（废气、室内空气、油烟等）、水环境检测（生活饮用水、海水、地下水、废水等）、土壤环境检测（固体废物、底泥等）、声环境检测、油气回收等',
        companyTitle: '海南中环能检测技术有限公司',
        content: '<p>海南中环能检测技术有限公司是一家综合性、专业性的第三方环境服务检测机构，2014年取得省计量认证CMA资质，可向社会独立出具公正环境检测数据。公司自成立以来，以创建环境检测名牌实验室为目标，以严谨检测为依托，以诚信服务为后盾，以科学品质为保证，全方位致力于环保技术开发、服务、咨询。公司可提供的服务项目具体包括：环境及生态调查与评估、环保竣工验收、环境影响评价、排污许可申报、大气环境检测（废气、室内空气、油烟等）、水环境检测（生活饮用水、海水、地下水、废水等）、土壤环境检测（固体废物、底泥等）、声环境检测、油气回收等。</p><p>公司现有员工70余人，其中具有高级、中级、初级职称的技术人员近40人；公司1400余平米的标准化实验室内配备有国内外高端环境检测设备，如GC-MS、ICP-MS、气相色谱仪、离子色谱仪等。公司自开办以来，良好的信誉和专业的技术，为各县市环保、水务等主管部门以及各大企业、公司解决了众多难题，赢得了广大客户和社会的信赖。</p><p>志存高远，锐意进取，作为综合性、专业性的检测机构，中环能检测技术有限公司将不断探索求新，勇攀高峰。</p>',
        image: '/public/images/compy_img1.png',
        created_at: moment(Date.now()).valueOf(),
        updated_at: '',
        delete_at: '',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mzc-company', null, {});
  }
};
