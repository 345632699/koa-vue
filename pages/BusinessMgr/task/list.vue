<template>
	<div class="page task-list">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/TaskManager' }">任务管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="#">{{ task_type_name }}</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
				<search :search="onSearchList"></search>
				<el-button type="primary" class="confirm-btn">添加任务</el-button>
				<el-button type="primary" class="return-btn">导出报表</el-button>
			</div>
		</div>
		<div class="list-content">
			<div class="list-main" v-for="(item,index) in task_list" :key="index">
				<el-checkbox
						v-model="item.status!==1?'':true"
						:disabled="item.status!==1?false:''"
						@change="doneTask(item)">
				</el-checkbox>
				<span class="title course" @click="detail(item.id)">{{item.name}}</span>
				<el-row class="list-text">
					<el-col :sm="12" :md="6" :lg="6" :xs="12">
						任务编号： {{ item.task_num }}
					</el-col>
					<el-col :sm="12" :md="6" :lg="6" :xs="12">
						截止时间： {{ JSON.parse(item.content).time.type > 0 ? JSON.parse(item.content).time.value : "长期" }}
					</el-col>
					<el-col :sm="12" :md="6" :lg="6" :xs="12">
						责任单位：<span v-for="department,index in JSON.parse(item.content).responsible_department_name" :key="index">{{ department.name }} </span>
					</el-col>
					<el-col :sm="12" :md="6" :lg="6" :xs="12">
						协助单位： <span v-for="department,index in JSON.parse(item.content).assisting_department_name" :key="index">{{ department.name }} </span>
					</el-col>
				</el-row>
				<el-row class="list-attachment" v-if="JSON.parse(item.content).file.length > 0">
					<div class="left">
						附件:
					</div>
					<div class="right">
						<div class="attachment-pd" v-for="item,index in JSON.parse(item.content).file" :key="index">
							<a :href="'http://10.96.153.89:5000/' + item">{{ item.split('/').pop() }}</a>
							<i class="el-icon el-icon-view" @click="preview(item)"></i>
							<i class="el-icon el-icon-download"></i>
							<i class="el-icon el-icon-close"></i>
						</div>
					</div>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'
  import Search from '../../../components/Search'

  export default {
    data: function () {
      return {
        checkList: [],
        task_type_name: '',
        task_list: [],
        task_type_id: ''
      }
    },
    components: {
      Search
    },

    methods: {
      onSearchList (searchWord) {
        console.log(searchWord)
      },
      preview (item) {
        console.log(item)
        window.location.href = 'http://10.96.153.89:5000/' + item
      },
      doneTask (item) {
        this.$confirm('此操作将更改任务状态为完成, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = {
            task_id: item.id,
            status: 1
          }
          let res = await axios.post('/api/updateTaskStatus', params)
          if (!res.data.ret && res.data.data[0] > 0) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: res.data.errorMsg
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.errorMsg
            })
          }
          item.status = 1
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })
      },
      detail (id) {
        this.$router.push({path: '/BusinessMgr/task/detail',
          query: {
            task_id: id,
            task_type_id: this.task_type_id,
            task_type_name: this.task_type_name
          }})
      }
    },
    async mounted () {
      let taskTypeId = this.$route.query.id
      if (!taskTypeId) {
        this.$router.push('/BusinessMgr/TaskManager')
        return
      }
      let res = await axios.get('/api/getTaskList', {
        params: {
          task_type_id: taskTypeId
        }
      })
      if (res.data.ret) {
        this.$notify.error({
          title: '错误',
          message: '数据获取出错'
        })
      } else {
        let data = res.data.data
        this.task_type_name = data.name
        this.task_list = data.tasks
        this.task_type_id = data.id
      }
    }
  }
</script>
<style lang="less" scoped>
	@import "../../../assets/less/common";
	.page {
		.page_content;
		.header-container;
		.list-content {
			margin: 30px 0px;
			.list-title {
				color: @titleColor;
				font-size: @titleFontSize;
				padding: 30px 30px 10px 30px;
			}
			.list-main {
				background: @textBgColor;
				margin: 0px 30px 10px 30px;
				padding: 30px 20px 20px 20px;
				color: @textColor;
				.title{
					font-size: 14px;
					font-weight: bold;
					padding-left: 5px;
				}
				.list-text {
					color: @textColor;
					padding: 20px 0px 0px 25px;
				}
				.list-attachment {
					padding: 0px 0px 0px 25px;
					.left {
						float: left;
					}
					.right {
						float: left;
						padding-left: 10px;
						.attachment-pd {
							padding-bottom: 10px;
							a {
								color: @textHover;
								padding-right: 10px;
							}
							i {
								padding: 0 5px;
								color: #A8ACB5;
							}
						}
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.task-list {
		.el-col {
			padding-bottom: 10px;
		}
		.el-icon{
			cursor: pointer;
		}
	}
</style>