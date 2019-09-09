<template>
  <div class="proj-lifecycle">    
    <div class="lifecycle-container">
      <div class="lifecycle-navigator">
        <div class="lifecycle-stage-container">
          <div v-for="(stage, idx) in stages"  v-bind:key="idx" style="display:inline-block;">
            <div style="margin-bottom:10px;">
              <div class="lifecycle-stage-num" v-bind:class="[current_stage>idx?'stage-active':'']">{{idx+1}}</div>
              <div class="lifecycle-stage-line" v-if="idx+1 < stages.length" v-bind:class="[current_stage>idx+1?'stage-active':'']"></div>
            </div>
            <div class="lifecycle-stage-title">{{stage.title}}</div>
          </div>       
        </div>
      </div>
      
      <div class="lifecycle-step-container" v-for="(stage, sidx) in stages"  v-bind:key="sidx">
        <template v-for="(step, idx) in stage.steps" v-if="current_stage === sidx+1">
          <img src="~assets/img/down.png" class="lifecycle-step-forward" v-if="idx > 0" v-bind:key="idx"/>
          <template v-if="isStepCheckDepartment(sidx, idx)">       
            <div class="lifecycle-step lifecycle-step-doing" v-if="idx+1 <= stage.current_step" v-bind:key="idx">
              <div class="lifecycle-step-title" v-if="idx+1 === stage.current_step">请确认{{step.title}}</div>
              <div class="lifecycle-step-title" v-else>{{step.title_done ? step.title_done : step.title+'已确认'}}</div>
              <div class="step-department-div">
                <div v-for="(department, didx) in projDepartments" v-bind:key="didx" class="step-department">
                  <el-select disabled :value="department.name" class="step-select">
                  </el-select>                
                  <div class="step-confirmed" v-if="department.state === 1" >已确认<img src="~assets/img/ok.png" class="lifecycle-step-icon"/></div>
                  <el-button v-else @click="onConfirmDepartment(sidx, idx, didx)" class="step-deparment-btn">确认</el-button>
                </div>
              </div>              
            </div>
            <div class="lifecycle-step lifecycle-step-none"  v-else v-bind:key="idx">
              <div class="lifecycle-step-title">{{step.title}}</div>
            </div> 
          </template>
          <template v-else>
            <div class="lifecycle-step lifecycle-step-done lifecycle-last-step" v-if="step.state===1 && idx===stage.steps.length-1" v-bind:key="idx">
              <div class="lifecycle-step-title">
                <img src="~assets/img/big_ok.png" class="lifecycle-step-bigok"/>
                <div>{{step.title_done ? step.title_done : step.title+'已确认'}}</div>                
              </div>              
            </div>
            <div class="lifecycle-step lifecycle-step-done" v-else-if="step.state === 1" v-bind:key="idx">
              <div class="lifecycle-step-title">
                {{step.title_done ? step.title_done : step.title+'已确认'}}
                <img src="~assets/img/ok.png" class="lifecycle-step-icon" v-if="idx !== stage.steps.length-1"/>
              </div>              
            </div>  
            <div class="lifecycle-step lifecycle-step-doing" v-else-if="idx+1 === stage.current_step" v-bind:key="idx">
              <div class="lifecycle-step-title">请确认{{step.title}}</div>
              <a v-if="isStepLink(sidx, idx)" class="lifecycle-step-link" @click="onClickLink(sidx, idx)">{{step.link_tips}} ></a>
              <el-input v-if="isStepOpinion(sidx, idx)" type="textarea" class="lifecycle-step-text" v-model="step.opinion" v-bind:placeholder="step.opinion_tips"></el-input>
              <el-button @click="onConfirm(sidx, idx)" class="lifecycle-step-btn">确认</el-button>
            </div>
            <div class="lifecycle-step lifecycle-step-none"  v-else v-bind:key="idx">
              <div class="lifecycle-step-title">{{step.title}}</div>
            </div>  
          </template>  
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

const STEP_TYPE_DEPARTMENT = 1 // 确认责任单位列表
const STEP_TYPE_LINK = 2 // 文字链类
const STEP_TYPE_OPINION = 4 // 文字链类
// const STEP_TYPE_START_PROJECT = 8 // 项目施工
// const STEP_TYPE_END_PROJECT = 16 // 项目竣工

// const STATE_NONE = 0
const STATE_DONE = 1
const STATE_DOING = 2

const LINK_TYPE_FILE = 1
const LINK_TYPE_PROJ_INFO = 2

