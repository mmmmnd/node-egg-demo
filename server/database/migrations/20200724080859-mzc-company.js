/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-24 16:08:59
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-27 16:12:59
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT } = Sequelize;
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
      },
      address:{
        allowNull: !0, // 是否为空
        type: STRING(60), // 类型
        defaultValue: '', // 默认值
        comment: '地址', // 备注
      },
      website:{
        allowNull: !0, // 是否为空
        type: STRING(60), // 类型
        defaultValue: '', // 默认值
        comment: '网站', // 备注
      },
      email:{
        allowNull: !0, // 是否为空
        type: STRING(60), // 类型
        defaultValue: '', // 默认值
        comment: '电子邮箱', // 备注
      },
      phone:{
        allowNull: !0, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '', // 默认值
        comment: '联系电话', // 备注
      },
      sort: {
        allowNull: !1, // 是否为空
        type: STRING(6), // 类型
        defaultValue: '0', // 默认值
        comment: '排序', // 备注
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
    await queryInterface.dropTable('mzc-company');
  }
};
