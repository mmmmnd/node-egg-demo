<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-16 17:20:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 17:35:32
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form label-position="left"
               style="display: inline-block;">
        <el-form-item label="选择分类"
                      style="width: 300px;">
          <el-select v-model="temp.categoryId"
                     class="filter-item"
                     placeholder="请选择所属分类"
                     clearable
                     @change="getList">
            <el-option v-for="item in category"
                       :key="item.id"
                       :label="item.dropContent"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <mBtn type="primary"
            label="增加"
            perms='add'
            btnType="btn"
            icon="el-icon-plus"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate" />
    </div>

    <el-table :data="list"
              style="width: 100%"
              @row-click="clickRowHandle"
              ref="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="内容">
              <div v-html="props.row.content"></div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="公司"
                       prop="dropContent"
                       width="230"
                       align="center">
      </el-table-column>
      <el-table-column label="职位"
                       prop="position"
                       width="230"
                       align="center">
      </el-table-column>
      <el-table-column label="地址"
                       prop="address"
                       width="100"
                       align="center">
      </el-table-column>
      <el-table-column label="人数"
                       prop="people"
                       align="center">
      </el-table-column>
      <el-table-column label="学历"
                       prop="education"
                       align="center">
      </el-table-column>
      <el-table-column label="性别"
                       prop="sex"
                       align="center">
      </el-table-column>
      <el-table-column label="排序"
                       prop="sort"
                       align="center">
      </el-table-column>
      <el-table-column label="状态"
                       prop="status"
                       align="center">
        <template slot-scope="{row}">
          <mBtn :label="row.status"
                perms='update'
                btnType='switch'
                @click="statusSwitch(row)"
                onclick="(function(e){e.stopPropagation()}(event))" />
        </template>
      </el-table-column>
      <el-table-column label="发布时间"
                       prop="created_at"
                       width="140"
                       align="center">
        <template slot-scope="scope">{{ scope.row.created_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column label="修改时间"
                       prop="updated_at"
                       width="140"
                       align="center">
        <template slot-scope="scope">{{ scope.row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="200px">
        <template slot-scope="{row,$index}">
          <mBtn size="mini"
                type="primary"
                icon="el-icon-edit"
                label="编辑"
                perms='edit'
                btnType="btn"
                onclick="(function(e){e.stopPropagation()}(event))"
                @click="handleUpdate(row)" />
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

    <vEdit ref="newForm"
           :visible.sync="showDialog"
           :temp="temp"
           :dialogStatus="dialogStatus"
           :category="category"
           @updateItem="updateItem"
           @updateData="updateData"
           @createData="createData" />

  </div>

</template>

<script>
import { recruitDroptypeIndex, recruitIndex, recruitUpdate, recruitDestroy, recruitAdd, recruitEdit } from '@/api/recruit'
import { advertDetail, advertAdd, advertDestroy, advertUpdate } from '@/api/advert'

import Pagination from '@/components/Pagination'
import vEdit from './component/edit'
export default {
  components: { Pagination, vEdit },
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
    getList (id) {
      this.listLoading = true
      this.listQuery.id = typeof id === 'number' ? id : this.temp.id;
      recruitIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;

          this.total = response.data.meta.total
          this.listLoading = false
          return recruitDroptypeIndex()
        })
        .then(response => {
          this.category = response.data.data;
          this.list = this.list.filter(listItem =>
            this.category.filter(dataItem => { if (listItem.category_id === dataItem.id) listItem.dropContent = dataItem.dropContent })
          )
        })

    },
    /**
     * 切换状态
     */
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
      this.listLoading = true
      recruitUpdate(data)
        .then(response => {
          this.listLoading = false
          this.$notify({
            site_title: '成功',
            message: response.msg,
            type: 'success'
          });
        })
    },
    /**
     * 编辑
     */
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.showDialog = true;
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 增加
     */
    handleCreate () {
      this.temp = {};
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
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
        recruitDestroy(row)
        this.$message.success('删除成功')
        this.list.splice(index, 1)
        --this.totals
      }).catch(() => {
        this.$message.success.info('已取消删除')
      });
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      recruitEdit(Obj).then(res => {
        if (res.code == 0) {
          const index = this.list.findIndex(v => v.id === Obj.id)
          this.list.splice(index, 1, Obj)
          this.showDialog = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      recruitAdd(Obj).then(res => {
        if (res.code == 0) {
          this.showDialog = false
          this.list.push(Obj)
          ++this.totals
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    /**
     * 父页面执行 修改
     */
    updateItem (Obj, cab) {
      advertUpdate(Obj).then(res => cab(res))
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-form-item__content div p {
  width: max-content;
}
.el-table__row:hover {
  cursor: pointer;
}
</style>