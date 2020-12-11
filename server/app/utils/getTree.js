/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-11 10:52:35
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
  static menuList (items, type, about, id = 0) {
    items = JSON.parse(JSON.stringify(items));

    if (about) {
      about = JSON.parse(JSON.stringify(about));

      items.forEach((item, index) => {
        const childrenAbout = this._getMenuType(about, item.id, type);
        item.index = item.id, item.id = index + 100
        if (childrenAbout.length > 0) item['children'] = this._setIcon(childrenAbout)
      })

      return items
    }

    const parents = this._getMenuType(items, id, type)
    parents.filter(parent => {
      const children = this.menuList(items, type, false, parent.id)
      if (children.length > 0) parent['children'] = type == 'menu' ? this._setIcon(children) : children
    });

    return parents
  }

  /**
  * 后台菜单 私有方法
  * @param { Array } items 菜单列表
  * @param { String } type 类型
  * @param { Number } id 父id
  * @param { Array } arrs 返回数组
  */
  static _getMenuType (items, id, type, arrs = []) {
    switch (type) {
      /**
       * 前台菜单
       */
      case 'router':
        items.filter(item => item.pid === id && arrs.push({
          id: item.id,
          path: item.path,
          name: item.name,
          component: item.redirect,
          hidden: item.hidden,
          sort: item.sort,
          meta: { title: item.title, icon: item.icon, noCache: item.noCache, breadcrumb: item.breadcrumb }
        })
        );

        return arrs.sort((a, b) => b.sort - a.sort)
      /**
       * 页面菜单
       */
      case 'menu':
        items.filter(item => item.pid === id && arrs.push(item));

        return arrs
      /**
       * about下拉分类
       */
      case 'about':
        items.forEach(item => item.dropId === id && item.id !== 1 && arrs.push(item));

        return arrs
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
}

module.exports = GetTree;