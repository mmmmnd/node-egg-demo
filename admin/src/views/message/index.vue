<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-23 11:21:12
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-23 11:33:15
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
            <el-form-item label="备注">
              <div v-html="props.row.remarks"></div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="姓名"
                       prop="name"
                       align="center">
      </el-table-column>
      <el-table-column label="电话"
                       prop="phone"
                       align="center">
      </el-table-column>
      <el-table-column label="邮箱"
                       prop="email"
                       align="center">
      </el-table-column>
      <el-table-column label="标题"
                       prop="title"
                       align="center">
      </el-table-column>
      <el-table-column label="ip"
                       prop="ip"
                       align="center">
      </el-table-column>
      <el-table-column label="留言时间"
                       prop="created_at"
                       width="140"
                       align="center">
        <template slot-scope="scope">{{ scope.row.created_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="200px">
        <template slot-scope="{row,$index}">
          <mBtn size="mini"
                type="danger"
                icon="el-icon-delete"
                label="删除"
                perms='destroy'
                btnType="btn"
                onclick="(function(e){e.stopPropagation()}(event))"
                @click="handleDel(row,$index)" />
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
import { messageList, messageDestroy } from '@/api/message'

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
      dialogStatus: '',
    }
  }
  ,
  created () {
    this.getList()
  },
  methods: {
    clickRowHandle (row, column, event) {
      const table = this.$refs.table;
      this.list.map(item => {
        if (row.id != item.id) {
          table.toggleRowExpansion(item, false)
        }
      })
      table.toggleRowExpansion(row)
    },
    /**
     * 获取列表 && 筛选
     */
    getList () {
      this.listLoading = true
      messageList(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total
          this.listLoading = false
        })
    },
    /**
     * 删除
     */
    handleDel (row, index) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        messageDestroy(row)
        this.$message.success('删除成功')
        this.list.splice(index, 1)
        --this.totals
      }).catch(() => {
        this.$message.success.info('已取消删除')
      });
    },
  }
}
</script>