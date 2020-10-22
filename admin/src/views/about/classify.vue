<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-22 17:30:23
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-plus"
                 @click="handleCreate">
        增加
      </el-button>
    </div>
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
                       label="标题">
        <template slot-scope="{row}">

          <el-tag v-if="row.treeNewTitle && row.children">{{ row.treeNewTitle }}</el-tag>
          <span v-else
                v-html="row.treeNewTitle"></span>

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
                     @click="handleUpdate()">
            编辑
          </el-button>
          <el-button v-if="!row.children && !row.edit"
                     type="danger"
                     size="small"
                     icon="el-icon-delete"
                     @click="handleDel(row)">
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

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="right"
               label-width="100px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="上级分类"
                      prop="dropId">
          <el-select v-model="temp.dropId"
                     class="filter-item"
                     placeholder="请选择上级分类">
            <el-option v-for="item in list"
                       :key="item.index"
                       :label="item.treeNewTitle"
                       :value="item.index" />
          </el-select>
        </el-form-item>

        <el-form-item label="标题"
                      prop="dropContent">
          <el-input v-model="temp.dropContent" />
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
import { aboutDroptypeList, aboutDroptypeUpdate, aboutDroptypeEdit, aboutDroptypeAdd, aboutDroptypeDestroy } from '@/api/about'
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
      temp: {
        dropId: '',
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
        dropId: [{ required: true, message: '请选择上级分类', trigger: 'blur' }],
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
    // confirmEdit (row) {
    //   row.edit = false;
    //   const [isCONTENT, isSORT] = [row.dropContent !== row.originalDropContent, row.sort !== row.originalSort];

    //   if (isCONTENT) {
    //     if (row.dropContent == '') {
    //       row.dropContent = row.originalDropContent;
    //       row.sort = row.originalSort;
    //       return this.alertView('不允许为空！', 'error');
    //     }
    //     var i = row.treeNewTitle.indexOf(row.originalDropContent),
    //       v = row.treeNewTitle.substring(i),
    //       item = row.treeNewTitle.replace(v, row.dropContent);
    //     row.treeNewTitle = item;
    //     row.originalDropContent = row.dropContent;
    //     this.alertView('已被编辑', 'success');
    //   } else if (isSORT) {
    //     row.originalSort = row.sort;
    //     this.alertView('已被编辑', 'success');
    //   } else return this.alertView('该选项没有进行任何修改', 'warning');
    //   /**
    //    * 修改http请求
    //    */
    //   aboutDroptypeEdit(row);
    // },
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
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
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
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
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
    resetTemp () {
      this.temp = {
        dropId: '',
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