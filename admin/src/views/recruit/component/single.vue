<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-18 18:37:39
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-05 17:07:04
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form"
               :rules="rules"
               :model="form"
               label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="网站标题:"
                          prop="site_title">
              <el-input v-model="form.site_title"></el-input>
            </el-form-item>

            <el-form-item label="网站关键词:"
                          prop="keywords">
              <el-input type="textarea"
                        v-model="form.keywords"></el-input>
            </el-form-item>

            <el-form-item label="网站描述:"
                          prop="description">
              <el-input type="textarea"
                        rows="4"
                        v-model="form.description"></el-input>
            </el-form-item>

            <el-form-item label="状态:"
                          prop="status">
              <el-switch v-model="form.status"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         active-text="开启"
                         inactive-text="关闭">
              </el-switch>
            </el-form-item>

            <el-form-item label="列表内容:"
                          prop="content">
              <Tinymce ref="editor"
                       v-model="form.content"
                       :height="400" />
            </el-form-item>

            <el-form-item label="最后修改时间:">
              <span>{{ form.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </el-form-item>

            <el-form-item>
              <mBtn type="primary"
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
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
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
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        site_title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        description: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      }
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
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/about/pid/1/cid/" + this.listQuery.product_id, "blank");
    },
  }
}
</script>