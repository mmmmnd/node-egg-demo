/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 09:21:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-21 11:38:39
 */
'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const MzcAboutDroptype = app.model.define('mzc-about-droptype', {
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
  },
  {
    timestamps: !1,
    tableName: 'mzc-about-droptype',
    underscored: !1,
  });

  return MzcAboutDroptype;
};
