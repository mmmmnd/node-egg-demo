/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-24 16:08:59
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-24 16:14:14
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BOOLEAN, TEXT } = Sequelize;
    await queryInterface.createTable('mzc-company', {
      id: {
        allowNull: !1, // 是否为空
        autoIncrement: !0, // 自增
        primaryKey: !0, // 主键
        type: INTEGER(8).UNSIGNED, // 类型
        comment: 'ID', // 备注
      },
      category_id: {
        allowNull: !1, // 是否为空
        type: INTEGER, // 类型
        defaultValue: '0', // 默认值
        comment: '分类id', // 备注
      },
      title: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
        comment: '网站标题', // 备注
      },
      keywords: {
        allowNull: !1, // 是否为空
        type: STRING, // 类型
        defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
        comment: '公司关键词', // 备注
      },
      companyDescription: {
        allowNull: !1, // 是否为空
        type: STRING, // 类型
        defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
        comment: '公司描述', // 备注
      },
      companyTitle: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '', // 默认值
        comment: '标题', // 备注
      },
      content: {
        allowNull: !1, // 是否为空
        type: TEXT, // 类型
        defaultValue: '', // 默认值
        comment: '单页内容', // 备注
      },
      image: {
        allowNull: !0, // 是否为空
        type: STRING, // 类型
        defaultValue: '', // 默认值
        comment: '图片', // 备注
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
