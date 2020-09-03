/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-02 10:45:02
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const ctx = this.ctx;
    ctx.body = await ctx.service.home.list();
  }

  async login () {
    const { ctx, app } = this;

    //获取用户端传递过来的参数
    const data = ctx.query;

    // 进行验证 data 数据 登录是否成功
    // .........
    //成功过后进行一下操作

    //生成 token 的方式
    const token = app.jwt.sign({

      username: data.username, //需要存储的 token 数据
      //......

    }, app.config.jwt.secret, {
      expiresIn: '60m', // 时间根据自己定，具体可参考jsonwebtoken插件官方说明
    });
    // 生成的token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NjAzNDY5MDN9.B95GqH-fdRpyZIE5g_T0l8RgzNyWOyXepkLiynWqrJg

    // 返回 token 到前端

    ctx.set({ 'token': token });
    ctx.body = token;
  };
  async indexs () {

    const { ctx, app } = this;

    /* 
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/

    ctx.body = { code: 0, msg: '验11证成功' };
  }

}

module.exports = HomeController;
