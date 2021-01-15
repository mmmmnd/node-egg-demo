<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-12 20:59:26
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-15 15:43:44
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible"
             v-if="dialogFormVisible"
             width="400px">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             :inline="true"
             label-width="100px">
      <el-form-item label="所属分类:"
                    class="postInfo-container-item"
                    prop="pid">
        <el-select v-model="temp.pid"
                   placeholder="请选择"
                   v-if="temp.pid != 0"
                   style="width: 185px;">
          <el-option v-for="item in select"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题"
                    class="postInfo-container-item"
                    prop="title">
        <el-input v-model="temp.title"
                  placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="Url"
                    class="postInfo-container-item"
                    prop="url">
        <el-input v-model="temp.url"
                  placeholder="请输入url"></el-input>
      </el-form-item>

      <el-form-item label="排序"
                    align="center"
                    prop="sort">
        <el-input-number v-model="temp.sort"
                         controls-position="right"
                         :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="状态"
                    align="center"
                    prop="status">
        <el-switch v-model="temp.status"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
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
    select: {
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
      props: {
        value: 'id',
        label: 'title',
        checkStrictly: true
      },
      rules: {
        pid: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        url: [{ required: true, message: '请输入url地址', trigger: 'blur' }],
        sort: [{ type: 'integer', required: true, message: '请选择排序', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
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
     * 弹窗提示
     */
    alertView (message, type) {
      return this.$message({ message, type })
    }

  }
}
</script>