<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-21 17:08:24
-->
<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%"
              row-key="id"
              default-expand-all
              :tree-props="{children: 'children'}">
      <el-table-column prop="id"
                       align="center"
                       label="序号"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="nameTitle"
                       align="left"
                       label="分类标题">
        <template slot-scope="{row}">

          <template v-if="row.edit">
            <el-input v-model="row.dropContent"
                      class="edit-input"
                      size="small" />
          </template>
          <template v-else>
            <el-tag v-if="row.treeNewTitle && row.children">{{ row.treeNewTitle }}</el-tag>
            <span v-else
                  v-html="row.treeNewTitle"></span>
          </template>

        </template>
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     v-if="row.dropId"
                     @change="statusSwitch(row.status,row.id)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="sort"
                       align="center"
                       label="排序"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input-number v-model="row.sort"
                             controls-position="right"
                             :min="0"
                             ref="inputNumber"
                             size="small"></el-input-number>
          </template>
          <span v-else>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="200px">
        <template slot-scope="{row}">

          <el-button v-if="!row.children && !row.edit"
                     type="primary"
                     size="small"
                     icon="el-icon-edit"
                     @click="row.edit=!row.edit">
            编辑
          </el-button>

          <el-button v-if="row.edit"
                     type="success"
                     size="small"
                     icon="el-icon-check"
                     @click="confirmEdit(row)">
            修改
          </el-button>
          <el-button v-if="row.edit"
                     type="warning"
                     size="small"
                     icon="el-icon-close"
                     @click="cancelEdit(row)">
            取消
          </el-button>

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
import { aboutDroptypeList, aboutDroptypeUpdate, aboutDroptypeEdit } from '@/api/about'
import Pagination from '@/components/Pagination'
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
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    async getList () {
      this.listLoading = true
      const { data } = await aboutDroptypeList(this.listQuery)
      this.list = data.data.map(v => {

        if (v.children) {
          v.children.map(item => {
            this.$set(item, 'edit', false)
            item.originalDropContent = item.dropContent;
            item.originalSort = item.sort;
            return item
          })
        }

        this.$set(v, 'edit', false)
        return v
      })
      this.listLoading = false
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      aboutDroptypeUpdate(data)
        .then(response => {
          this.listLoading = false
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success'
          });
        })
    },
    /**
     * 修改
     */
    confirmEdit (row) {
      row.edit = false;
      const [isCONTENT, isSORT] = [row.dropContent !== row.originalDropContent, row.sort !== row.originalSort];

      if (isCONTENT) {
        if (row.dropContent == '') {
          row.dropContent = row.originalDropContent;
          row.sort = row.originalSort;
          return this.alertView('不允许为空！', 'error');
        }
        var i = row.treeNewTitle.indexOf(row.originalDropContent),
          v = row.treeNewTitle.substring(i),
          item = row.treeNewTitle.replace(v, row.dropContent);
        row.treeNewTitle = item;
        row.originalDropContent = row.dropContent;
        this.alertView('已被编辑', 'success');
      } else if (isSORT) {
        row.originalSort = row.sort;
        this.alertView('已被编辑', 'success');
      } else return this.alertView('该选项没有进行任何修改', 'warning');
      /**
       * 修改http请求
       */
      aboutDroptypeEdit(row);
    },
    /**
     * 取消
     */
    cancelEdit (row) {
      row.edit = false
      row.dropContent = row.originalDropContent;
      row.sort = row.originalSort
      return this.alertView('已恢复为原始值', 'warning')
    },
    /**
     * 弹窗提示
     */
    alertView (message, type) {
      return this.$message({ message, type })
    }
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