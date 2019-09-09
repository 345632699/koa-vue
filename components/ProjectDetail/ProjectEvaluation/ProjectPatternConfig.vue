<template>
  <div class="patt-config">
    <div class="set-container"> 
      <div class="header-container">
        官网数据（<span class="edit" @click="onPipeNetExample">查看示例</span>）
      </div>
      <div class="content-container">
        <div class="col">
          <div class="line">数据文件： 
            <div class="show-inline">
              <label class="edit"  @click="onViewPipeNetFile">{{pipeNetFile}}</label>
              <i class="el-icon-delete delete"  @click="onDeletePipeNetFile"></i>
            </div>            
          </div>
          <el-button @click="onUploadPipeNetFile" size="small" type="primary" class="line">上传文件</el-button>
        </div>          
      </div>            
    </div>

    <div class="set-container"> 
      <div class="center-container">
        模型参数
      </div>
      <el-row class="content-container">
        <el-col :span="8" class="col">
        </el-col>
        <el-col :span="8" class="col">
        </el-col>
        <el-col :span="8" class="col">
        </el-col>  
      </el-row>            
    </div>

    <div class="set-container"> 
      <div class="center-container">
        土地利用（土壤类型）
      </div>
      <el-row class="content-container">
        <el-col :span="8" class="col split">
          <div class="line">裸土利用数据（<span class="edit" @click="onBareSoilExample">查看示例</span>）</div>
          <div class="line">数据文件： 
            <div class="show-inline">
              <label class="edit" @click="onViewBareSoilFile">{{bareSoilFile}}</label>
              <i class="el-icon-delete delete" @click="onDeleteBareSoilFile"></i>
            </div>            
          </div>
          <el-button @click="onUploadBareSoilFile" size="small" type="primary" class="line">上传文件</el-button>
        </el-col>
        <el-col :span="8" class="col split">
          <div class="line">水泥地利用数据（<span class="edit" @click="onCementExample">查看示例</span>）</div>
          <div class="line">数据文件： 
            <div class="show-inline">
              <label class="edit"  @click="onViewCementFile">{{cementFile}}</label>
              <i class="el-icon-delete delete"  @click="onDeleteCementFile"></i>
            </div>            
          </div>
          <el-button @click="onUploadCementFile" size="small" type="primary" class="line">上传文件</el-button>
        </el-col> 
        <el-col :span="8" class="col">
          <div class="line">植被土地利用数据 （<span class="edit" @click="onVegetationExample">查看示例</span>）</div>
          <div class="line">数据文件： 
            <div class="show-inline">
              <label class="edit"  @click="onViewVegetationFile">{{vegetationFile}}</label>
              <i class="el-icon-delete delete"  @click="onDeleteVegetationFile"></i>
            </div>            
          </div>
          <el-button @click="onUploadVegetationFile" size="small" type="primary" class="line">上传文件</el-button>
        </el-col> 
      </el-row>            
    </div>

    

  </div>

</template>

<script>
export default {
  props: {
    projectId: {type: Number}
  },

  data () {
    return {
      pipeNetFile: '全年降雨数据及年蒸发量数据.csv',
      bareSoilFile: '深圳市福田区裸土利用数据文件.csv',
      cementFile: '深圳市福田区水泥地利用数据文件.csv',
      vegetationFile: '深圳市福田区植被土地利用数据文件.csv'
    }
  },

  created () {
  },

  methods: {
    onPipeNetExample () {

    },

    onViewPipeNetFile () {

    },

    onDeletePipeNetFile () {

    },

    onUploadPipeNetFile () {

    },

    onBareSoilExample () {

    },

    onViewBareSoilFile () {

    },

    onDeleteBareSoilFile () {

    },

    onUploadBareSoilFile () {

    },

    onCementExample () {

    },

    onViewCementFile () {

    },

    onDeleteCementFile () {

    },

    onUploadCementFile () {

    },

    onVegetationExample () {

    },

    onViewVegetationFile () {

    },

    onDeleteVegetationFile () {

    },

    onUploadVegetationFile () {

    }
  }
}
</script>


<style scoped>
.patt-config {
  background-color: #fff;
  min-width: 900px;
  padding-bottom: 20px;
}

.patt-config .set-container {
  position: relative;
  background-color: #eee;
  margin: 20px;
}

.patt-config .header-container {
  position: relative;
  margin: 0;
  padding: 10px;
  padding-left: 20px;
  background-color: #ccc;
}

.patt-config .center-container {
  background-color: #ccc;
  display:inline-block; 
  padding: 10px;
  text-align:center;
  width:100%;  
}

.patt-config .header-label {
  color: #333;
  margin-right: 10px;
}

.patt-driver .header {
  text-align: center;
}

.patt-config .help {
  color: #009afd;
  padding: 10px;
  cursor: pointer;
}

.patt-config .content-container {
  margin: 0;
  padding: 20px;
}

.patt-config .col {
  padding-left:15px;
  padding-right:15px;
}

.patt-config .split {
  border-right:1px solid #fff;
}

.patt-config .line {
  margin: 10px;
}

.patt-config .edit {
  color: #20a0ff;
  cursor: pointer;
}

.patt-config .delete {
  color: red;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}

.show-inline {
  display: inline-block;
}

</style>

