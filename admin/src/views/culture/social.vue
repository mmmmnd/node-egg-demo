<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-08 15:41:33
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-08 17:29:05
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <vList :select="select"
             :list="list"
             :total="total"
             :listQuery="listQuery"
             :selectType="selectType"
             @destroyData="destroyData"
             @updateData="updateData"
             @createData="createData"
             @updateItem="updateItem"
             @moveData="moveData"
             @getList="getList" />
    </div>
  </div>

</template>
<script>
import { cultureIndex, cultureUpdate, cultureDestroy, cultureEdit, cultureAdd, cultureMove } from '@/api/culture'
import { menuDetail } from '@/api/menu'

import vList from './component/list'
export default {
  components: { vList },
  data () {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        pid: 16,//分类菜单 
        category_id: 18
      },
      select: [], //下拉
      selectType: [], //剪切类型
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    getList (params) {
      cultureIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total;
          return menuDetail(this.listQuery)
        })
        .then(res => {
          this.select = res.data;
        })
    },
    /**
     * 父页面执行 删除
     */
    destroyData (Obj, cab) {
      cultureDestroy(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 更新
     */
    updateData (Obj, cab) {
      cultureEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      cultureAdd(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 编辑
     */
    updateItem (Obj, cab) {
      cultureUpdate(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 移动
     */
    moveData (Obj, cab) {
      cultureMove(Obj).then(res => cab(res))
    }
  }
}
</script>