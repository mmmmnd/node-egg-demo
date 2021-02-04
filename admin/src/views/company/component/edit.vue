<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-04 15:43:51
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible"
             top="0vh">
    <el-form ref="dataForm"
             :model="temp"
             label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属分类"
                        prop="category_id">
            <el-select v-model="temp.category_id"
                       class="filter-item"
                       placeholder="请选择所属分类"
                       clearable
                       style="width: 335px;">
              <el-option v-for="item in select"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="网站标题:">
            <el-input v-model="temp.site_title"></el-input>
          </el-form-item>

          <el-form-item label="网站关键词:">
            <el-input type="textarea"
                      v-model="temp.keywords"></el-input>
          </el-form-item>

          <el-form-item label="网站描述:">
            <el-input type="textarea"
                      v-model="temp.description"></el-input>
          </el-form-item>

          <el-form-item label="公司标题:">
            <el-input v-model="temp.title"></el-input>
          </el-form-item>

          <el-form-item label="公司地址:">
            <el-input v-model="temp.address"></el-input>
          </el-form-item>

          <el-form-item label="公司网址:">
            <el-input v-model="temp.website"></el-input>
          </el-form-item>

          <el-form-item label="联系电话:">
            <el-input v-model="temp.phone"></el-input>
          </el-form-item>

          <el-form-item label="电子邮箱:">
            <el-input v-model="temp.email"></el-input>
          </el-form-item>

          <el-form-item label="排序:">
            <el-input-number v-model="temp.sort"
                             controls-position="right"
                             :min="0"
                             ref="inputNumber"
                             size="small"></el-input-number>
          </el-form-item>

          <el-form-item label="状态:">
            <el-switch v-model="temp.status"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="开启"
                       inactive-text="关闭">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图片:"
                        style="width:440px">
            <mUpload :avatar_image.sync="temp.image" />
          </el-form-item>

          <el-form-item label="轮播图片:">
            <mBatchUpload :advert="temp.advert"
                          @updateItem="updateItem"
                          @uploadOnSuccess="uploadOnSuccess"
                          @handleFileRemove="handleFileRemove" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="列表内容:">
            <Tinymce ref="editor"
                     v-model="temp.content"
                     :height="280" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary"
                 @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import mUpload from '@/views/public/upload'
import mBatchUpload from '@/views/public/batchUpload'
export default {
  components: { Tinymce, mUpload, mBatchUpload },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    temp: {
      type: Object,
      default: {}
    },
    dialogStatus: {
      type: String,
      default: 'update'
    },
    select: {
      type: Array,
      default: []
    },
    rules: {
      type: Object,
      default: {}
    },
  },
  data () {
    return {
      textMap: {
        update: '修改',
        create: '增加'
      },

    }
  },
  computed: {
    dialogFormVisible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    /**
     * 修改模块
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          this.$emit('updateData', tempData, res => {
            if (res.code == 0) {
              this.$router.go(0);
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    /**
     * 增加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.$emit('createData', tempData, res => {
            if (res.code == 0) {
              this.$router.go(0);
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    /**
     * 父页面执行 上传轮播图
     */
    uploadOnSuccess (Obj, cab) {
      Obj.temp = this.temp;
      this.$emit('uploadOnSuccess', Obj, res => cab(res))
    },
    /**
     * 父页面执行 轮播图删除
     */
    handleFileRemove (Obj, cab) {
      this.$emit('handleFileRemove', Obj, res => cab(res))
    },
    /**
     * 父页面执行 轮播修改
     */
    updateItem (Obj, cab) {
      this.$emit('updateItem', Obj, res => cab(res))
    },
  }
}
</script>
<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
</style>