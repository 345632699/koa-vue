<template>
  <div class="bottom-compose">
    <!--时间轴-->
    <div style="width:390px;" class="bottom-el-menu">
    </div>
    <!--图层操作-->
    <el-dropdown class="bottom-el-menu ">
      <el-button class="el-dropdown-link">图层操作</el-button>
      <el-dropdown-menu class="bottome-menu-popup" slot="dropdown">
        <el-dropdown-item>项目<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>二级汇水分区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>行政区域<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>河流<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>流域<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--行政区域-->
    <el-dropdown class="bottom-el-menu bottom-el-menu-offset">
      <el-button class="el-dropdown-link">行政区域</el-button>
      <el-dropdown-menu class="bottome-menu-popup" slot="dropdown">
        <el-dropdown-item>南山区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>福田区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>罗湖区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>龙华区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>盐田区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>坪山区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>龙岗区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>大鹏新区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>光明新区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--项目状态-->
    <el-dropdown class="bottom-el-menu ">
      <el-button class="el-dropdown-link">项目状态</el-button>
      <el-dropdown-menu class="bottome-menu-popup" slot="dropdown">
        <el-dropdown-item>待建<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>建设中<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>已建设<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--项目类型-->
    <el-dropdown class="bottom-el-menu ">
      <el-button class="el-dropdown-link">项目类型</el-button>
      <el-dropdown-menu class="bottome-menu-popup" slot="dropdown">
        <el-dropdown-item>建筑小区<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>道路广场<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>公园绿地<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>水务项目<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
        <el-dropdown-item>改造项目<el-checkbox class="r" v-model="checked" /></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--重点项目-->
    <div class="bottom-menu-style">
      <el-checkbox class="bottom-checkbox-link" v-model="checked" >重点项目</el-checkbox>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      layer_activeIndex: '1',
      area_activeIndex: '1',
      checked: true
    }
  },
  watch: {
    // 监听isCollapse变更后对外发送事件通知
    checked (val) {
      this.$emit('selectFetureChange', val)
    }
  },
  mounted () {

  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.bottom-el-menu {
    float: left;
    height: 45px;
    line-height: 45px;
    width: 150px;
}
.bottom-menu-style {
  float: left;
  height: 45px;
  line-height: 45px;
  width: 150px;
  background-color: #ffffff;
}
.bottom-el-menu-offset {
    margin-left: 45px;
}
.bottome-menu-popup {
  margin-bottom: 0px;
  width: 150px;
}
.el-dropdown-link {
  width: 150px;
  height: 45px;
}
.bottom-checkbox-link {
  vertical-align:middle; 
  padding-left: 30px;
  height:45px; 
  position: relative;
}
</style>
<!--覆盖样式-->
<style>
/* .bottom-compose .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 45px;
    line-height: 45px;
}
.bottom-compose .el-menu--horizontal>.el-menu-item {
    height: 45px;
    line-height: 45px;
}
.bottom-compose .el-menu-item {
  width: 100%;
  padding: 0 30px;
}
.bottom-compose .el-submenu, .el-submenu__title {
    width: 100%;
}
.bottom-compose .el-submenu__title {
    text-indent:25px;
}
.bottom-compose .el-submenu__icon-arrow {
    display: none;
}
.bottom-compose .popper__arrow {
  display: none;
  visibility: hidden;
}
.bottom-compose .popper__arrow::::after {
  display: none;
  visibility: hidden;
}
*/
.el-popper .popper__arrow, .el-popper .popper__arrow::after {
    position: absolute;
    display: none;
    height: 0;
}

</style>