<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-19 11:54:25
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-08 10:53:25
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
            style="margin-left: 10px;vertical-align: unset;"
            @click="handleCreate" />

      <el-button type="primary"
                 v-show="canTools"
                 @click="toggleSelection()"
                 icon="el-icon-s-tools"
                 style="vertical-align: middle">
        批量操作</el-button>

      <span v-show="!canTools">
        <mBtn type="warning"
              v-show="canMove"
              icon="el-icon-delete"
              label="移动"
              perms='move'
              btnType="btn"
              @click="toggleMove()" />

        <el-select v-model="selectTypeId"
                   v-show="!canMove"
                   class="filter-item"
                   placeholder="请选择要移动的分类"
                   clearable
                   @change="setMove"
                   style="margin-right: 10px;vertical-align: unset;">
          <el-option v-for="item in selectType"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id" />
        </el-select>

        <mBtn type="danger"
              icon="el-icon-delete"
              label="删除"
              perms='destroy'
              btnType="btn"
              @click="toolsDel()" />

        <el-button icon="el-icon-close"
                   @click="showTools">
          取消</el-button>
      </span>

      <el-select v-model="category_Id"
                 v-if="listQuery.product_id !==6"
                 class="filter-item"
                 placeholder="请选择过滤的分类"
                 clearable
                 @change="getList"
                 style="margin-left: 10px;vertical-align: unset;">
        <el-option v-for="item in select"
                   :key="item.id"
                   :label="item.title"
                   :value="item.id" />
      </el-select>

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
            <el-row>
              <el-col :span="12">
                <el-form-item label="内容">
                  <div v-html="props.row.content"></div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="图片">
                  <el-image :src="props.row.avatar_image"
                            lazy
                            fit="cover"
                            style="width: 500px;height: 350px;border-radius: 6px;"></el-image>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="id"
                       prop="id"
                       align="center">
      </el-table-column>
      <el-table-column label="分类"
                       prop="category_id"
                       align="center"
                       v-if="listQuery.product_id !==6">
        <template slot-scope="{row}">
          <template v-for="item in select">
            {{row.category_id == item.id?item.title:''}}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="标题"
                       prop="title"
                       width="400"
                       align="center">
      </el-table-column>
      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <mBtn :label="row.status"
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
        <template slot-scope="{row,$index}">
          <mBtn size="mini"
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

    <pagination v-show="totals>0"
                :total="totals"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />

    <vEdit ref="newForm"
           :visible.sync="showDialog"
           :temp="temp"
           :rules="rules"
           :select="select"
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
    // table 数据
    list: {
      type: Array,
      default: []
    },
    // 总页码
    total: {
      type: Number,
      default: 0
    },
    // 分页
    listQuery: {
      type: Object,
      default: {}
    },
    // 下拉切换
    selectType: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      showDialog: false, //弹窗
      temp: {}, //编辑页数据
      dialogStatus: '', //弹窗状态
      canTools: true, //判断批量操作是否显示
      canMove: true, //判断批量移动是否显示
      category_Id: '', //过滤
      selectTypeId: '', //移动
      totals: this.total, //总数量
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        title: [{ type: 'string', required: true, message: '请输入标题', trigger: 'blur' }],
        avatar_image: [{ required: true, message: '请上传图片', }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      }
    }
  },
  watch: {
    total (newValue, oldValue) {
      this.totals = newValue;
    }
  },
  methods: {
    /**
     * 批量操作
     */
    toggleSelection () {
      const selection = this.$refs.table.selection;
      if (selection.length == 0) return this.$message.warning('请勾选选择列表数据')
      this.canTools = false;
    },
    /**
     * 批量移动按钮
     */
    toggleMove () {
      this.canMove = false;
    },
    /**
     * 批量移动
     */
    setMove (params) {
      const selection = this.$refs.table.selection;
      const data = { ids: [] }
      selection.map(item => data.ids.push(item.id));
      this.selectType.find(item => {
        if (item.id === params) data.product_id = item.product_id; //父id
      })
      data.category_id = params; //类别id
      this.$emit('moveData', data, res => {
        this.$message.success('移动成功!')
        this.$router.go(0);
      })
    },
    /**
     * 批量取消
     */
    showTools () {
      this.canTools = !this.canTools;
      this.canMove = true;
      this.selectTypeId = ''
      this.$refs.table.clearSelection();
    },
    /**
     * 批量删除
     */
    toolsDel (data = []) {
      const selection = this.$refs.table.selection;

      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        selection.filter(selectionItem => {
          var index = this.list.indexOf(selectionItem)
          data.push(selectionItem.id)
          this.list.splice(index, 1)
          --this.totals
          this.canTools = !this.canTools;
        })
        this.$emit('destroyData', data, res => {
          this.$message.success('删除成功!')
        })
      }).catch(() => {
        this.$message.info('已取消删除!')
      });
    },
    clickRowHandle (row, column, event) {
      const table = this.$refs.table;
      this.list.map(item => {
        row.id != item.id && table.toggleRowExpansion(item, false)
      })
      table.toggleRowExpansion(row)
    },
    /**
     * 子页面执行 搜索
     */
    getList (params) {
      this.canTools = true;
      this.canMove = true;
      this.selectTypeId = ''
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
        category_id: '',
        title: '',
        content: '',
        avatar_image: '',
        status: true,
        sort: 0,
        product_id: this.listQuery.product_id
      }
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 子页面执行 删除
     */
    handleDel (row, index) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('destroyData', [row.id], res => {
          this.$message.success('删除成功')
          this.list.splice(index, 1)
          --this.totals
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    /**
     * 子页面执行 更新
     */
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
      this.$emit('updateItem', data, res => {
        this.$message.success('更新成功!')
      })
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      this.$emit('createData', Obj, res => {
        if (res.code == 0) {
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
     * 父页面执行 编辑
     */
    updateData (Obj, cab) {
      this.$emit('updateData', Obj, res => {
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
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/about/pid/1/cid/" + row.product_id, "blank");
    },
  }
}
</script>