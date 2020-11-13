<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-13 16:40:21
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
          <el-form-item label="所属分类"
                        prop="category_id">
            <el-select v-model="temp.type"
                       class="filter-item"
                       placeholder="请选择所属分类"
                       style="width: 100%;">
              <el-option v-for="item in category"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="网站标题:"
                        class="postInfo-container-item"
                        prop="title">
            <el-input type="textarea"
                      v-model="temp.title"></el-input>
          </el-form-item>

          <el-form-item label="标题"
                        class="postInfo-container-item"
                        prop="cultureTitle">
            <el-input v-model="temp.cultureTitle"></el-input>
          </el-form-item>

          <el-form-item label="排序"
                        prop="sort">
            <el-input-number v-model="temp.sort"
                             controls-position="right"
                             :min="0"
                             ref="inputNumber"
                             size="small"></el-input-number>
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
          <el-form-item label="网站描述:"
                        class="postInfo-container-item"
                        prop="companyDescription">
            <el-input type="textarea"
                      v-model="temp.companyDescription"></el-input>
          </el-form-item>

          <el-form-item label="网站关键词:"
                        class="postInfo-container-item"
                        prop="keywords">
            <el-input type="textarea"
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
              <img v-if="temp.filepath"
                   :src="temp.filepath"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-progress v-else
                         type="circle"
                         :percentage="percentage"></el-progress>
          </el-form-item>

        </el-col>

      </el-row>

      <el-form-item prop="content"
                    label="列表内容">
        <Tinymce ref="editor"
                 v-model="temp.content"
                 :height="400" />
      </el-form-item>

    </el-form>

    <el-dialog title=""
               :visible.sync="isEnlargeImage"
               :modal-append-to-body="false"
               top="8%"
               width="60%"
               append-to-body>
      <img @click="isEnlargeImage = false"
           style="width:100%;"
           :src="enlargeImage">
    </el-dialog>

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
export default {
  components: { Tinymce },
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
    category: {
      type: Array,
      default: []
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
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        companyDescription: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      },
      progress: 0, //上传进度
      pass: null, //是否上传成功
      isEnlargeImage: false, //放大图片
      enlargeImage: '', //放大图片地址
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
        this.temp.filepath = res.data.url;
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
     * 增加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let tempData = Object.assign({}, this.temp)
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
     * 排序
     */
    handleChange (value, item) {
      const Obj = { id: item.id, key: 'sort', value }
      this.$emit('updateItem', Obj, res => { })
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
<style lang="scss" scoped>
.img-list {
  overflow: hidden;
  width: 100%;

  // 文件列表
  .img-li-box {
    overflow: hidden;
    position: relative;
    display: inline-block;
    width: 200px;
    padding: 5px;
    margin: 5px 20px 20px 0;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    transition: all 0.3s;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

    // 图片
    .img-li-b--url {
      display: block;
      width: 100%;
      height: 190px;
      margin: 0 auto;
      border-radius: 4px;
    }

    // 底部
    .img-li-b--bottom {
      margin-top: 10px;

      // 名称
      .img-li-b--name {
        width: 90%;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 25px;
        line-height: 25px;
      }
    }

    // 删除按钮
    .img-li-b--delete {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #8492a6;
      cursor: pointer;
      font-size: 1.1em;
    }

    // 放大遮罩层
    .img-li-b--layer {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 200px;
      color: #fff;
      text-align: center;
      z-index: 5;
      background-color: rgba(0, 0, 0, 0.4);

      // 放大按钮
      i {
        font-size: 1.6em;
        margin-top: 80px;
      }
    }

    .img-li-b--delete,
    .img-li-b--layer {
      opacity: 0;
      transition: all 0.3s;
    }

    // 悬浮可见删除 or 放大按钮
    &:hover {
      .img-li-b--delete,
      .img-li-b--layer {
        opacity: 1;
      }
    }

    // 上传进度
    &.img-li-b--progress {
      text-align: center;
      padding-top: 50px;
    }
  }
  // 上传按钮
  .img-li-b--upload {
    float: left;
    width: 200px;
    height: 270px;
    display: table;
    text-align: center;

    .img-li-b--upl--field {
      width: 100%;
      display: table-cell;
      vertical-align: middle;
    }
  }
}
</style>