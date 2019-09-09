<template>
  <div class="header">
    <img class="logo" src="~assets/img/header.png"/>
    <div class="title">深圳市智慧海绵城市管理平台</div>
    <div class="user-info r">
      <span class="userinfolink">欢迎您！{{userName}}</span>
      <span class="logoutlink" @click="logout">[退出]</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userName: ''
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  },
  created () {
    let _this = this
    _this.userName = 'lin'
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  /* font-family: "Microsoft YaHei"; */
  font-size: 20px;
  line-height: 60px;
  color: #fff;
  background-color: #399AF1;
}
.header .logo {
  margin-left: 9px;
  margin-top: 9px;
  width: 42px;
  height: 42px;
  display: inline-block;
}
.header .title {
  /* float: left;
  left: 82px; */
  position: absolute;
  left: 60px;
  top: 0;
  height: 60px;
  width: 350px;
  /* text-align: center; */
}
.user-info {
  padding-right: 50px;
  font-size: 14px;
  color: #fff;
}
.user-info .userinfolink {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  vertical-align: middle;
}
.user-info .logoutlink {
  position: relative;
  display: inline-block;
  /* color: #3a8ee6; */
  color: #fff;
  cursor: pointer;
}
</style>