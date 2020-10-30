/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 19:53:57
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-30 16:22:05
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
    url: {
      allowNull: !1, // 是否为空
      type: STRING(150), // 类型
      defaultValue: '#', // 默认值
      comment: '超链接', // 备注
    },
    filepath: {
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
    parentId: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '0', // 默认值
      comment: '菜单id', // 备注
    },
    serId: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '0', // 默认值
      comment: '对应place为1的轮播图广告id顺序', // 备注
    },
    remark: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '', // 默认值
      comment: '内容', // 备注
    },
    status: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '0', // 默认值
      comment: '状态', // 备注
    },
    sort: {
      allowNull: !1, // 是否为空
      type: STRING(6), // 类型
      defaultValue: '0', // 默认值
      comment: '排序', // 备注
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
