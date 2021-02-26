<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header"
         class="clearfix">
      <span>个人信息</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <el-image style="width: 100px; height: 100px;border-radius: 50%;"
                  :src="avatar"
                  fit="cover"></el-image>
      </div>
      <div class="box-center">
        <div class="user-name">姓名：{{ name }}</div>
        <div class="user-role text-muted">角色：{{ role }}</div>
      </div>
    </div>

    <div class="user-bio">
      <el-row :gutter="20">
        <el-col :span="12"
                :xs="24">
          <div class="user-education user-bio-section">
            <div class="user-bio-section-header">
              <span>联系方式</span>
            </div>
            <div class="user-bio-section-body">
              <div class="text-muted">
                <p>联系电话：{{ phone }}</p>
                <p>电子邮箱：{{ email }}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12"
                :xs="24">
          <div class="user-education user-bio-section">
            <div class="user-bio-section-header">
              <span>联系方式</span>
            </div>
            <div class="user-bio-section-body">
              <div class="text-muted">
                <p>登录次数：{{ userInfo.login_count }}</p>
                <p>最后登录ip：{{ userInfo.last_login_ip }}</p>
                <p>最后登录时间：{{ userInfo.last_login_time | formatTime('{y}-{m}-{d} {h}:{i}') }}</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          avatar: '',
          name: '',
          role: '',
          email: '',
          phone: '',
          email: '',
        }
      }
    }
  },
  data () {
    return {
      avatar: this.userInfo.avatar_image,
      name: this.userInfo.user_name,
      role: this.userInfo.roles_name,
      email: this.userInfo.email,
      phone: this.userInfo.phone,
      email: this.userInfo.email,
    }
  },
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
