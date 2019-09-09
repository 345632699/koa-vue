<template>
	<div class="task-mgr">
		<el-row class="header-container">
			<el-col :md="4" :sm="24" :xs="24">
				<label class="header">任务管理</label>
			</el-col>
			<div class="div-right div-middle">
				任务年限：<el-select v-model="selectDate" class="element-select">
					<el-option v-for="(item,idx) in importDates" :key="idx" :label="item" :value="item">
					</el-option>
				</el-select>
				<search class="search" :search="onSearch"></search>
				<el-button @click="createTask" type="primary" style="width: 120px" class="confirm-btn" round>添加任务</el-button>
				<el-button type="primary" style="width: 120px" class="return-btn" round>导出报表</el-button>
			</div>
			<!--<el-col :sm="24" :lg="20" :md="24" class="div-right">-->
			<!--<el-col :span="8">-->
			<!--<el-select v-model="selectDate" class="element-select">-->
			<!--<el-option v-for="(item,idx) in importDates" :key="idx" :label="item" :value="item">-->
			<!--</el-option>-->
			<!--</el-select>-->
			<!--</el-col>-->
			<!--<el-col :span="8">-->
			<!--<search class="search" :search="onSearch"></search>-->
			<!--</el-col>-->
			<!--<el-col :span="8">-->
			<!--<el-button @click="createTask" type="primary" style="width: 120px" class="confirm-btn" round>添加任务</el-button>-->
			<!--<el-button  type="primary" style="width: 120px" class="return-btn" round>导出报表</el-button>-->
			<!--</el-col>-->
			<!--</el-col>-->
		</el-row>

		<el-row class="overview-container">
			<label class="overview-title">任务概览</label>
			<div class="overview-content">
				<div class="overview-task">
					<label class="task-count done">{{finishTaskCount}}</label>
					<label class="task-desc">完成任务数</label>
				</div>
				<div class="overview-task">
					<label class="task-count undone">{{unFinishTaskCount}}</label>
					<label class="task-desc">未完成任务数</label>
				</div>
				<div class="overview-task">
					<label class="task-count hangup">{{longTermTaskCount}}</label>
					<label class="task-desc">长期任务数</label>
				</div>
				<div class="overview-task">
					<label class="task-count alls">{{allTaskCount}}</label>
					<label class="task-desc">总任务数</label>
				</div>
			</div>
		</el-row>

		<div class="taskmgr-container">
			<el-tabs v-model="activeName" type="card">
				<el-tab-pane label="组织体系" name="first">
					<el-row :gutter="12">
						<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item,idx) in listByOrg" :key="idx">
							<el-card shadow="always" @click.native="getListByOrg(item.id)">
								<el-row style="display: inline-block;width: 100%;position:absolute; transform: translateY(50%)">
									<div class="title">{{ item.name }}</div>
									<div class="showdata">
                      <span class="detail">
                        已完成
                        <span class="done">{{ item.done }}</span>
                      </span>
										<span class="detail">
                        未完成
                        <span class="hangup">{{ item.hangup }}</span>
                      </span>
										<span class="detail">
                        长期
                        <span class="longterm">{{ item.longterm }}</span>
                      </span>
									</div>
								</el-row>
								<el-row class="rightStyle">
									<i class="el-icon-arrow-right"></i>
								</el-row>
							</el-card>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane class="taskType" label="任务体系" name="second">
					<el-row :gutter="12">
						<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item,idx) in listByTaskType" :key="idx">
							<el-card shadow="always" @click.native="getListByTaskType(item.id)">
								<el-row style="display: inline-block;width: 100%;position:absolute; transform: translateY(50%)">
									<div class="title">{{ item.name }}</div>
									<div class="showdata">
                      <span class="detail">
                        已完成
                        <span class="done">{{ item.done }}</span>
                      </span>
										<span class="detail">
                        未完成
                        <span class="hangup">{{ item.hangup }}</span>
                      </span>
										<span class="detail">
                        长期
                        <span class="longterm">{{ item.longterm }}</span>
                      </span>
									</div>
								</el-row>
								<el-row class="rightStyle">
									<i class="el-icon-arrow-right"></i>
								</el-row>
							</el-card>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>

	</div>
