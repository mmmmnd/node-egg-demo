/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-26 11:58:05
 */
'use strict';

class GetTree {
  /**
   * 菜单列表
   * @param { Array } items 数组对象
   * @param { String } type 类型
   * @param { Array } about about分类
   * @param { Number } id 父id
   */
  static menuList (items, type, id = 0) {
    items = this.isObject(items)

    const parents = this._getMenuType(items, id, type)
    parents.filter(parent => {
      const children = this.menuList(items, type, parent.id)
      if (children.length > 0) parent['children'] = type == 'menu' ? this._setIcon(children) : children
    });

    return parents
  }
  /**
   * 菜单列表显示用户接口权限
   * @param { Array } items 数组对象
   * @param { Array } api //接口数组
   * @param { String } type 类型
   * @param { Array } about about分类
   * @param { Number } id 父id
   */
  static menuAndApiList (items, api, type, id = 0) {
    items = this.isObject(items)

    const parents = this._getMenuType(items, id, type)
    parents.filter(parent => {
      const children = this.menuAndApiList(items, api, type, parent.id)
      if (children.length > 0) {
        this._getMenuType(children, api, 'api')
        parent['children'] = type == 'menu' ? this._setIcon(children) : children
      }
    });

    return parents
  }
  /**
   * 关于我们
   * @param { Array } items 数组对象
   * @param { Array } about about分类
   */
  static aboutList (items, about) {
    items = this.isObject(items), about = this.isObject(about);

    items.forEach((item, index) => {
      const children = this._getMenuType(about, item.id, 'about');
      item.index = item.id, item.id = index + 100
      if (children.length > 0) item['children'] = this._setIcon(children)
    })

    return items
  }
  /**
   * 接口菜单
   * @param { Array } routes 菜单列表
   * @param { Array } apis 接口列表
   * @param { String } type 类型
   * @param { Array } obj 定义父类
   */
  static apiList (routes, apis, type, obj = { index: 0 }) {
    routes = this.isObject(routes), apis = this.isObject(apis);

    const parents = this._getMenuType(routes, obj, type)
    parents.filter(parent => {
      const children = this.apiList(routes, apis, type, parent)
      if (children.length > 0) parent['children'] = this._setIcon(children)
      else if (children.length == 0 && apis.length > 0) {
        const apiChildren = this._getMenuType(apis, parent, type)
        if (apiChildren.length > 0) parent['children'] = this._setIcon(apiChildren)
      }
    })

    return parents
  }
  /**
  * 后台菜单 私有方法
  * @param { Array } items 菜单列表
  * @param { String } type 类型
  * @param { Number || Object } value 父id || 父的item值
  * @param { Array } arrs 返回数组
  */
  static _getMenuType (items, value, type, arrs = []) {
    switch (type) {
      /**
       * 前台菜单
       */
      case 'router':
        items.filter(item => item.pid === value && arrs.push({
          id: item.id,
          pid: item.pid,
          path: item.path,
          name: item.name,
          component: item.component,
          redirect: item.redirect,
          hidden: item.hidden,
          sort: item.sort,
          meta: { title: item.title, icon: item.icon, noCache: item.noCache, breadcrumb: item.breadcrumb }
        })
        );

        arrs.sort((a, b) => a.id - b.id)
        return arrs.sort((a, b) => a.sort - b.sort)
      /**
       * 页面菜单
       */
      case 'menu':
        items.filter(item => item.pid === value && arrs.push(item));

        return arrs
      /**
       * about下拉分类
       */
      case 'about':
        items.forEach(item => item.product_id === value && item.value !== 1 && arrs.push(item));

        return arrs
      /**
       * 接口菜单
       */
      case 'apiList':
        items.forEach(item => {
          if (item.pid === value.index) {
            if (value.index !== 0) item.selectArr = !value.selectArr ? [value.index] : [...value.selectArr, value.index];

            item.index = item.id;
            item.id = item.id + 1000;
            if (item.describe) { item.title = item.describe; item.id = item.id - 1000; };
            arrs.push(item)
          }
        });

        return arrs
      /**
       * 菜单显示接口权限
       */
      case 'api':
        items.filter(items => {
          value.filter(valueItem => {
            if (items.id == valueItem.pid) {
              if (!items['meta'].btns) items['meta'].btns = [];
              items['meta'].btns.push(valueItem.code)
            }
          })
        })

        return items
    }

  }
  /**
   * 追加树状符合
   * @param { Array } items 数组对象
   */
  static _setIcon (items) {
    const [iconFirst, iconLast, item] = ['&nbsp;&nbsp;&nbsp;&nbsp;├', '&nbsp;&nbsp;&nbsp;&nbsp;└', items[items.length - 1]];

    items.forEach(item => item.nameTitle = iconFirst + item.title)
    item.nameTitle = iconLast + item.title

    return items;
  }
  /**
   * 校验对象
   * @param {Object} Obj 
   */
  static isObject (Obj) {
    return Obj instanceof Object ? JSON.parse(JSON.stringify(Obj)) : Obj
  }
}

module.exports = GetTree;