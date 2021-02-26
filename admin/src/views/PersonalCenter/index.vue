<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-23 16:20:36
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-26 17:04:30
-->
<template>
  <div class="app-container">
    <div v-if="userInfo">
      <el-row :gutter="20">

        <el-col :span="6"
                :xs="24">
          <userCard :userInfo="userInfo" />
        </el-col>
        <el-col :span="18"
                :xs="24">
          <el-card>
            <el-tabs :tab-position="tabPosition">
              <el-tab-pane label="资料设置">
                <userEdit :temp="userInfo"
                          @updateData="updateData" />
              </el-tab-pane>
              <el-tab-pane label="密码修改">
                <userPass @editData="editData" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { adminEdit } from '@/api/permissions'
import { adminEditPass } from '@/api/user'

import { mapGetters } from 'vuex'
import userCard from './components/userCard'
import userEdit from './components/userEdit'
import userPass from './components/userPass'

export default {
  namespaced: true,
  name: 'Profile',
  components: { userCard, userEdit, userPass },
  data () {
    return {
      tabPosition: 'top',
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', 'avatar', 'name'
    ])
  },
  methods: {
    updateData (Obj) {
      adminEdit(Obj).then(res => {
        if (res.code == 0) {
          this.$router.go(0);
        }
      })
    },
    editData (Obj) {
      adminEditPass(Obj).then(res => { });
    }
  },
}
</script>
