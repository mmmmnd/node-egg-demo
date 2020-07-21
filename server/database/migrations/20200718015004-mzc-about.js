/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-18 09:50:04
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-21 19:40:11
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BOOLEAN, TEXT } = Sequelize;
    await queryInterface.createTable('mzc-about', {
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
      aboutTitle: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '', // 默认值
        comment: '单页标题', // 备注
      },
      content: {
        allowNull: !1, // 是否为空
        type: TEXT, // 类型
        defaultValue: '', // 默认值
        comment: '单页内容', // 备注
      },
      type: {
        allowNull: !1, // 是否为空
        type: BOOLEAN, // 类型
        defaultValue: '0', // 默认值
        comment: '类型', // 备注 0 -> 单页 1 -> 列表
      },
      dropType: {
        allowNull: !1, // 是否为空
        type: STRING(2), // 类型
        defaultValue: '0', // 默认值
        comment: '下拉', // 备注 0 -> 不存在；菜单对于的二级id值
      },
      dropTypeId: {
        allowNull: !0, // 是否为空
        type: STRING(2), // 类型
        defaultValue: '0', // 默认值
        comment: '下拉id', // 备注 0 -> 不存在；菜单对于的二级id值
      },
      dropImage: {
        allowNull: !0, // 是否为空
        type: STRING, // 类型
        defaultValue: '', // 默认值
        comment: '图片', // 备注
      },
      satus: {
        allowNull: !1, // 是否为空
        type: BOOLEAN, // 类型
        defaultValue: '0', // 默认值
        comment: '状态', // 备注
      },
      sort: {
        allowNull: !0, // 是否为空
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
    await queryInterface.dropTable('mzc-about');
  },
};
