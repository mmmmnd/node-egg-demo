/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-17 15:00:18
 */
'use strict';

/**
 *
 * @param { String } items
 * @param { Number } pid
 * @param { Array } arrs
 */

function getTree(items, pid = 0, arrs = []) {
  items.forEach(item => {
    if (item.pid === pid) {
      arrs.push(item);
      item.children = getTree(items, item.id);
    }
  });
  return arrs;
}

module.exports = {
  getTree,
};
