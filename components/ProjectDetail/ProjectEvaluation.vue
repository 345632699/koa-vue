<template>
  <div class="proj-grade">
    <h1 class="grade-header">物理绩效评估</h1>
    
    <div class="grade-container">
      <div class="grade-navigator">         
        <el-row>
          <el-col :span="7" >
            <el-row>
              <el-col :span="10"  style="text-align:center"><div class="grade-stage" v-bind:class="[currentStage>1?classDone:classDoing]">模型驱动</div></el-col>
              <el-col :span="14" style="text-align:center"><div class="grade-forward" ><img src="~assets/img/forward.png"/></div></el-col>
            </el-row>
          </el-col>
          <el-col :span="7">
            <el-row>
              <el-col :span="10"  style="text-align:center"><div class="grade-stage" v-bind:class="[currentStage>2?classDone:(currentStage==2?classDoing:'')]">模型配置</div></el-col>
              <el-col :span="14" style="text-align:center"><div class="grade-forward" ><img src="~assets/img/forward.png"/></div></el-col>
            </el-row>
          </el-col>
          <el-col :span="7" >
            <el-row>
              <el-col :span="10"  style="text-align:center"><div class="grade-stage" v-bind:class="[currentStage>3?classDone:(currentStage==3?classDoing:'')]">模型率定验证</div></el-col>
              <el-col :span="14" style="text-align:center"><div class="grade-forward" ><img src="~assets/img/forward.png"/></div></el-col>
            </el-row>
          </el-col>     
          <el-col :span="3" >      
            <el-row>
              <el-col :span="24" ><div class="grade-stage" v-bind:class="[currentStage>4?classDone:(currentStage==4?classDoing:'')]">项目绩效评估</div></el-col>
            </el-row>        
          </el-col>         
        </el-row>
      </div>

      <div class="grade-step-container">
        <ProjectPatternDriver :projectId="projectId" class="project-page" v-if="currentStage <= 1"/>
        <ProjectPatternConfig :projectId="projectId" class="project-page" v-else-if="currentStage == 2"/>
        <!-- <ProjectVerification :projectId="projectId" class="project-page" v-else-if="currentStage == 3"/> -->
        <div :projectId="projectId" v-else-if="currentStage == 3" class="verify-page" >
          <div class="verfiy-center">
            <img src="~assets/img/loop.png" class="loop verfiy-img"/>
            <label class="verfiy-text">模型率定验证中</label>
          </div>
        </div>
        <ProjectEvaluation :projectId="projectId" class="project-page" v-else-if="currentStage > 3"/>
      </div>

      <div class="footer-container">
        <el-button @click="onBack" class="element-btn" v-if="currentStage > 1">上一步</el-button>
        <el-button @click="onContinue" type="primary" class="element-btn" v-if="currentStage < 4">下一步</el-button>
      </div>

    </div>

  </div>

</template>


<script>

import ProjectPatternDriver from './ProjectEvaluation/ProjectPatternDriver.vue'
import ProjectPatternConfig from './ProjectEvaluation/ProjectPatternConfig.vue'
import ProjectVerification from './ProjectEvaluation/ProjectVerification.vue'
import ProjectEvaluation from './ProjectEvaluation/ProjectGrade.vue'

export default {
  props: {
    projectId: {type: Number}
  },

  components: {
    ProjectPatternDriver,
    ProjectPatternConfig,
    ProjectVerification,
    ProjectEvaluation
  },

  data () {
    return {
      classDone: 'grade-done',
      classDoing: 'grade-doing',
      classLastStep: 'grade-last-step',
      currentStage: 1
    }
  },

  created () {
  },

  methods: {
    onEnter () {
      console.log('onEnter...evaluation')
    },

    onBack () {
      this.currentStage--
    },

    onContinue () {
      this.currentStage++
    }
  }
}
</script>

<style scoped>
.proj-grade {
  background-color: #fff;
  min-width: 900px;
}

.proj-grade .grade-header {
  font-size: 16px;
  color: #1f2d3d;
  padding-left: 40px;
  padding-top: 40px;
}

.proj-grade .grade-container {
  padding: 60px;
}

.proj-grade .grade-navigator {
  padding-bottom: 40px;
  border-bottom: 1px solid #aaa;
}

.proj-grade .grade-stage {
  display: inline-block;
  background-color: #999999;
  color: #fff;
  font-size: 16px; 
  width: 100%;
  height: 40px;
  text-align: center;  
  vertical-align: middle;
  line-height: 40px;
  border-radius: 40px;  
}

.proj-grade .grade-forward{
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;  
  vertical-align: middle;
  line-height: 40px;
}

.proj-grade .grade-done {
  background-color: #64bf00;
}

.proj-grade .grade-doing {
  background-color: #3F9EFF;
}

.proj-grade .grade-step-container {
  margin: 0;
}

.proj-grade .element-btn {
  margin-left: 8px;
  margin-right: 8px;
}

.proj-grade .verify-page {
  width:100%;
  height:380px;
  text-align:center;
}

.proj-grade .verfiy-center {
  display:inline-block;
  margin:0 auto; 
  margin-top: 100px;
}

.proj-grade .verfiy-img {
  display:block;
  margin:0 auto;
  width:92px;
  height:92px;
}

.proj-grade .verfiy-text {
  margin-top: 30px;
  font-size: 20px;
  color: #333;
}


/* .loop:hover {
transform:rotate(360deg);
-ms-transform:rotate(360deg); 
-moz-transform:rotate(360deg);
-webkit-transform:rotate(360deg); 
-o-transform:rotate(360deg); 
transition:transform 2s linear;
-webkit-transition:-webkit-transform 2s linear;
} */

@-webkit-keyframes rotation{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}

.loop {
transform:rotate(360deg);
-ms-transform:rotate(360deg); 
-moz-transform:rotate(360deg);
-webkit-transform:rotate(360deg); 
-o-transform:rotate(360deg); 
animation: rotation 3s linear infinite;
-moz-animation: rotation 3s linear infinite;
-webkit-animation: rotation 3s linear infinite;
-o-animation: rotation 3s linear infinite;
}


.footer-container {
  margin: 0 auto;
  text-align:center;
}

.show-inline {
  display: inline-block;
}

</style>

//每一步中的文件是如何录入的
