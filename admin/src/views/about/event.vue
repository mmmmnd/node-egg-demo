<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-25 16:10:15
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-25 16:10:23
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <vList :select="select"
             :list="list"
             :total="total"
             :rules="rules"
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
import { aboutIndex, aboutDroptypeList, aboutUpdate, aboutAdd, aboutDestroy, aboutEdit, aboutMove } from '@/api/about'
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
        product_id: 5, //菜单id
        category_id: ''
      },
      select: [], //下拉
      selectType: [], //剪切类型
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        title: [{ type: 'string', required: true, message: '请输入标题', trigger: 'blur' }],
        avatar_image: [{ required: true, message: '请上传图片', }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      }
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
      if (typeof params === 'number') {
        this.listQuery.category_id = params
      } else if (typeof params === 'object') {
        params.product_id = this.listQuery.product_id;
        params.category_id = this.listQuery.category_id;
        this.listQuery = params
      } else {
        this.listQuery.category_id = ''
      }
      aboutIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total;
        })
      aboutDroptypeList(this.listQuery)
        .then(res => {
          this.select = res.data;
        })
      aboutDroptypeList()
        .then(res => {
          this.selectType = res.data
        })
    },
    /**
     * 父页面执行 删除
     */
    destroyData (Obj, cab) {
      aboutDestroy(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 更新
     */
    updateData (Obj, cab) {
      aboutEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      aboutAdd(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 编辑
     */
    updateItem (Obj, cab) {
      aboutUpdate(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 移动
     */
    moveData (Obj, cab) {
      aboutMove(Obj).then(res => cab(res))
    }
  }
}
</script>