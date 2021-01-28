<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-28 08:50:33
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-28 18:40:08
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form"
               :model="form"
               label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="网站标题:">
              <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="网站关键词:">
              <el-input type="textarea"
                        v-model="form.keywords"></el-input>
            </el-form-item>

            <el-form-item label="网站描述:">
              <el-input type="textarea"
                        rows="4"
                        v-model="form.description"></el-input>
            </el-form-item>

            <el-form-item label="列表内容:">
              <Tinymce ref="editor"
                       v-model="form.content"
                       :height="280" />
            </el-form-item>

            <el-form-item label="最后修改时间:">
              <span>{{ form.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </el-form-item>

            <el-form-item>
              <m-btn type="primary"
                     icon="el-icon-edit"
                     label="修改"
                     perms='edit'
                     btnType="btn"
                     class="filter-item"
                     style="margin-left: 10px;vertical-align: unset;"
                     @click="onSubmit" />
              <el-button type="info"
                         icon="el-icon-view"
                         style="margin-right:10px"
                         @click="getView(row)">
                预览
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片:"
                          style="width:440px">
              <vUpload :avatar_image.sync="form.image" />
            </el-form-item>

            <el-form-item label="排序:">
              <el-input-number v-model="form.sort"
                               controls-position="right"
                               :min="0"
                               ref="inputNumber"
                               size="small"></el-input-number>
            </el-form-item>

            <el-form-item label="状态:">
              <el-switch v-model="form.status"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         active-text="开启"
                         inactive-text="关闭">
              </el-switch>
            </el-form-item>

            <el-form-item label="轮播图片:">
              <VbatchUpload :advert.sync="form.advert"
                            @handleFileRemove="handleFileRemove" />
            </el-form-item>

            <el-upload class="upload-demo"
                       :headers="{token}"
                       :action="uploadUrl"
                       :on-success="uploadOnSuccess"
                       :on-progress="uploadOnProgress"
                       style="margin-left: 14%;">
              <el-button type="primary">上传轮播图</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import vUpload from '@/views/public/upload'
import VbatchUpload from '@/views/public/batchUpload'
export default {
  components: { Tinymce, vUpload, VbatchUpload },
  props: {
    form: {
      type: Object,
      default: {}
    },
    listQuery: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      progress: false, // 上传进度条
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload/create',
      token: this.$store.getters.token,
    }
  },
  methods: {
    /**
     * 编辑
     */
    onSubmit () {
      this.$emit('updateItem', this.form, res => this.$message.success(res.msg))
    },
    /**
     * 轮播上传
     */
    uploadOnProgress (e, file) {
      const REG = /\.(png|jpg|gif|jpeg|webp)$/;

      if (!REG.test(file.name)) {
        this.$message.warning('文件格式不支持！')
        return false;
      }

      this.progress = Math.floor(e.percent)
    },
    /**
     * 轮播成功
     */
    uploadOnSuccess (e, file) {
      this.pass = true;
      var Obj = { e, form: this.form }
      this.$emit('uploadOnSuccess', Obj, res => {
        if (res.code == 0) {
          this.$message.success('上传成功')
          this.form.advert.push({
            file_path: e.data.url,
            title: '新增图片'
          })
          console.log(this.form)
        }
      })
    },
    /**
    * 父页面执行 轮播图删除
    */
    handleFileRemove (Obj, cab) {
      this.$emit('handleFileRemove', Obj, res => cab(res))
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/services/pid/7/cid/" + this.listQuery.category_id, "blank");
    },
  }
}
</script>