export default {
  props: {
    projectId: {type: Number}
  },
  data () {
    return {
      isInited: false, // 是否已经初始化数据
      current_stage: 1, // 项目当前阶段
      stages: [], // 项目生命周期各个阶段（阶段内含各个步骤）
      projDepartments: [] // 项目责任单位
    }
  },

  created () {
  },

  mounted () {
    this.$emit('mounted') // 通知父组件已经mounted
  },

  methods: {
    // 初始化数据
    async initData () {
      // 获取项目生命周期
      let res = await axios.get(`/api/getProjectLifecycle?id=${this.projectId}`)
      if (res.status === 200 && res.data.ret === 0) {
        this.current_stage = res.data.data.current_stage || 1
        this.stages = res.data.data.stages || []
      }

      // 获取项目责任单位
      let resDepart = await axios.get(`/api/getProjectDepartments?id=${this.projectId}`)
      if (resDepart.status === 200 && resDepart.data.ret === 0) {
        this.projDepartments = resDepart.data.data
      }
    },

    // 响应父页通知:进入该子页时初始化数据
    async onEnter ({ regions,
      departments,
      projectTypes,
      engineerings
    }) {
      console.log('onEnter lifecycle, this.projectId...', this.projectId)
      if (this.isInited) return
      console.log('init lifecycle')
      this.isInited = true
      this.initData()
    },

    // 点击当前步骤的确认按钮
    async onConfirm (stageIdx, stepIdx) {
      // if (stageIdx !== this.current_stage - 1) return
      // if (stepIdx < 0 || stepIdx >= this.stages[stageIdx].steps.length) return
      let statgeObj = this.stages[stageIdx]
      let stepObj = this.stages[stageIdx].steps[stepIdx]

      let postData = {
        project_id: this.projectId,
        stage_idx: this.stages[stageIdx].idx,
        step_idx: stepObj.idx,
        title: stepObj.title
      }
      if ((stepObj.type & STEP_TYPE_OPINION) === STEP_TYPE_OPINION) {
        // todo 这里没有通知项目信息页面进行刷新
        postData.opinion = stepObj.opinion
      }

      let res = await axios.post('/api/updateProjectState', postData)
      if (res.status !== 200 || res.data.ret !== 0) return

      stepObj.state = STATE_DONE
      if (statgeObj.current_step < statgeObj.steps.length) {
        // 切换到当前阶段下一步
        statgeObj.current_step++
        statgeObj.steps[statgeObj.current_step - 1].state = STATE_DOING
      } else if (this.current_stage < this.stages.length) {
        // 切换到下一阶段
        setTimeout(() => {
          this.current_stage++
          this.stages[this.current_stage - 1].steps[0].state = STATE_DOING
        }, 1000)
      }
    },

    // 确认责任单位
    async onConfirmDepartment (stageIdx, stepIdx, departmentIdx) {
      // if (stageIdx !== this.current_stage - 1) return
      // if (stepIdx < 0 || stepIdx >= this.stages[stageIdx].steps.length) return

      let res = await axios.post('/api/confirmProjectDepartment', {
        project_id: this.projectId,
        department_id: this.projDepartments[departmentIdx].id
      })
      if (res.status !== 200 || res.data.ret !== 0) return

      this.projDepartments[departmentIdx].state = 1

      // 检查是否全部责任单位确认完毕，若全部确认完毕，可进入下一步
      let stepState = STATE_DONE
      for (let department of this.projDepartments) {
        if (department.state === 0) {
          stepState = STATE_DOING
          break
        }
      }
      if (stepState === STATE_DONE) {
        this.onConfirm(stageIdx, stepIdx)
      }
    },

    // 第stageIdx阶段 第stepIdx步 是否是确认责任单位
    isStepCheckDepartment (stageIdx, stepIdx) {
      // if (stageIdx < 0 || stageIdx >= this.stages.length) return false
      // if (stepIdx < 0 || stepIdx >= this.stages[stageIdx].steps.length) return false
      let stepObj = this.stages[stageIdx].steps[stepIdx]
      if (stepObj.type === STEP_TYPE_DEPARTMENT) {
        return true
      }
      return false
    },

    // 第stageIdx阶段 第stepIdx步 是否有外链
    isStepLink (stageIdx, stepIdx) {
      // if (stageIdx < 0 || stageIdx >= this.stages.length) return false
      // if (stepIdx < 0 || stepIdx >= this.stages[stageIdx].steps.length) return false
      let stepObj = this.stages[stageIdx].steps[stepIdx]
      if ((stepObj.type & STEP_TYPE_LINK) === STEP_TYPE_LINK &&
          stepObj.link_tips && stepObj.link_type) {
        return true
      }
      return false
    },

    // 第stageIdx阶段 第stepIdx步 是否是评审意见类型
    isStepOpinion (stageIdx, stepIdx) {
      // if (stageIdx < 0 || stageIdx >= this.stages.length) return false
      // if (stepIdx < 0 || stepIdx >= this.stages[stageIdx].steps.length) return false
      let stepObj = this.stages[stageIdx].steps[stepIdx]
      if ((stepObj.type & STEP_TYPE_OPINION) === STEP_TYPE_OPINION) {
        return true
      }
      return false
    },

    // 点击外链
    onClickLink (stageIdx, stepIdx) {
      // if (stageIdx < 0 || stageIdx >= this.stages.length) return false
      // if (stepIdx < 0 || stepIdx >= this.stages[stageIdx].steps.length) return false
      let stepObj = this.stages[stageIdx].steps[stepIdx]
      if (stepObj.link_type === LINK_TYPE_PROJ_INFO) {
        this.$emit('switchTab', 'info')
      } else if (stepObj.link_type === LINK_TYPE_FILE && stepObj.file_path) {
        window.open(stepObj.file_path)
      }
    }
  }
}
</script>

