<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-12 16:24:27
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 16:29:36
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
    <el-table v-loading="listLoading"
              :data="list"
              style="width: 100%"
              ref="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   class="demo-table-expand">
            <el-form-item label="图片">
              <el-image :src="props.row.image"
                        lazy
                        fit="cover"
                        style="width: 500px;height: 350px;border-radius: 6px;"></el-image>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="index"
                       type="index"
                       align="center"
                       label="序号"
                       sortable
                       width="50px">
      </el-table-column>

      <el-table-column prop="image"
                       align="center"
                       label="图片">
        <template slot-scope="{row}">
          <el-avatar shape="square"
                     :size="30"
                     fit="cover"
                     :src="row.image"></el-avatar>
        </template>
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

      <el-table-column prop="updated_at"
                       align="center"
                       label="最后修改时间">
        <template slot-scope="{row}">
          <span>{{ row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="300px">
        <template slot-scope="{row,$index}">
          <mBtn size="mini"
                type="primary"
                icon="el-icon-edit"
                label="编辑"
                perms='edit'
                btnType="btn"
                @click="handleUpdate(row)" />
          <el-button type="info"
                     size="mini"
                     icon="el-icon-view"
                     style="margin-right:10px"
                     @click="getView(row)">
            预览
          </el-button>
          <mBtn size="mini"
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

        <el-form-item label="图片"
                      prop="image">
          <mUpload :avatar_image.sync="temp.image" />
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

import { casesIndex, casesUpdate, casesDestroy, casesEdit, casesAdd } from '@/api/cases'
import Pagination from '@/components/Pagination'
import mUpload from '@/views/public/upload'
export default {
  components: { Pagination, mUpload },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        category_id: 27,
        page: 1,
        limit: 20
      },
      category: [],
      showDialog: false,
      temp: {},
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '增加'
      },
      dialogFormVisible: false,
      rules: {
        image: [{ required: true, message: '请上传图片', }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        sort: [{ type: 'integer', required: true, message: '请选择排序', trigger: 'blur' }]
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
    async getList (id) {
      this.listLoading = true
      const { data } = await casesIndex(this.listQuery)
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
      casesUpdate(data)
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
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 增加
     */
    handleCreate () {
      this.temp = {
        image: '',
        product_id: 27,
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
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/cases/pid/25/cid/" + row.category_id, "blank");
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
        casesDestroy(row)
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
          casesAdd(this.temp).then(() => {
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
          casesEdit(tempData).then(() => {
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