<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-27 19:40:09
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             label-width="100px">
      <el-row>

        <el-col :span="12">
          <el-form-item label="网站标题:"
                        class="postInfo-container-item"
                        prop="title">
            <el-input type="textarea"
                      :rows="8"
                      v-model="temp.title"></el-input>
          </el-form-item>
          <el-form-item label="网站描述:"
                        class="postInfo-container-item"
                        prop="description">
            <el-input type="textarea"
                      :rows="8"
                      v-model="temp.description"></el-input>
          </el-form-item>
          <el-form-item label="状态:"
                        class="postInfo-container-item"
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
          <el-form-item label="网站关键词:"
                        class="postInfo-container-item"
                        prop="keywords">
            <el-input type="textarea"
                      :rows="8"
                      v-model="temp.keywords"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload v-if="avatarProgress"
                       class="avatar-uploader"
                       :headers="{token}"
                       :action="uploadUrl"
                       :show-file-list="false"
                       :on-progress="setAvatarProgress"
                       :on-success="handleAvatarSuccess">
              <img v-if="temp.image"
                   :src="temp.image"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-progress v-else
                         type="circle"
                         :percentage="percentage"></el-progress>
          </el-form-item>

          <el-form-item label="上传轮播图"
                        class="postInfo-container-item">
            <el-upload accept="image/*"
                       ref="upload"
                       multiple
                       list-type="picture-card"
                       :show-file-list="false"
                       :headers="{token}"
                       :action="uploadUrl"
                       :on-success="uploadOnSuccess"
                       :on-progress="uploadOnProgress">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item label="轮播图列表"
                    class="img-list postInfo-container-item">
        <VbatchUpload :advert="temp.advert" />
      </el-form-item>

      <el-form-item prop="content"
                    label="列表内容">
        <Tinymce ref="editor"
                 v-model="temp.content"
                 :height="400" />
      </el-form-item>

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
import VbatchUpload from '@/views/public/batchUpload'
export default {
  components: { Tinymce, VbatchUpload },
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
    }
  },
  data () {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload/create',
      token: this.$store.getters.token,
      avatarProgress: true,
      percentage: 0,
      textMap: {
        update: '修改',
        create: '增加'
      },
      rules: {
        title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        description: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
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
     * 上传成功钩子
     */
    handleAvatarSuccess (res, file) {
      if (res.code == 0) {
        this.avatarProgress = true;
        this.percentage = 0;
        this.temp.image = res.data.url;
      }
    },
    /**
     * 上传时钩子
     */
    setAvatarProgress (event, file) {
      const REG = /\.(png|jpg|gif|jpeg|webp)$/;
      var i = parseInt(event.percent);

      if (!REG.test(file.name)) {
        this.alertView('文件格式不支持！', 'warning')
        return false;
      }

      this.avatarProgress = false;
      this.percentage = i
    },
    /**
     * 轮播上传
     */
    uploadOnProgress (e, file) {
      const REG = /\.(png|jpg|gif|jpeg|webp)$/;

      if (!REG.test(file.name)) {
        this.alertView('文件格式不支持！', 'warning')
        return false;
      }

      this.progress = Math.floor(e.percent)
    },
    /**
     * 轮播成功
     */
    uploadOnSuccess (e, file) {
      this.pass = true;
      var Obj = { e, temp: this.temp }
      this.$emit('uploadOnSuccess', Obj, res => {
        if (res.code == 0) {
          this.$message('上传成功', 'success')
          this.temp.advert.push({
            file_path: e.data.url,
            title: '新增图片'
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
          let tempData = Object.assign({}, this.temp)
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
     * 弹窗提示
     */
    alertView (message, type) {
      return this.$message({ message, type })
    }
  }
}
</script>
<style>
.el-upload.el-upload--picture-card {
  height: 0;
  width: 0;
  line-height: 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-avatar img {
  width: 100% !important;
}
.el-textarea .el-textarea__inner {
  width: 100% !important;
}
</style>