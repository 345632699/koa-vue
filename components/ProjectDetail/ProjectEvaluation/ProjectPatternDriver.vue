<template>
  <div class="patt-driver">
    <div class="set-container"> 
      <div class="header-container">
        <span class="header-label">水力模型：</span> 
        <el-select v-model="pattern" placeholder="请选择" class="header-select">
          <el-option v-for="(item,idx) in patterns" :key="idx" :label="item" :value="item">
          </el-option>
        </el-select>
        <i class="el-icon-question help" @click="onHelp"></i>
      </div>
      <div class="content-container">
        <div class="col split">
          <div class="line">气象数据（<span class="edit" @click="onWeatherExample">查看示例</span>）</div>
          <div class="line">数据文件： 
            <div class="show-inline">
              <label class="edit" @click="onViewWeatherFile">{{weatherFile}}</label>
              <i class="el-icon-delete delete" @click="onDeleteWeatherFile"></i>
            </div>            
          </div>
          <el-button @click="onUploadWeatherFile" size="small" type="primary" class="line">上传文件</el-button>
        </div>
        <div class="col">
          <div class="line">水文数据（<span class="edit" @click="onWaterExample">查看示例</span>）</div>
          <div class="line">数据文件： 
            <div class="show-inline">
              <label class="edit"  @click="onViewWaterFile">{{waterFile}}</label>
              <i class="el-icon-delete delete"  @click="onDeleteWaterFile"></i>
            </div>            
          </div>
          <el-button @click="onUploadWaterFile" size="small" type="primary" class="line">上传文件</el-button>
        </div>  
      </div>            
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
      weatherFile: '全年降雨数据及年蒸发量数据.csv',
      waterFile: '深圳市福田区水文数据文件.csv',
      patterns: [
        'SWMM'
      ],
      pattern: null
    }
  },

  created () {
  },

  methods: {
    onHelp () {
      console.log('onHelp')
    },

    onWeatherExample () {
      console.log('onWeatherExample')
    },

    onViewWeatherFile () {
      console.log('onViewWeatherFile')
    },

    onDeleteWeatherFile () {
      console.log('onDeleteWeatherFile')
    },

    onUploadWeatherFile () {
      console.log('onUploadWeatherFile')
    },

    onWaterExample () {
      console.log('onWaterExample')
    },

    onViewWaterFile () {
      console.log('onViewWaterFile')
    },

    onDeleteWaterFile () {
      console.log('onDeleteWaterFile')
    },

    onUploadWaterFile () {
      console.log('onUploadWaterFile')
    }
  }
}
</script>


<style scoped>
.patt-driver {
  background-color: #fff;
  min-width: 900px;
  padding-bottom: 20px;
}

.patt-driver .set-container {
  position: relative;
  background-color: #eee;
  margin: 20px;
}

.patt-driver .header-container {
  position: relative;
  margin: 0;
  padding: 10px;
  padding-left: 20px;
  background-color: #ccc;
}

.patt-config .header-label {
  color: #333;
  margin-right: 10px;
}

.patt-driver .header {
  text-align: center;
}

.patt-driver .help {
  color: #009afd;
  padding: 10px;
  cursor: pointer;
}

.patt-driver .content-container {
  margin: 0;
  padding: 20px;
}

.patt-driver .col {
  display:inline-block;
  padding-left:20px;
  padding-right:20px;
  width:50%;
}

.patt-driver .split {
  border-right:1px solid #fff;
}


.patt-driver .line {
  margin: 10px;
}

.patt-driver .edit {
  color: #20a0ff;
  cursor: pointer;
}

.patt-driver .delete {
  color: red;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}

.show-inline {
  display: inline-block;
}

</style>

