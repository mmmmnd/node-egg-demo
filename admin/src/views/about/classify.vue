<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-19 11:41:10
-->
<template>
  <div class="app-container">
    <div class="filter-container">
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
              border
              fit
              highlight-current-row
              style="width: 100%"
              row-key="id"
              default-expand-all
              :tree-props="{hasChildren: 'hasChildren'}">
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
                       label="标题">
        <template slot-scope="{row}">

          <el-tag v-if="row.title && row.children">{{ row.title }}</el-tag>
          <span v-else
                v-html="row.nameTitle"></span>

        </template>
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <m-btn v-if="row.product_id"
                 :label="row.status"
                 perms='update'
                 btnType='switch'
                 @click="statusSwitch(row)" />
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

          <m-btn v-if="!row.children && !row.edit"
                 size="mini"
                 type="primary"
                 icon="el-icon-edit"
                 label="编辑"
                 perms='edit'
                 btnType="btn"
                 @click="handleUpdate(row)" />
          <m-btn v-if="!row.children && !row.edit"
                 size="mini"
                 type="danger"
                 icon="el-icon-delete"
                 label="删除"
                 perms='destroy'
                 btnType="btn"
                 @click="handleDel(row)" />
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="right"
               label-width="100px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="上级分类"
                      prop="product_id">
          <el-select v-model="temp.product_id"
                     class="filter-item"
                     placeholder="请选择上级分类">
            <el-option v-for="item in list"
                       :key="item.index"
                       :label="item.title"
                       :value="item.index" />
          </el-select>
        </el-form-item>

        <el-form-item label="标题"
                      prop="dropContent">
          <el-input v-model="temp.dropContent"
                    placeholder="请输入标题名" />
        </el-form-item>

        <el-form-item label="状态"
                      prop="status">
          <el-switch v-model="temp.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-form-item>

        <el-form-item label="排序"
                      prop="sort">
          <el-input-number v-model="temp.sort"
                           controls-position="right"
                           :min="0"
                           ref="inputNumber"
                           size="small"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">

        <el-button @click="dialogFormVisible = false">取消 </el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">确定 </el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
import { aboutDroptypeIndex, aboutDroptypeUpdate, aboutDroptypeEdit, aboutDroptypeAdd, aboutDroptypeDestroy } from '@/api/about'
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
        limit: 10
      },
      temp: {
        product_id: '',
        dropContent: '',
        sort: 0,
        status: true
      },
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '增加'
      },
      rules: {
        product_id: [{ required: true, message: '请选择上级分类', trigger: 'blur' }],
        dropContent: [{ type: 'string', required: true, message: '请输入分类标题', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        sort: [{ type: 'integer', required: true, message: '请选择排序', trigger: 'blur' }]
      },
      dialogFormVisible: false,
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
      const { data } = await aboutDroptypeIndex(this.listQuery)
      this.list = data.map(v => {

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
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
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
     * 增加
     */
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 修改
     */
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
        aboutDroptypeDestroy(row)
        this.alertView('删除成功!', 'success')
        this.$router.go(0);
      }).catch(() => {
        this.alertView('已取消删除', 'info')
      });
    },
    /**
     * 添加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          aboutDroptypeAdd(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$router.go(0);
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    /**
     * 修改模块
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          aboutDroptypeEdit(tempData).then(() => {
            this.dialogFormVisible = false;
            this.$router.go(0);
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    /**
     * 重置添加表单
     */
    resetTemp () {
      this.temp = {
        product_id: '',
        dropContent: '',
        sort: 0,
        status: true
      }
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