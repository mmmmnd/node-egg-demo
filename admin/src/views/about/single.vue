<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-29 10:48:00
-->
<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column prop="index"
                       type="index"
                       align="center"
                       label="序号"
                       width="80px"
                       sortable>
      </el-table-column>
      <el-table-column prop="id"
                       align="center"
                       label="分类"
                       width="120px">
        <template slot-scope="{row}">
          <span>{{ category[row.id-1].title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="网站标题">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="keywords"
                       align="center"
                       label="关键词">
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="companyDescription"
                       align="center"
                       label="描述">
        <template slot-scope="{row}">
          <span class="text-hidden">{{ row.companyDescription }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="statusSwitch(row.status,row.id)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="120">
        <template slot-scope="{row}">
          <router-link :to="'/about/edit/'+row.category_id">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
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
import { aboutSingleList, aboutSingleUpdate } from '@/api/about'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination },
  data () {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      category: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    getList () {
      this.listLoading = true
      aboutSingleList(this.listQuery)
        .then(response => {
          this.list = response.data.aboutSingle.data
          this.total = response.data.aboutSingle.meta.total
          this.category = response.data.aboutSingleMenu
          this.listLoading = false
        })
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      aboutSingleUpdate(data)
        .then(response => {
          this.listLoading = false
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success'
          });
        })
    },
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.text-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>