</template>

<script>
  import search from '../../components/Search'
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        importDates: ['2016年', '2017年', '2018年'],
        selectDate: '2017年',
        searchWord: '',
        finishTaskCount: '数据加载中',
        unFinishTaskCount: '数据加载中',
        longTermTaskCount: '数据加载中',
        allTaskCount: '数据加载中',
        activeName: 'first',
        regions: [
          {id: 0, name: '全市'},
          {id: 1, name: '福田区'},
          {id: 2, name: '南山区'},
          {id: 3, name: '宝安区'},
          {id: 4, name: '罗湖区'}
        ],
        institutions: [
          {id: 0, name: '全部单位'},
          {id: 1, name: '市海绵办'},
          {id: 2, name: '水务局'},
          {id: 3, name: '住建局'}
        ],
        projectTypes: [
          {id: 0, name: '全部类型'},
          {id: 1, name: '建筑小区'},
          {id: 2, name: '道路广场'},
          {id: 3, name: '公园绿地'}
        ],
        listByOrg: [],
        listByTaskType: []
      }
    },

    created () {
    },

    components: {
      search
    },

    methods: {
      tableHeaderStyle ({row, rowIndex}) {
        return {
          fontSize: '14px',
          color: '#1f2d3d',
          backgroundColor: '#eefef6'
        }
      },

      getListByOrg (id) {
        this.$router.push('/BusinessMgr/task/listAll?id=' + id)
      },

      getListByTaskType (id) {
        this.$router.push('/BusinessMgr/task/list?id=' + id)
      },

      onSearch (searchWord) {
        console.log(searchWord)
      },

      createTask () {
        this.$router.push('/BusinessMgr/task/create')
      },

      onBatchImportProject () {

      },

      handleProjectDetail (index, row) {
        this.$router.push({
          path: '/ProjectManager/ProjectDetail',
          query: {
            id: row.id,
            tab: 'lifeCycle'
          }
        })

        console.log('handleProjectDetail')
      },

      handleUpdateStatus (index, row) {
      },

      handleFollowUp (index, row) {
      }
    },
    async mounted () {
      let res = await axios.get('/api/taskCenter')
      this.listByOrg = res.data.data.listByOrg
      this.listByTaskType = res.data.data.listByTaskType
      this.finishTaskCount = res.data.data.taskCount.allHDone
      this.unFinishTaskCount = res.data.data.taskCount.allHangup
      this.longTermTaskCount = res.data.data.taskCount.allLongterm
      this.allTaskCount = res.data.data.taskCount.taskCount
    }
  }
</script>


