<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-12 15:26:40
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-12 16:05:52
 */
-->
<template>
  <div class="app-container">
    <el-table :data="list"
              style="width: 100%"
              @row-click="clickRowHandle"
              ref="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="访问信息">
              <span>{{ props.row.headers }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="id"
                       prop="id"
                       align="center">
      </el-table-column>
      <el-table-column label="用户id"
                       prop="user_id"
                       align="center">
      </el-table-column>
      <el-table-column label="ip"
                       prop="ip"
                       align="center">
      </el-table-column>
      <el-table-column label="api"
                       prop="api"
                       align="center">
      </el-table-column>
      <el-table-column label="访问时间"
                       prop="created_at"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_at | formatTime('{y}-{m}-{d} {h}:{i}')  }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />
  </div>

</template>

<script>
import { exceptionIndex } from '@/api/setting'

import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      category: [],
      showDialog: false,
      temp: {},
      dialogStatus: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 点击展开
     */
    clickRowHandle (row, column, event) {
      const { table } = this.$refs
      this.list.map(item => row.id != item.id && table.toggleRowExpansion(item, false))
      table.toggleRowExpansion(row)
    },
    /**
     * 获取列表 && 筛选
     */
    getList (id) {
      this.listLoading = true
      this.listQuery.category_id = typeof id === 'number' ? id : this.temp.categoryId;
      exceptionIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data
          this.total = response.data.meta.total
          this.listLoading = false
        })
    },
  }
}
</script>

<style >
.demo-table-expand .el-form-item {
  width: 100%;
}
</style>