/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-18 14:59:20
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-12 11:03:50
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, TEXT, DATE } = app.Sequelize;
  const MzcAbout = app.model.define('mzc-about', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: 'ID', // 备注
    },
    category_id: {
      allowNull: !1, // 是否为空
      type: INTEGER(8).UNSIGNED, // 类型
      defaultValue: '0', // 默认值
      comment: '关联父表id', // 备注
    },
    dropId: {
      allowNull: !1, // 是否为空
      type: STRING(2), // 类型
      defaultValue: '0', // 默认值
      comment: '菜单id值', // 备注 0 -> 不存在
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
    avatarImage: {
      allowNull: !0, // 是否为空
      type: STRING(40), // 类型
      defaultValue: '', // 默认值
      comment: '图片', // 备注
    },
    status: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '1', // 默认值
      comment: '状态', // 备注
    },
    sort: {
      allowNull: !0, // 是否为空
      type: INTEGER(6), // 类型
      defaultValue: '0', // 默认值
      comment: '排序', // 备注
    },
    created_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '创建时间', // 备注
      get () {
        return moment(this.getDataValue('created_at')).valueOf();
      }
    },
    updated_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '修改时间', // 备注
      get () {
        return moment(this.getDataValue('updated_at')).valueOf();
      }
    },
    deleted_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '删除时间', // 备注
      get () {
        return moment(this.getDataValue('deleted_at')).valueOf();
      }
    },
  },
    {
      tableName: 'mzc-about',
    });

  MzcAbout.associate = function () {
    MzcAbout.belongsTo(app.model.MzcAboutDroptype, { foreignKey: 'category_id', targetKey: 'id', as: 'info' });
  }

  return MzcAbout;
};
