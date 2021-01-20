<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-19 11:54:25
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-20 17:46:06
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
            <el-option v-for="item in select"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <m-btn type="primary"
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
      <el-table-column label="id"
                       prop="id"
                       align="center">
      </el-table-column>
      <el-table-column label="分类"
                       prop="category_id"
                       align="center">
        <template slot-scope="{row}">
          <template v-for="item in select">
            {{row.category_id == item.id?item.title:''}}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="标题"
                       prop="title"
                       align="center">
      </el-table-column>
      <el-table-column prop="avatar_image"
                       align="center"
                       label="图片">
        <template slot-scope="{row}">
          <el-avatar shape="square"
                     :size="50"
                     fit="cover"
                     v-if="row.avatar_image"
                     :src="row.avatar_image"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <m-btn :label="row.status"
                 perms='update'
                 btnType='switch'
                 onclick="(function(e){e.stopPropagation()}(event))"
                 @click="statusSwitch(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="sort"
                       align="center"
                       label="排序">
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
                       width="280">
        <template slot-scope="{row}">
          <m-btn size="mini"
                 type="primary"
                 icon="el-icon-edit"
                 label="编辑"
                 perms='edit'
                 btnType="btn"
                 onclick="(function(e){e.stopPropagation()}(event))"
                 @click="handleUpdate(row)" />
          <el-button type="info"
                     size="mini"
                     icon="el-icon-view"
                     style="margin-right:10px"
                     onclick="(function(e){e.stopPropagation()}(event))"
                     @click="getView(row)">
            预览
          </el-button>
          <m-btn size="mini"
                 type="danger"
                 icon="el-icon-delete"
                 label="删除"
                 perms='destroy'
                 btnType="btn"
                 onclick="(function(e){e.stopPropagation()}(event))"
                 @click="handleDel(row)" />
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
           @updateData="updateData"
           @createData="createData" />

  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
import vEdit from './edit'
export default {
  components: { Pagination, vEdit },
  props: {
    // 下拉
    select: {
      type: Array,
      default: []
    },
    list: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    },
    listQuery: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      showDialog: false,
      temp: {},
      dialogStatus: '',
    }
  },
  methods: {
    clickRowHandle (row, column, event) {
      const table = this.$refs.table;
      this.list.map(item => {
        row.id != item.id && table.toggleRowExpansion(item, false)
      })
      table.toggleRowExpansion(row)
    },
    getList (params) {
      this.$emit('getList', params)
    },
    /**
     * 编辑
     */
    handleUpdate (row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.showDialog = true;
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 增加
     */
    handleCreate () {
      this.temp = {
        title: '',
        content: '',
        avatar_image: '',
        status: true,
        sort: 0
      }
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 子页面执行 删除
     */
    handleDel (row) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('destroyData', row, res => {
          this.alertView('删除成功!', 'success')
          this.$router.go(0);
        })
      }).catch(() => {
        this.alertView('已取消删除', 'info')
      });
    },
    /**
     * 子页面执行 更新
     */
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
      this.$emit('updateItem', data, res => {
        this.alertView('更新成功!', 'success')
      })
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      this.$emit('createData', Obj, res => cab(res))
    },
    /**
     * 父页面执行 编辑
     */
    updateData (Obj, cab) {
      this.$emit('updateData', Obj, res => cab(res))
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/about/pid/1/cid/" + row.product_id, "blank");
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