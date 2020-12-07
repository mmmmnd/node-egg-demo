/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-07 18:42:09
 */
'use strict';

class GetTree {
  /**
   * 菜单列表
   * @param { Array } items 数组对象
   * @param { String } type 类型
   * @param { Number } id 父id
   */
  static menuList (items, type, about, id = 0) {
    items = JSON.parse(JSON.stringify(items));
    const parents = this._getMenuType(items, id, type)
    parents.filter(parent => {
      const children = this.menuList(items, type, parent.id)
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
          meta: { title: item.title, icon: item.icon, noCache: item.noCache }
        })
        );

        return arrs.sort((a, b) => b.sort - a.sort)
      /**
       * 页面菜单
       */
      case 'menu':
        items.filter(item => item.pid === id && arrs.push(item));

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
  /**
   * 
   * @param { Object } aboutDroptype 下拉菜单
   * @param { Object } aboutSingleMenu 菜单
   * @param { Array } data 返回数据
   */
  static aboutList (aboutDroptype, aboutSingleMenu, data = [], arrs = []) {
    aboutDroptype = JSON.parse(JSON.stringify(aboutDroptype));//下拉
    aboutSingleMenu = JSON.parse(JSON.stringify(aboutSingleMenu));//菜单
    const ICON = ['&nbsp;&nbsp;&nbsp;&nbsp;├', '&nbsp;&nbsp;&nbsp;&nbsp;└'];

    arrs = aboutSingleMenu.filter(father => {
      var branchArr = aboutDroptype.filter(child => {
        if (father.id == child.dropId && child.id !== 1) {
          child.treeNewTitle = ICON[0] + child.dropContent;
          return child
        }

      })

      branchArr.length ? father.children = branchArr : '';

      return father;
    })

    arrs.map((item, index) => {
      if (item.children) {
        var arr = item.children[item.children.length - 1];
        arr.treeNewTitle = arr.treeNewTitle.replace(ICON[0], ICON[1]);
      }
      data.push({
        id: index + 100, index: item.id, treeNewTitle: item.title, children: item.children
      })
    })

    return data
  }
  // static aboutLista (items, type, about, id = 0) {
  //   var parents = JSON.parse(JSON.stringify(items));
  //   about = JSON.parse(JSON.stringify(about));
  //   if (id !== 0) parents = this._getMenuTypea(about, id)
  //   parents.filter(parent => {
  //     const children = this.aboutLista(items, type, about, parent.id)
  //     if (children.length > 0) parent['children'] = this._setIcon(children)
  //   });

  //   return parents
  // }
  // static _getMenuTypea (about, id, arrs = []) {
  //   about.filter(item => item.dropId === id && arrs.push(item));
  //   return arrs;
  // }
  static aboutLista (items, type, about) {
    items = JSON.parse(JSON.stringify(items));
    about = JSON.parse(JSON.stringify(about));

    items.forEach(item => {
      const childrenAbout = this._childrenAbout(about, item.dropId);
      if (childrenAbout.length > 0) {
        item['children'] = childrenAbout
      }
    })
    return items;
  }
  static _childrenAbout (items, id, arrs = []) {
    console.log(items);
    items.forEach(item => {
      if (item.dropId === id) arrs.push(arr)
    })
    return arrs;
  }
}

module.exports = GetTree;