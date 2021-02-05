/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 19:53:57
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-05 09:47:24
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize;
  const MzcAdvert = app.model.define('mzc-advert', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: 'ID', // 备注
    },
    title: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      defaultValue: '', // 默认值
      comment: '标题', // 备注
    },
    file_path: {
      allowNull: !1, // 是否为空
      type: STRING(150), // 类型
      defaultValue: '', // 默认值
      comment: '图片', // 备注
    },
    place: {
      allowNull: !1, // 是否为空
      type: INTEGER(6).UNSIGNED, // 类型
      defaultValue: '0', // 默认值
      comment: '文件类型 0->首页轮播 1->页面轮播广告 2->页面banner 3->公司轮播介绍', // 备注
    },
    parent_id: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '0', // 默认值
      comment: '菜单id', // 备注
    },
    ser_id: {
      allowNull: !1, // 是否为空
      type: STRING(3), // 类型
      defaultValue: '0', // 默认值
      comment: '对应place为3的公司轮播介绍id顺序', // 备注
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
    created_user_id: {
      allowNull: !1, // 是否为空
      type: INTEGER(8), // 类型
      comment: '用户创建id', // 备注
      defaultValue: '0', // 默认值
    },
    updated_user_id: {
      allowNull: !1, // 是否为空
      type: INTEGER(8), // 类型
      comment: '用户修改id', // 备注
      defaultValue: '0', // 默认值
    },
    created_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '创建时间', // 备注
      get () {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
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
      tableName: 'mzc-advert',
    });

  return MzcAdvert;
};
