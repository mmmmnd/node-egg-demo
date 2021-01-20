<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-19 11:47:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-20 17:42:57
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <vList :select="select"
             :list="list"
             :total="total"
             @destroyData="destroyData"
             @updateData="updateData"
             @createData="createData"
             @updateItem="updateItem" />
    </div>
  </div>

</template>
<script>
import { aboutIndex, aboutDroptypeList, aboutUpdate, aboutAdd, aboutDestroy, aboutEdit, aboutFilters } from '@/api/about'
import vList from './component/list'
export default {
  components: { vList },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        product_id: 4
      },
      select: [], //下拉
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        aboutTitle: [{ type: 'string', required: true, message: '请输入列表标题', trigger: 'blur' }],
        title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        companyDescription: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        sort: [{ type: 'integer', required: true, message: '请选择排序', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    getList (id) {
      this.listLoading = true
      // this.listQuery.type = typeof id === 'number' ? id : this.temp.categoryId;
      aboutIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total;
          this.listLoading = false;
        })
      aboutDroptypeList(this.listQuery)
        .then(res => {
          this.select = res.data;
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
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/about/pid/1/cid/" + row.product_id, "blank");
    }
  }
}
</script>