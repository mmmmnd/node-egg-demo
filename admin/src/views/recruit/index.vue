<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-16 17:20:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 09:06:37
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
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-plus"
                 @click="handleCreate">
        增加
      </el-button>
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
            <el-form-item label="网站标题">
              <div v-html="props.row.title"></div>
            </el-form-item>
            <el-form-item label="网站描述">
              <div v-html="props.row.companyDescription"></div>
            </el-form-item>
            <el-form-item label="内容">
              <div v-html="props.row.content"></div>
            </el-form-item>
            <el-form-item label="网站描述">
              <div v-html="props.row.keywords"></div>
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
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="statusSwitch(row.status,row.id)"
                     onclick="(function(e){e.stopPropagation()}(event))">
          </el-switch>
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
                       width="190px">
        <template slot-scope="{row}">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit"
                     @click.stop.prevent="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="danger"
                     size="small"
                     icon="el-icon-delete"
                     @click.stop.prevent="handleDel(row)">
            删除
          </el-button>
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
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      recruitUpdate(data)
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
    handleDel (row) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recruitDestroy(row)
        this.alertView('删除成功!', 'success')
        this.$router.go(0);
      }).catch(() => {
        this.alertView('已取消删除', 'info')
      });
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      console.log(Obj);
      recruitEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      recruitAdd(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 修改
     */
    updateItem (Obj, cab) {
      advertUpdate(Obj).then(res => cab(res))
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