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
                       label="ID"
                       width="80px">
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
          <template v-if="row.edit">
            <el-input v-if="row.originalEdit"
                      v-model="row.title"
                      class="edit-input"
                      size="small" />

            <el-input v-else
                      v-model="row.title"
                      class="edit-input"
                      size="small" />
          </template>

          <template v-else>
            <span v-if="row.originalEdit"
                  v-html="row.nameTitle"></span>
            <el-tag v-else>{{ row.title }}</el-tag>
          </template>

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
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="statusSwitch(row.status,row.id)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="sort"
                       align="center"
                       label="前台显示排序"
                       sortable>

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
          <el-button v-else
                     type="primary"
                     size="small"
                     icon="el-icon-edit"
                     @click="row.edit=!row.edit">
            编辑
          </el-button>

        </template>

      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { menuList, menuUpdate, menuEdit } from '@/api/menu'
export default {
  data () {
    return {
      list: null,
      listLoading: true,
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
      this.list = data.map(v => {

        if (v.children) {
          v.children.map(item => {
            this.$set(item, 'edit', false)
            item.originalSort = item.sort;
            item.originalNameTitle = item.nameTitle;
            item.originalTitle = item.title;
            item.originalEdit = item.title;
            return item
          })
        }

        this.$set(v, 'edit', false)
        v.originalSort = v.sort
        v.originalTitle = v.title
        return v
      })
      this.listLoading = false
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      this.listLoading = true
      const data = { id, key: 'status', value: getSwitch };
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
     * 修改
     */
    confirmEdit (row) {
      row.edit = false;
      const [isTITLE, isSORT, isEDIT] = [row.title !== row.originalTitle, row.originalSort !== row.sort, row.originalEdit];
      /**
       * 带树状title
       */
      if (isTITLE && isEDIT) {
        if (row.title == '') {
          row.title = row.originalTitle;
          row.nameTitle = row.originalNameTitle
          row.sort = row.originalSort;
          return this.alertView('不允许为空！', 'error');
        }
        var i = row.nameTitle.indexOf(row.originalTitle),
          v = row.nameTitle.substring(i),
          item = row.nameTitle.replace(v, row.title);
        row.originalNameTitle = row.nameTitle = item;
        row.originalTitle = row.title;
        this.alertView('已被编辑', 'success');
        /**
         * 不带树状title
         */
      } else if (isTITLE) {
        if (row.title == '') {
          row.title = row.originalTitle;
          row.sort = row.originalSort;
          return this.alertView('不允许为空！', 'error');
        }
        row.originalTitle = row.title;
        this.alertView('已被编辑', 'success');
      } else if (isSORT) {
        row.originalTitle = row.title;
        row.originalNameTitle = row.nameTitle;
        row.originalSort = row.sort;
        this.alertView('已被编辑', 'success');
      } else return this.alertView('该选项没有进行任何修改', 'warning');
      /**
       * 修改http请求
       */
      menuEdit(row);
    },
    /**
     * 取消
     */
    cancelEdit (row) {
      row.edit = false
      row.title = row.originalTitle;
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
  padding-right: 5px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
