<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-20 10:54:58
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 15:28:32
-->
<template>
  <div class="app-container">
    <div class="filter-container">
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
              border
              fit
              highlight-current-row
              style="width: 100%"
              row-key="id"
              default-expand-all
              :tree-props="{hasChildren: 'hasChildren'}">
      <el-table-column type="index"
                       align="center"
                       label="序号"
                       width="200">
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="标题">
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <mBtn :label="row.status"
                perms='update'
                btnType='switch'
                @click="statusSwitch(row)" />
        </template>
      </el-table-column>

      <el-table-column prop="sort"
                       align="center"
                       label="排序">
      </el-table-column>

      <el-table-column align="center"
                       label="操作">
        <template slot-scope="{row,$index}">
          <mBtn v-if="!row.children && !row.edit"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                label="编辑"
                perms='edit'
                btnType="btn"
                @click="handleUpdate(row)" />
          <mBtn v-if="!row.children && !row.edit"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                label="删除"
                perms='destroy'
                btnType="btn"
                @click="handleDel(row,$index)" />
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               width="600px">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="right"
               label-width="100px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="temp.title"
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
import { casesDroptypeIndex, casesDroptypeUpdate, casesDroptypeDestroy, casesDroptypeEdit, casesDroptypeAdd } from '@/api/cases'
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
      temp: {},
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '增加'
      },
      rules: {
        title: [{ type: 'string', required: true, message: '请输入分类标题', trigger: 'blur' }],
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
      const { data } = await casesDroptypeIndex(this.listQuery)
      this.list = data.data;
      this.total = data.meta.total;
      this.listLoading = false
    },
    /**
     * 切换状态
     */
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
      this.listLoading = true
      casesDroptypeUpdate(data)
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
      this.temp = {
        tittle: '',
        sort: 0,
        status: true
      }
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
    handleDel (row, index) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        casesDroptypeDestroy(row)
        this.$message.success('删除成功')
        this.list.splice(index, 1)
        --this.total
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    /**
     * 添加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          casesDroptypeAdd(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.list.push(this.temp)
            ++this.total
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
          const index = this.list.findIndex(v => v.id === tempData.id)
          casesDroptypeEdit(tempData).then(() => {
            this.list.splice(index, 1, tempData)
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }

}
</script>