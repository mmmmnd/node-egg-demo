/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-02 16:01:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-02 20:07:41
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('mzc-menu', {
      id: {
        allowNull: !1, // 是否为空
        autoIncrement: !0, // 自增
        primaryKey: !0, // 主键
        type: INTEGER(8).UNSIGNED, // 类型
        comment: 'ID', // 备注
      },
      pid: {
        allowNull: !1, // 是否为空
        type: INTEGER(8).UNSIGNED, // 类型
        comment: '父id', // 备注
        defaultValue: '0', // 默认值
      },
      title: {
        allowNull: !1, // 是否为空
        type: STRING(30), // 类型
        comment: '标题', // 备注
        defaultValue: '0', // 默认值
      },
      url: {
        allowNull: !1, // 是否为空
        type: STRING(150), // 类型
        defaultValue: '#', // 默认值
        comment: '超链接', // 备注
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

    }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mzc-menu');
  },
};
