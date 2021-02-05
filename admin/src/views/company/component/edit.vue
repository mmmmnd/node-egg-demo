<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-05 16:58:48
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible"
             top="0vh">
    <el-form ref="dataForm"
             :rules="rules"
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
          <el-form-item label="网站标题:"
                        prop="site_title">
            <el-input v-model="temp.site_title"></el-input>
          </el-form-item>

          <el-form-item label="网站关键词:"
                        prop="keywords">
            <el-input type="textarea"
                      v-model="temp.keywords"></el-input>
          </el-form-item>

          <el-form-item label="网站描述:"
                        prop="description">
            <el-input type="textarea"
                      v-model="temp.description"></el-input>
          </el-form-item>

          <el-form-item label="公司标题:"
                        prop="title">
            <el-input v-model="temp.title"></el-input>
          </el-form-item>

          <el-form-item label="公司地址:"
                        prop="address">
            <el-input v-model="temp.address"></el-input>
          </el-form-item>

          <el-form-item label="公司网址:"
                        prop="website">
            <el-input v-model="temp.website"></el-input>
          </el-form-item>

          <el-form-item label="联系电话:"
                        prop="phone">
            <el-input v-model="temp.phone"></el-input>
          </el-form-item>

          <el-form-item label="电子邮箱:"
                        prop="email">
            <el-input v-model="temp.email"></el-input>
          </el-form-item>

          <el-form-item label="排序:"
                        prop="sort">
            <el-input-number v-model="temp.sort"
                             controls-position="right"
                             :min="0"
                             ref="inputNumber"
                             size="small"></el-input-number>
          </el-form-item>

          <el-form-item label="状态:"
                        prop="status">
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
                        style="width:440px"
                        prop="image">
            <mUpload :avatar_image.sync="temp.image" />
          </el-form-item>

          <el-form-item label="轮播图片:"
                        prop="advert">
            <mBatchUpload :advert="temp.advert"
                          @updateItem="updateItem"
                          @uploadOnSuccess="uploadOnSuccess"
                          @handleFileRemove="handleFileRemove" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="列表内容:"
                        prop="content">
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
  },
  data () {
    return {
      textMap: {
        update: '修改',
        create: '增加'
      },
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        site_title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        description: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        title: [{ type: 'string', required: true, message: '请输入公司标题', trigger: 'blur' }],
        address: [{ type: 'string', required: true, message: '请输入公司地址', trigger: 'blur' }],
        website: [{ type: 'string', required: true, message: '请输入公司网址', trigger: 'blur' }],
        phone: [{ type: 'string', required: true, message: '请输入联系电话', trigger: 'blur' }],
        email: [{ type: 'string', required: true, message: '请输入电子邮箱', trigger: 'blur' }],
        sort: [{ type: 'integer', required: true, message: '请选择排序', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      }
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
          this.$emit('updateData', tempData)
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
          this.$emit('createData', tempData)
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