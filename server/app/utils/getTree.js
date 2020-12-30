/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-30 18:11:04
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
    items = JSON.parse(JSON.stringify(items));

    const parents = this._getMenuType(items, id, type)
    parents.filter(parent => {
      const children = this.menuList(items, type, parent.id)
      if (children.length > 0) parent['children'] = type == 'menu' ? this._setIcon(children) : children
    });

    return parents
  }

  /**
   * 关于我们
   * @param { Array } items 数组对象
   * @param { Array } about about分类
   */
  static aboutList (items, about) {
    items = JSON.parse(JSON.stringify(items));
    about = JSON.parse(JSON.stringify(about));

    items.forEach((item, index) => {
      const children = this._getMenuType(about, item.id, 'about');
      item.index = item.id, item.id = index + 100
      if (children.length > 0) item['children'] = this._setIcon(children)
    })

    return items
  }

  static apiList (routes, apis, id = 0) {
    apis = JSON.parse(JSON.stringify(apis));

    const routess = this.menuList(routes, 'apiList')

    const parents = this._getMenuType(routess, id, 'menu')
    parents.forEach(parent => {
      const childrens = this.apiList(routess, apis, parent.id);
      parent.index = parent.id, parent.id = parent.id + 1000
      if (childrens.length > 0) parent['children'] = childrens
    })

    return parents
  }
  /**
    * 接口列表
    * @param { Array } routes 菜单
    * @param { Array } apis 接口列表
    */
  //  static apiList (routes, apis, id = 0) {
  //   routes = JSON.parse(JSON.stringify(routes));
  //   apis = JSON.parse(JSON.stringify(apis));

  //   const parents = this._getMenuType(routes, id, 'menu')
  //   parents.forEach(parent => {
  //     const childrens = this.apiList(routes, apis, parent.id);
  //     if (childrens.length > 0) {
  //       parent['index'] = parent['id'],
  //         parent['id'] = parent['id'] + 1000,
  //         parent['describe'] = parent['title'],
  //         parent['nameTitle'] = parent['title']
  //       childrens.forEach(children => {
  //         const apiChildren = this._getMenuType(apis, children.id, 'apiList')
  //         children['index'] = children['id'],
  //           children['id'] = children['id'] + 1000,
  //           children['describe'] = children['title'];
  //         apiChildren.filter(apiItem => {
  //           apiItem.selectArr = []
  //           apiItem['title'] = apiItem['describe']
  //           apiItem.selectArr.push(parent['index'])
  //           apiItem.selectArr.push(children['index'])
  //         })
  //         if (apiChildren.length > 0) children['children'] = this._setIcon(apiChildren)
  //       })
  //       parent['children'] = this._setIcon(childrens)
  //     }
  //   })
  //   return parents
  // }
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
      /**
       * 接口菜单
       */
      case 'api':
        items.forEach(item => item.pid === id && arrs.push(item));

        return arrs
      /**
       * 接口菜单
       */
      case 'apiList':
        items.forEach(item => item.pid === id && arrs.push(item));

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