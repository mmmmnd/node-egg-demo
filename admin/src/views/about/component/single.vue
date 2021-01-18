<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-18 18:37:39
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-18 19:44:25
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-form ref="form"
                   :model="form"
                   label-width="120px"
                   v-loading="listLoading">
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
                       :height="400" />
            </el-form-item>

            <el-form-item label="最后修改时间:">
              <span>{{ form.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </el-form-item>

            <el-form-item>
              <m-btn type="primary"
                     label="修改"
                     perms='edit'
                     btnType="btn"
                     class="filter-item"
                     style="margin-left: 10px;"
                     @click="onSubmit" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { aboutSingleList, aboutSingleEdit } from '@/api/about'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
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
      listLoading: false
    }
  },
  methods: {
    /**
     * 编辑
     */
    onSubmit () {
      this.$emit('updateItem', this.form, res => {
        return this.$message({
          message: res.msg,
          type: 'success'
        })

      })
    }
  }
}
</script>