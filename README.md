## 一、这是个什么的项目？

基于 Node 开发一套企业官网，使用 Egg 二次开发一套适合多端的 RESTful API，同时配套完整RBAC后台权限管理系统。
前端展示基于 Ejs 服务端渲染，后台基于 Vue.js 前后端分离。

## 二、项目包含什么功能？

### 2.1.模板技术栈

* Jqeury、Bootstrap、
* 使用了图片懒加载及防抖及节流

### 2.2.前端技术栈

* 使用 Vue 、element基于vue-element-admin后台管理系统二次开发

### 2.3.后端技术栈

* Node/Egg、Sequelize/Mysql 、Redis、Jwt、Cors、Egg-validate-plus、Ejs

### 2.4.优势

* 使用Egg企业级框架做服务端 API 接口。
* 前端既有服务端渲染，也有前后端分离，且做了大量的优化工作，前端展示网站打开快。
* 使用RBAC权限管理 , 根据当前登录用户返回动态API菜单类型并做了用户接口权限。对于异常访问用户相关信息记录储存
* 性能优化方面的工作：
    * 服务端使用了缓存机制，减少服务器的请求压力，如Redis 缓存，HTTP缓存
    * 使用了 CND 加速，静态文件存储在七牛服务器上
    * Ejs 服务端渲染尽量减少文件的引入，减少对 DOM的操作，且封装使用了图片懒加载，事件防抖和节流控制浏览器滚动监听事件。
    * Vue.js 项目使用了模块按需加载，使用浏览器缓存机制减少对服务器请求的压力
    * ...

## 三、如何学习？

### 3.1.克隆项目

首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。

```
# 克隆项目代码
$ git clone https://github.com/mmmmnd/node-egg-demo.git
```

### 3.2.数据库

启动项目前一定要在创建好 `local-egg-demo` 数据库，以下是执行数据库命令：

```
# 登录数据库
$ mysql -uroot -p密码

# 创建 local-egg-demo 数据库
$ CREATE DATABASE IF NOT EXISTS local-egg-demo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3.3.Redis

项目使用了Redis，请在你的电脑上面装上Redis：：[「点击：附上Redis安装教程」](https://www.runoob.com/redis/redis-install.html)，安装好 Redis 后，需启动Redis。

### 3.4.修改 Egg 项目数据库配置

请在根目录下的 [——config/config.default.js](https://github.com/LFB/nodejs-koa-blog/blob/master/config/config.js) 文件下修改您本地的数据库名字和数据库密码 。

以下启动 Node 后端项目

```
# 启动 Egg 后端项目
1. 在根目录下进入server项目：cd server，
2. 安装依赖包，执行: npm install 命令，
3. 启动服务: npm run dev; 即可以启动。
```
以下是启动后台管理系统的操作命令：

```
# 启动后台管理系统
1. 在根目录下进入admin项目：cd admin，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 即可以访问。
```

### 四、接口说明
### 待添加接口说明文档

## License

喜欢或对你有帮助的话，请你点一个星星 **star** 鼓励我，或者您有更好的建议和意见，可以留言 [Issues](https://github.com/mmmmnd/node-egg-demo/issues/new)，或者发Email给我 handsome.mo@foxmail.com 希望能够帮助到你学习！Thanks！共勉！

[MIT](https://github.com/mmmmnd/node-egg-demo/blob/master/LICENSE), by mmmmnd
