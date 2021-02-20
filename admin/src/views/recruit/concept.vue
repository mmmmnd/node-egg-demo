<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-20 17:13:23
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 17:13:46
-->
<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-18 15:10:59
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-27 19:31:15
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <vSingle :listQuery="listQuery"
               :form="form"
               @updateItem="updateItem" />
    </div>
  </div>

</template>
<script>
import { aboutSingleList, aboutSingleEdit } from '@/api/about'
import vSingle from './component/single'
export default {
  components: { vSingle },
  data () {
    return {
      listQuery: {
        product_id: 29
      },
      form: {
        id: '',
        cid: '',
        title: '',
        keywords: '',
        description: '',
        content: '',
        status: true,
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    /**
     * form表单
     */
    getList () {
      this.listLoading = true
      aboutSingleList(this.listQuery)
        .then(response => {
          this.form = response.data;
          this.listLoading = false;
        })
    },
    /**
     * 父页面执行 修改
     */
    updateItem (Obj, cab) {
      aboutSingleEdit(Obj).then(res => cab(res))
    },
  }
}
</script>