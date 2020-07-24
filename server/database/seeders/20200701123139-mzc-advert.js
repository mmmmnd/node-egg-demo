/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 20:31:39
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-22 15:18:52
 */
'use strict';

const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('mzc-advert', [
      {
        title: '标题',
        url: 'news_info.html',
        filepath: '/public/images/banner.png',
        file_type: '1',
        place: '0',
        parentId:'0',
        status: '0',
        remark: '近千名越野爱好者挑战“中国版卢比肯路” “岩路·灵鹫山国际森林近千名越野爱好者挑战“中国版卢比肯路” “岩路·灵鹫山国际森林',
        sort: '0',
        admin_id: '0',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      },
      {
        title: '标题',
        url: 'news_info.html',
        filepath: '/public/images/banner2.png',
        file_type: '1',
        place: '0',
        parentId:'0',
        status: '0',
        remark: '近千名越野爱好者挑战“中国版卢比肯路” “岩路·灵鹫山国际森林近千名越野爱好者挑战“中国版卢比肯路” “岩路·灵鹫山国际森林',
        sort: '0',
        admin_id: '0',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      },
      {
        title: '标题',
        url: '###',
        filepath: '/public/images/banner.png',
        file_type: '1',
        place: '0',
        parentId:'0',
        status: '0',
        remark: '近千名越野爱好者挑战“中国版卢比肯路” “岩路·灵鹫山国际森林近千名越野爱好者挑战“中国版卢比肯路” “岩路·灵鹫山国际森林',
        sort: '0',
        admin_id: '0',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      },
      {
        title: '体育赛事',
        url: '###',
        filepath: '/public/images/ser_info.png',
        file_type: '1',
        place: '1',
        parentId:'0',
        status: '0',
        remark: '体育板块对于体育文化公司而言，不仅肩负着公司主要业务板块的开拓，更是公司的主打方向。',
        sort: '0',
        admin_id: '0',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      },
      {
        title: '电竞教育',
        url: '###',
        filepath: '/public/images/ser_info3.png',
        file_type: '1',
        place: '1',
        parentId:'0',
        status: '0',
        remark: '体育板块对于体育文化公司而言，不仅肩负着公司主要业务板块的开拓，更是公司的主打方向。',
        sort: '0',
        admin_id: '0',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      },
      {
        title: '文化服务',
        url: '###',
        filepath: '/public/images/ser_info2.png',
        file_type: '1',
        place: '1',
        parentId:'0',
        status: '0',
        remark: '体育板块对于体育文化公司而言，不仅肩负着公司主要业务板块的开拓，更是公司的主打方向。',
        sort: '0',
        admin_id: '0',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      },
      {
        title: '会议会展',
        url: '###',
        filepath: '/public/images/ser_info4.png',
        file_type: '1',
        place: '1',
        parentId:'0',
        status: '0',
        remark: '体育板块对于体育文化公司而言，不仅肩负着公司主要业务板块的开拓，更是公司的主打方向。',
        sort: '0',
        admin_id: '0',
        created_at: moment().format('YYYY-MM-DD'),
        updated_at: '',
        delete_at: '',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mzc-advert', null, {});
  },
};
