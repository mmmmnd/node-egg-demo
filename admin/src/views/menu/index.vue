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
                       label="ID"
                       width="100px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="index"
                       type="index"
                       align="center"
                       label="Pid"
                       width="80px"
                       sortable>
        <template slot-scope="{row}">
          <span>{{ row.pid }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="nameTitle"
                       align="left"
                       label="分类标题">
        <template slot-scope="{row}">
          <el-tag v-if="row.children">{{ row.title }}</el-tag>
          <span v-else
                v-html="row.nameTitle"></span>
        </template>
      </el-table-column>

      <el-table-column prop="url"
                       align="center"
                       label="Url">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <m-btn :label="row.status"
                 perms='update'
                 btnType='switch'
                 @click="statusSwitch(row)"
                 v-if="row.pid !=0" />
        </template>
      </el-table-column>

      <el-table-column prop="sort"
                       align="center"
                       label="前台显示排序"
                       sortable>
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="300px"
                       fixed="right">
        <template slot-scope="{row}">
          <m-btn size="mini"
                 type="primary"
                 icon="el-icon-edit"
                 label="编辑"
                 perms='edit'
                 btnType="btn"
                 @click="handleUpdate(row)" />
        </template>
      </el-table-column>

    </el-table>

    <edit ref="newForm"
          :visible.sync="showDialog"
          :temp="temp"
          :dialogStatus="dialogStatus"
          :select="select"
          @updateData="updateData"
          @createData="createData" />

  </div>
</template>

<script>
import { menuList, menuUpdate, menuEdit, menuAdd } from '@/api/menu'
import edit from './component/edit'
export default {
  components: { edit },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      showDialog: false,
      temp: {},
      dialogStatus: '',
      select: [], //下拉
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
      const { data } = await menuList(this.listQuery);
      this.list = data;
      this.select = data;
      this.listLoading = false
    },
    /**
     * 切换状态
     */
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
      this.listLoading = true
      menuUpdate(data)
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
      this.temp = {
        title: '',
        url: '',
        sort: 0,
        status: true
      }
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      menuEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      menuAdd(Obj).then(res => cab(res))
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
  padding-right: 5px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
