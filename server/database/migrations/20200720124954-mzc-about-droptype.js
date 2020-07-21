/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-20 20:49:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-21 17:11:17
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    await queryInterface.createTable('mzc-about-droptype', {
      id: {
        allowNull: !1, // 是否为空
        autoIncrement: !0, // 自增
        primaryKey: !0, // 主键
        type: INTEGER(8).UNSIGNED, // 类型
        comment: 'ID', // 备注
      },
      dropType: {
        allowNull: !1, // 是否为空
        type: STRING(2), // 类型
        defaultValue: '0', // 默认值
        comment: '下拉', // 备注 0 -> 不存在
      },
      dropContent: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '', // 默认值
        comment: '下拉内容', // 备注 0 -> 不存在
      },
      created_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '创建时间', // 备注
      },
      updated_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '修改时间', // 备注
      },
      delete_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '删除时间', // 备注
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mzc-about-droptype');
  },
};
