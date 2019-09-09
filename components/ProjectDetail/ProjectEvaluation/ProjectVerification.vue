<template>
  <div class="proj-info">
  </div>

</template>

<script>
export default {
  props: {
    projectId: {type: Number}
  },
  data () {
  },

  created () {
  },

  methods: {
  }
}
</script>


<style scoped>

.proj-info {
  width: 100%;
  height: 100%;
}

.proj-info .element-btn {
  width: 100px;
  margin-left: 8px;
  margin-right: 8px;
}

.proj-info .info-container {
  margin-bottom:20px;
}

.proj-info .info-set {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  overflow: auto;
}

.proj-info .info-set-header {
  font-size: 16px;
  color: #1f2d3d;
  padding: 10px;
}

.proj-info .info-row {
  margin-top: 10px;
  margin-bottom:10px;
}

.proj-info .info-item-label {
  width: 180px;
  color: #888;
  text-align: right;
}

.proj-info .info-item-value {
  width: 380px;
  margin-left: 20px;
}


.proj-info .project-table {
  margin-top: 20px;
  margin-bottom: 40px;
  width: 100%;
}

.proj-info .edit {
  color: #20a0ff;
  cursor: pointer;
}

.proj-info .info-attach-div {
  margin-left: 10px;
  margin-bottom: 30px;
}

.proj-info .info-attach-title {
  display: block;
  color: #aaa;
}

.proj-info .info-attach-file {
  display: block;
  color: #20a0ff;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
}

.proj-info .footer-container {
  margin-top: 40px;
  margin-bottom: 40px;
}

.div-right {
  display: inline-block;
  position: absolute;
  right: 20px;
}

/*要求父元素为 position: relative*/
.div-middle {
  position:absolute;
  top:50%;
  transform:translate(0,-50%);
}

.show-inline {
  display: inline-block;
}

</style>

<!--todo: 添加子项目 弹窗未处理-->
