/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-18 14:59:20
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-28 09:24:46
 */
'use strict';

const moment = require('moment');
const bcrypt = require('bcryptjs')

module.exports = app => {
	const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize;
	const MzcAdmin = app.model.define('mzc-admin', {
		id: {
			allowNull: !1, // 是否为空
			autoIncrement: !0, // 自增
			primaryKey: !0, // 主键
			type: INTEGER(8).UNSIGNED, // 类型
			comment: 'ID', // 备注
		},
		roles_id: {
			allowNull: !1, // 是否为空
			type: INTEGER(4), // 类型
			defaultValue: 0, // 默认值
			comment: '用户群组', // 备注
		},
		menu_id: {
			allowNull: !1, // 是否为空    
			type: STRING, // 类型
			comment: '菜单id', // 备注
			defaultValue: '', // 默认值
		},
		api_id: {
			allowNull: !1, // 是否为空    
			type: STRING, // 类型
			comment: '接口id', // 备注
			defaultValue: '', // 默认值
		},
		nickname: {
			allowNull: !1, // 是否为空
			type: STRING(10), // 类型
			defaultValue: '', // 默认值
			unique: true,// 唯一性
			comment: '账号', // 备注
		},
		user_name: {
			allowNull: !0, // 是否为空
			type: STRING(10), // 类型
			defaultValue: '', // 默认值
			comment: '用户名', // 备注
		},
		password: {
			allowNull: !1,// 是否为空
			type: STRING,// 类型
			comment: '密码',// 备注
			set (val) {
				const salt = bcrypt.genSaltSync(10);	// 加密
				const psw = bcrypt.hashSync(val, salt);	// 生成加密密码
				this.setDataValue("password", psw);
			},
		},
		avatar_image: {
			allowNull: !0, // 是否为空
			type: STRING(80), // 类型
			defaultValue: '', // 默认值
			comment: '头像', // 备注
		},
		phone: {
			type: STRING(20), // 类型
			allowNull: !0, // 是否为空
			defaultValue: '', // 默认值
			comment: '电话' // 备注
		},
		email: {
			type: STRING(60), // 类型
			allowNull: !0, // 是否为空
			defaultValue: '', // 默认值
			comment: '邮箱' // 备注
		},
		status: {
			allowNull: !1, // 是否为空
			type: BOOLEAN, // 类型
			defaultValue: '0', // 默认值
			comment: '状态', // 备注
		},
		login_count: {
			type: INTEGER(6), // 类型
			allowNull: !0, // 是否为空
			defaultValue: '0', // 默认值
			comment: '登录次数' // 备注
		},
		register_ip: {
			type: STRING(60), // 类型
			allowNull: !0, // 是否为空
			defaultValue: '', // 默认值
			comment: '注册ip' // 备注
		},
		last_login_ip: {
			type: STRING(60), // 类型
			allowNull: !0, // 是否为空
			defaultValue: '', // 默认值
			comment: '上一次登录ip' // 备注
		},
		last_login_time: {
			allowNull: !0, // 是否为空
			type: DATE, // 类型
			comment: '上一次登录时间', // 备注
			get () {
				return moment(this.getDataValue('last_login_time')).valueOf();
			},
			set (val) {
				this.setDataValue('last_login_time', val)
			}
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
			tableName: 'mzc-admin',
		});

	return MzcAdmin;
};