<style scoped>
.proj-lifecycle {
  background-color: #fff;
  min-width: 900px;
}

.lifecycle-container {
  padding: 60px;
}

.lifecycle-navigator {
  padding-bottom: 40px;
  text-align:center;
}

.lifecycle-stage-container {
  display: inline-block;
  margin: 0 auto;
}

.lifecycle-stage-num {
  display:inline-block;
  text-align:center;
  color: #fff;
  font-size: 20px;
  width:30px;
  height:30px;
  line-height:30px;
  vertical-align:middle;
  border-radius: 30px;
  margin-right:30px;
  background-color:#A8ACB5;
}

.lifecycle-stage-line {
  display:inline-block;
  width:200px;
  height:4px;
  text-align:center;
  margin-left:-30px;
  background-color:#E9EEF2;
}

.lifecycle-stage-title {
  text-align:center;
  width:90px;
  font-size: 14px;
  margin-left:-30px;
  color:#555A67;
}

.stage-active {
  background-color:#85DB5E;
}

.lifecycle-step-container {
  width: 550px; 
  margin:0 auto; 
  margin-top: 60px;
}

.lifecycle-step {
  position: relative;
  border-radius: 5px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: #fff;
  font-size: 16px;
}

.lifecycle-step-done {
  background-color: #3F9EFF;
  width: 280px;
}

.lifecycle-step-doing {
  background-color: #3F9EFF;
  width: 380px;
}

.lifecycle-step-none {
  background-color: #E9EEF2;
  width: 280px;
  color: #555A67;
}

.lifecycle-last-step {
  width: 160px;
  height: 160px;
  border-radius: 160px;
  padding-top: 60px;
}

.lifecycle-step-title {
  display:block;  
  width:100%;
  /* height:16px; */
  line-height:22px;
  text-align:center;
}

.lifecycle-step-icon {
  vertical-align: middle;
  margin-left: 5px;
}

.lifecycle-step-bigok {
  width: 44px;
  height: 34px;
  margin-top: -20px;
  margin-bottom: 20px;
}

.lifecycle-step-btn {
  width: 100px;
  height: 36px;
  line-height: 12px;
  border-radius: 100px;
  margin-top: 20px;
}

.step-deparment-btn {
  width: 100px;
  height: 36px;
  line-height: 12px;
  border-radius: 100px;
}

.step-department-div {
  margin-top: 20px;
}

.step-department {
  height: 50px;
}

.step-select {
  width: 200px;
  margin-right: 10px;
}

.step-confirmed {
  display: inline-block;
  font-size: 14px;
  width: 100px;
  height: 36px;
}

.lifecycle-step-text {
  margin-top: 20px;
}

.lifecycle-step-link {
  display: block;
  font-size:14px;
  color:#ff0;
  margin-top:20px;
}

.lifecycle-step-forward {
  display:block;
  width: 14px;
  height: 40px;
  margin: 0 auto;
}

/* .navigator-left {
  display: inline-block;
  padding-right:160px;
  width:100%;
  height:100%;
}

.navigator-right {
  display: inline-block;
  margin-left:-160px;
  width:160px;
  height:100%;
}

.navigator-col {
  position:relative;
  width:100%;
  height:100%;
}

.navigator-col-left {
  position:absolute;
  left:0;
  top:0;
  width: 160px;
}

.navigator-col-right {
  width:100%;
  padding-left:160px;
} */

</style>

