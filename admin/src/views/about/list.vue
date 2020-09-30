<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-30 15:50:59
-->
<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%"
              ref="tableDataRef">
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
                       width="180px">
        <template slot-scope="{row}">
          <span>{{ row.category }}</span>
          <el-tag size="mini"
                  v-if="row.classify">{{ row.classify }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="标题">
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
                       label="公司描述"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.companyDescription }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="aboutTitle"
                       align="center"
                       label="列表标题"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.aboutTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="avatarImage"
                       align="center"
                       label="图片"
                       width="150px">
        <template slot-scope="{row}">
          <el-avatar shape="square"
                     :size="100"
                     fit="cover"
                     :src="row.avatarImage"></el-avatar>
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

      <el-table-column prop="sort"
                       align="center"
                       label="排序"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="created_at"
                       align="center"
                       label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.created_at | formatTime('{y}-{m}-{d} {h}:{i}')  }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="companyDescription"
                       align="center"
                       label="最后修改时间">
        <template slot-scope="{row}">
          <span>{{ row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
import { aboutDroptypeList, aboutSingleUpdate } from '@/api/about'
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
        limit: 10
      },
      classify: [],
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
      aboutDroptypeList(this.listQuery)
        .then(response => {
          this.list = response.data.about.data
          this.total = response.data.about.meta.total
          this.category = response.data.aboutSingleMenu
          this.classify = response.data.aboutDroptype
          this.listLoading = false

          for (var i in this.list) {
            for (var j in this.classify) {
              if (this.list[i].category_id == this.classify[j].id) {
                for (var n in this.category) {
                  if (this.classify[j].dropId == this.category[n].id) {
                    this.list[i].classify = this.classify[j].dropContent;
                    this.list[i].category = this.category[n].title;
                  }
                }
              }
            }
          }
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