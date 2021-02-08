/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-30 11:10:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-08 16:16:48
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, TEXT, MEDIUMINT, DATE, BOOLEAN } = app.Sequelize;
  const MzcCulture = app.model.define('mzc-culture', {
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
    site_title: {
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
    description: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
      comment: '公司描述', // 备注
    },
    title: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      defaultValue: '', // 默认值
      comment: '标题', // 备注
    },
    image: {
      allowNull: !1, // 是否为空
      type: STRING(150), // 类型
      defaultValue: '', // 默认值
      comment: '图片', // 备注
    },
    content: {
      allowNull: !0, // 是否为空
      type: TEXT, // 类型
      defaultValue: '', // 默认值
      comment: '内容', // 备注
    },
    click: {
      allowNull: !1, // 是否为空
      type: MEDIUMINT(8).UNSIGNED, // 类型
      defaultValue: '0', // 默认值
      comment: '点击次数', // 备注
    },
    status: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '1', // 默认值
      comment: '状态', // 备注
    },
    sort: {
      allowNull: !1, // 是否为空
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
      tableName: 'mzc-culture',
    });

  return MzcCulture;
};
