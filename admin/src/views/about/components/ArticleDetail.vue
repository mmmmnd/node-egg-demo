<template>
  <div class="createPost-container">
    <el-form ref="postForm"
             :model="postForm"
             class="form-container">
      <sticky :z-index="10"
              :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading"
                   style="margin-left: 10px;"
                   type="success"
                   @click="submitForm">
          发布
        </el-button>
        <el-button type="warning"
                   @click="draftForm">
          取消
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <div class="postInfo-container">
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="90px"
                              label="网站标题:"
                              class="postInfo-container-item">
                  <el-input type="textarea"
                            :rows="8"
                            v-model="postForm.title"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label-width="90px"
                              label="网站关键词:"
                              class="postInfo-container-item">
                  <el-input type="textarea"
                            :rows="8"
                            v-model="postForm.keywords"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="12">
                <el-form-item label-width="90px"
                              label="网站描述:"
                              class="postInfo-container-item">
                  <el-input type="textarea"
                            :rows="8"
                            v-model="postForm.companyDescription"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label-width="90px"
                              label="状态:"
                              class="postInfo-container-item">
                  <el-switch v-model="postForm.status"
                             active-color="#13ce66"
                             inactive-color="#ff4949"
                             active-text="开启"
                             inactive-text="关闭">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-form-item prop="content"
                      style="margin-bottom: 30px;">
          <Tinymce ref="editor"
                   v-model="postForm.content"
                   :height="400" />
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { aboutSingleDetail, aboutSingleEdit } from '@/api/about'

const defaultForm = {
  title: '',
  keywords: '',
  companyDescription: '',
  content: '',
  status: undefined,
  sort: "",
  id: undefined,
  category_id: undefined,
  created_at: '',
  deleted_at: null,
  updated_at: undefined
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength () {
      return this.postForm.content_short.length
    },
    lang () {
      return this.$store.getters.language
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get () {
        return (+new Date(this.postForm.display_time))
      },
      set (val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created () {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData (id) {
      aboutSingleDetail(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle () {
      const title = this.lang === 'En' ? 'Edit Article' : ' 编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle () {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm () {
      this.loading = true
      aboutSingleEdit(this.postForm).then(() => {
        this.$notify({
          title: '成功',
          message: '发布文章成功',
          type: 'success',
          duration: 2000
        })
        this.loading = false
      })

    },
    draftForm () {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1);
    },
    getRemoteUserList (query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
<style >
.el-textarea .el-textarea__inner {
  width: 600px !important;
}
</style>