<style lang="less" scope>
	@import "../../assets/less/common";

	.task-mgr {
		width: 100%;
		height: 100%;
		overflow: auto;
		border: 10px solid #e4e8f1;
		.header-container {
			.header {
				border-bottom: none;
			}
		}
	}

	.task-mgr .header-container {
		background-color: #fff;
		position: relative;
		padding: 25px;
		border-bottom: 1px solid #E4E8F1;
	}

	.task-mgr .header {
		background-color: #fff;
		font-size: 20px;
		text-align: left;
		line-height: 40px;
	}

	.task-mgr .element-btn {
		margin-left: 8px;
		margin-right: 8px;
	}

	.task-mgr .element-input {
		width: 300px;
		display: inline-block;
	}

	.task-mgr .element-select {
		margin-left: 5px;
		margin-right: 30px;
	}

	.task-mgr .export-btn {
		vertical-align: middle;
		padding-right: 10px;
	}

	.task-mgr .overview-container {
		background-color: #F5F7FA;
		margin: 30px;
		padding: 20px;
		background: url("../../assets/img/bg.png") no-repeat;
		background-size: 100% 100%;
	}

	.task-mgr .overview-content {
		padding-top: 30px;
		padding-bottom: 20px;
	}

	.task-mgr .overview-title {
		color: #888;
	}

	.task-mgr .overview-task {
		width: 180px;
		text-align: center;
		display: inline-block;
	}

	.overview-task {
		.done {
			font-size: 60px;
			color: #78CD51;
		}
		.undone {
			font-size: 60px;
			color: #FFC000;
		}
		.hangup {
			font-size: 60px;
			color: #3F9EFF;
		}
		.alls {
			font-size: 60px;
			color: #757575;
		}
	}

	.task-mgr .task-count {
		display: block;
		margin-bottom: 5px;
	}

	.task-mgr .task-desc {
		display: block;
		font-size: 16px;
		color: #555A67;
		letter-spacing: -0.51px;
	}

	.task-mgr .taskmgr-container {
		margin: 30px;
	}

	.task-mgr .tab-head {
		width: 100%;
		height: 48px;
		border-bottom: 1px solid #eee;
		margin-bottom: 20px;
	}

	.task-mgr .tab-btn {
		display: inline-block;
		width: 120px;
		height: 48px;
		/* line-height: 48px; */
		text-align: center;
		background-color: #eee;
		border-right: 1px solid #fff;
		font-size: 20px;
	}

	.task-mgr .tab-pane {
		margin-left: -8px;
		margin-right: -8px;
	}

	.task-mgr .active {
		background-color: #bbb;
	}

	.task-mgr .edit {
		color: #20a0ff;
		cursor: pointer;
	}

	.div-right {
		text-align: right;
	}

	/*要求父元素为 position: relative*/
	.div-middle {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
	}

	.show-inline {
		display: inline-block;
	}

	/* .el-input__inner {
		border: none;
	} */

	/*elm样式修改*/
	.taskmgr-container {
		/*min-width: 980px;*/
	}

	.taskmgr-container .el-tabs__item.is-active {
		background: #3F9EFF;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0;
		font-weight: 100;
	}

	.taskmgr-container .el-tabs__item {
		background-color: #E1F1FF;
		color: #3F9EFF;
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 16px;
	}

	/*.taskmgr-container .el-tabs__item:hover {*/
	/*color: #99CFFF;*/
	/*}*/

	.taskmgr-container .el-card__body {
		position: relative;
		height: 140px;
	}

	.taskmgr-container .rightStyle {
		position: absolute;
		right: 20px;
		top: 35%;
		transform: translateY(50%)
	}

	.el-icon-arrow-right {
		font-size: 18px;
	}

	.taskmgr-container .title {
		font-size: 18px;
	}

	.showdata {
		font-size: 16px;
		padding-top: 10px;
	}

	.showdata .done {
		font-size: 20px;
		color: #78CD51;
	}

	.showdata .hangup {
		font-size: 20px;
		color: #FF9C00;
	}

	.showdata .longterm {
		font-size: 20px;
		color: #3F9EFF;
	}

	.showdata .detail {
		display: inline-block;
		color: #A8ACB5;
		padding-right: 10px;
		font-size: 14px;
	}

	.taskmgr-container .el-col {
		margin-bottom: 10px;
	}

	.task_sys {
		font-size: 20px;
		line-height: 100px;
	}

	.taks_sys_color {
		color: dodgerblue;
	}

	.el-card {
		background: #fff;
	}

	.el-card:hover {
		background: #F5F7FA;
	}

	.btn-info {
		border-color: #99CFFF;
		color: #3F9EFF;
		background: #E1F1FF;
	}
</style>
<style lang="less">
	.task-mgr {

		.el-tabs--card > .el-tabs__header {
			border: none;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__nav {
			border: none;
		}

		.el-tabs__nav-wrap {
			margin-bottom: 0;
		}

		.el-tabs__nav-wrap {
			margin-bottom: 0;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
			border: none;
		}
		.el-tabs--card>.el-tabs__header .el-tabs__item{
			border: none;
		}
		#tab-second,#tab-first{
			border: 1px solid #3F9EFF;
		}
	}

</style>

<!--header css需要处理-->
