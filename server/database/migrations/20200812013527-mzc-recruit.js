/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-12 09:35:27
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-12 17:29:32
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('mzc-recruit', {
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
      position: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '职位', // 默认值
        comment: '职位', // 备注
      },
      address: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '地址', // 默认值
        comment: '地址', // 备注
      },
      people: {
        allowNull: !1, // 是否为空
        type: STRING(5), // 类型
        defaultValue: '人数', // 默认值
        comment: '人数', // 备注
      },
      education: {
        allowNull: !1, // 是否为空
        type: STRING(10), // 类型
        defaultValue: '学历', // 默认值
        comment: '学历', // 备注
      },
      sex: {
        allowNull: !1, // 是否为空
        type: STRING(5), // 类型
        defaultValue: '性别', // 默认值
        comment: '性别', // 备注
      },
      content: {
        allowNull: !1, // 是否为空
        type: TEXT, // 类型
        defaultValue: '', // 默认值
        comment: '内容', // 备注
      },
      created_time: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '发布时间', // 备注
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
    await queryInterface.dropTable('mzc-recruit');
  }
};
