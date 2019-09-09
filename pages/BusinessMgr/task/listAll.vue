<template>
	<div class="page task-list">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/TaskManager' }">任务管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="#">{{organization_name}}</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
				<search></search>
				<el-button type="primary" @click="create" class="confirm-btn">添加任务</el-button>
				<el-button type="primary" class="return-btn">导出报表</el-button>
			</div>
		</div>
		<div v-for="item,index in task_list" :key="index">
			<div class="list-content" v-if="item">
				<div class="list-title">
					{{ item.name }}
				</div>
				<div class="list-main" v-for="task,taskIndex in item.list" :key="taskIndex" >
					<el-checkbox
							v-model="task.status!==1?'':true"
							:disabled="task.status!==1?false:''"
							 @change="doneTask(task)">
					</el-checkbox>
					<span class="title course" @click="detail(task.id)">{{task.name}}</span>
					<el-row class="list-text">
						<el-col :sm="12" :md="6" :lg="6" :xs="12">
							任务编号： {{ task.task_num }}
						</el-col>
						<el-col :sm="12" :md="6" :lg="6" :xs="12">
							截止时间： {{ JSON.parse(task.content).time.type > 0 ? JSON.parse(task.content).time.value : "长期" }}
						</el-col>
						<el-col :sm="12" :md="6" :lg="6" :xs="12">
							责任单位：<span v-for="department,index in JSON.parse(task.content).responsible_department_name" :key="index">{{ department.name }} </span>
						</el-col>
						<el-col :sm="12" :md="6" :lg="6" :xs="12">
							协助单位： <span v-for="department,index in JSON.parse(task.content).assisting_department_name" :key="index">{{ department.name }} </span>
						</el-col>
					</el-row>
					<el-row class="list-attachment" v-if="JSON.parse(task.content).file.length > 0">
						<div class="left">
							附件:
						</div>
						<div class="right">
							<div class="attachment-pd" v-for="item,index in JSON.parse(task.content).file" :key="index">
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
	</div>
</template>
<script>
  import axios from '~/plugins/axios'
  import search from '../../../components/Search'

  export default {
    data: function () {
      return {
        checked: '',
        organization_name: '加载中',
        task_list: [],
        sub_title: '',
        organization_id: ''
      }
    },
    components: {
      search
    },

    methods: {
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
            organization_id: this.organization_id,
            organization_name: this.organization_name
          }})
      },
      preview (item) {
        console.log(item)
        window.location.href = 'http://10.96.153.89:5000/' + item
      },
      create () {
        this.$router.push('/BusinessMgr/task/create')
      }
    },

    async mounted () {
      let organizationId = this.$route.query.id
      this.organization_id = organizationId
      if (!organizationId) {
        this.$router.push('/BusinessMgr/TaskManager')
        return
      }
      let res = await axios.get('/api/getTaskList', {
        params: {
          organization_id: organizationId
        }
      })
      if (res.data.ret) {
        this.$notify.error({
          title: '错误',
          message: '数据获取出错'
        })
      } else {
        let data = res.data.data
        this.organization_name = data.name + '的任务列表'
        this.task_list = data.task_list
      }
    }
  }
</script>
<style lang="less" scoped>
	@import "../../../assets/less/common";
	.page {
		.page_content;
		.header-container;
		.list-content{
			.list-title{
				color:@titleColor;
				font-size: @titleFontSize;
				padding: 30px 30px 10px 30px;
			}
			.list-main{
				background: @textBgColor;
				margin: 0px 30px 10px 30px;
				padding: 30px  20px 20px  20px;
				color: @textColor;
				.title{
					font-size: 14px;
					font-weight: bold;
					padding-left: 5px;
				}
				.list-text{
					color: @textColor;
					padding: 20px 0px 0px 25px;
				}
				.list-attachment{
					padding: 0px 0px 00px 25px;
					.left{
						float: left;
					}
					.right{
						float: left;
						padding-left: 10px;
						.attachment-pd{
							padding-bottom: 10px;
							a{
								color: @textHover;
								padding-right: 10px;
							}
							i{
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
	.task-list{
		.el-col{
			padding-bottom: 10px;
		}
	}
</style>