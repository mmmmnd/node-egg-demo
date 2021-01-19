<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-19 20:28:24
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible"
             v-if="dialogFormVisible"
             width="800px">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             label-width="100px">

      <el-form-item label="标题"
                    prop="title"
                    style="width:400px">
        <el-input v-model="temp.title"
                  placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="图片">
        <vUpload :avatar_image.sync="temp.avatar_image" />
      </el-form-item>
      <el-form-item label="排序"
                    prop="sort">
        <el-input-number v-model="temp.sort"
                         controls-position="right"
                         :min="0"
                         ref="inputNumber"
                         size="small"></el-input-number>
      </el-form-item>
      <el-form-item label="状态"
                    prop="status">
        <el-switch v-model="temp.status"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
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
import vUpload from '@/views/public/upload'
export default {
  components: { Tinymce, vUpload },
  props: {
    // 弹窗
    visible: {
      type: Boolean,
      default: false
    },
    // 列表
    temp: {
      type: Object,
      default: {}
    },
    // 状态
    dialogStatus: {
      type: String,
      default: 'update'
    }
  },
  data () {
    return {
      textMap: {
        update: '修改',
        create: '增加'
      },
      avatar_image: '', //图片
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        companyDescription: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
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
          console.log(tempData)
          return false
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
     * 弹窗提示
     */
    alertView (message, type) {
      return this.$message({ message, type })
    }

  }
}
</script>
<style>
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