<template>
	<div class="page task-detail">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/TaskManager' }">任务管理</el-breadcrumb-item>
					<el-breadcrumb-item><a :href="nav.url">{{ nav.secondTitle }} </a></el-breadcrumb-item>
					<el-breadcrumb-item><a href="#">任务详情 </a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
			</div>
		</div>
		<div class="main">
			<div class="title">
				<el-checkbox
						v-model="task.status!==1?'':true"
						:disabled="task.status!==1?false:''"
						:label="task.name" @change="doneTask(task)">
				</el-checkbox>
			</div>
			<div class="middle-content">
				<div class="row">
					<div class="left">任务编号：</div>
					<div class="right">{{ task.task_num }}</div>
				</div>
				<div class="row">
					<div class="left">任务类型：</div>
					<div class="right">{{ task_type_name }}</div>
				</div>
				<div class="row">
					<div class="left">截止时间：</div>
					<div class="right">{{ time }}</div>
				</div>
				<div class="row">
					<div class="left">责任单位：</div>
					<div class="right">
						<span v-for="item,index in content.responsible_department_name" v-bind:key="index">
							{{ item.name }}
						</span>
					</div>
				</div>
				<div class="row" v-if="content.assisting_department.length > 0">
					<div class="left">协助单位：</div>
					<div class="right">
						<span v-for="item,index in content.assisting_department_name" v-bind:key="index">
							{{ item.name }}
						</span>
					</div>
				</div>
				<el-checkbox-group v-model="childTask">
					<div class="row" v-if="content.child_task_list.length > 0">
						<div class="left">子任务：</div>
						<div class="right">
							<div class="child-task" v-for="item,index in content.child_task_list" :key="index">
								<el-checkbox :label="item.name" @change="doneChildTask"></el-checkbox>
								<div class="foot el-row">
									<el-col :span="12">截止时间：{{ item.time }}</el-col>
									<el-col :span="12">责任单位：{{ item.responsible_department }}</el-col>
								</div>
							</div>
						</div>
					</div>
				</el-checkbox-group>
				<div class="row" v-if="content.target_area">
					<div class="left">目标新增面积：</div>
					<div class="right">{{ content.target_area }}平方米</div>
				</div>
				<div class="row" v-if="content.target_cahnge_number">
					<div class="left">目标改造数量：</div>
					<div class="right">{{ content.target_cahnge_number }}</div>
				</div>
				<div class="row progress el-row">
					<el-col :span="8" v-if="content.target_area">
						<el-col :span="14">
							<el-progress type="circle" :percentage="25"></el-progress>
						</el-col>
						<el-col class="main" :span="10">
							<div>
								<span class="undone"></span>
								<span>目标新增面积</span>
							</div>
							<div>
								<span class="done"></span>
								<span>已完成新增面积</span>
							</div>
						</el-col>
					</el-col>
					<el-col :span="8" v-if="content.target_cahnge_number">
						<el-col :span="14">
							<el-progress type="circle" :percentage="25"></el-progress>
						</el-col>
						<el-col class="main" :span="10">
							<div>
								<span class="undone"></span>
								<span>目标新增面积</span>
							</div>
							<div>
								<span class="done"></span>
								<span>已完成新增面积</span>
							</div>
						</el-col>
					</el-col>
				</div>
				<div class="row" v-if="content.implementation_plan">
					<div class="left">实施方案：</div>
					<div class="right">
						{{ content.implementation_plan }}
					</div>
				</div>
			</div>
			<div class="behavior-log">
				<div class="record-item">
					<div class="left">
						操作日志：
					</div>
					<div class="middle">
						<div class="log-record">
							<span>市宣传部上传了附件 <a href="">公众宣传活动策划方案.doc</a></span>
						</div>
					</div>
					<div class="right">
						<div class="log-record">
							<span>2017.09.30  09:21:54</span>
						</div>
					</div>
				</div>
				<div class="record-item">
					<div class="left">
					</div>
					<div class="middle">
						<div class="log-record">
							<span>市宣传部上传了附件 <a href="">公众宣传活动策划方案.doc</a></span>
						</div>
					</div>
					<div class="right">
						<div class="log-record">
							<span>2017.09.30  09:21:54</span>
						</div>
					</div>
				</div>
				<div class="record-item">
					<div class="left">
					</div>
					<div class="middle">
						<div class="log-record">
							<span>市宣传部上传了附件 <a href="">公众宣传活动策划方案.doc</a></span>
						</div>
					</div>
					<div class="right">
						<div class="log-record">
							<span>2017.09.30  09:21:54</span>
						</div>
					</div>
				</div>
				<div class="record-item">
					<div class="left">
					</div>
					<div class="middle">
						<div class="log-record">
							<span>市宣传部上传了附件 <a href="">公众宣传活动策划方案.doc</a></span>
						</div>
					</div>
					<div class="right">
						<div class="log-record">
							<span>2017.09.30  09:21:54</span>
						</div>
					</div>
				</div>
				<div class="record-item">
					<div class="left">
					</div>
					<div class="middle">
						<div class="log-record">
							<span>市宣传部上传了附件 <a href="">公众宣传活动策划方案.doc</a></span>
						</div>
					</div>
					<div class="right">
						<div class="log-record">
							<span>2017.09.30  09:21:54</span>
						</div>
					</div>
				</div>
			</div>
			<div class="page-foot">
				<el-button class="return-btn" @click="back">
					返回
				</el-button>
				<el-button class="confirm-btn" @click="edit">
					修改任务
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        checked: 'checked',
        childTask: [],
        task_id: '',
        task: {
        },
        content: {
          time: {
            options: []
          },
          child_task_list: [],
          file: [],
          assisting_department: [],
          responsible_department: []
        },
        additional_field_list: [],
        time: '',
        task_type_name: '',
        nav: {
          secondTitle: '',
          url: ''
        }
      }
    },
    methods: {
      doneChildTask (e) {
        let event = window.event
        let name = event.currentTarget.value
        if (e) {
          this.$notify({
            title: '成功',
            message: '完成子任务 ' + name,
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '提示',
            message: '取消完成子任务 ' + name
          })
        }
      },
      edit () {
        console.log(this.nav.url)
        this.$router.push({
          path: '/BusinessMgr/task/edit?task_id=' + this.task_id,
          query: {
            organization_name: this.nav.secondTitle,
            detail_url: '/BusinessMgr/task/detail?task_id=' + this.task_id,
            organization_url: this.nav.url
          }
        })
      },
      back () {
        this.$router.back()
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
            message: '已取消删除'
          })
        })
      }
    },
    async mounted () {
      console.log(this.$route.query)
      let taskId = this.$route.query.task_id
      this.task_id = taskId
      if (this.$route.query.task_type_id) {
        this.nav.secondTitle = this.$route.query.task_type_name
        this.nav.url = '/BusinessMgr/task/list?id=' + this.$route.query.task_type_id
      } else {
        this.nav.secondTitle = this.$route.query.organization_name
        this.nav.url = '/BusinessMgr/task/listAll?id=' + this.$route.query.organization_id
      }
      let params = {
        params: {
          task_id: taskId
        }
      }
      let res = await axios.get('/api/getTaskById', params)
      let content = res.data.data.content
      this.task = res.data.data
      this.content = content
      this.task_type_name = this.task.task_types.name
      this.additional_field_list = content.additional_fields
      let type = content.time.type ? content.time.type : 0
      this.time = content.time.value ? content.time.value : content.time.options[type].label
      console.log(this.additional_field_list)
    }
  }
</script>
<style lang="less" scoped>
	@import "../../../assets/less/common";

	.page {
		.page_content;
		.header-container;
		.main {
			max-width: 980px;
			.title {
				color: @titleColor;
				padding: 30px 30px 10px 30px;
			}
			.middle-content {
				padding: 10px 0 30px 60px;
				.row {
					margin-bottom: 20px;
					color: @textColor;
					padding-right: 30px;
					font-size: @normalFontSize;
					.left {
						display: inline-block;
						width: 100px;
						text-align: right;
						vertical-align: top;
						line-height: 20px;
					}
					.right {
						display: inline-block;
						width: 100%;
						margin-left: -100px;
						padding-left: 100px;
						line-height: 20px;
						.child-task {
							background: @textBgColor;
							padding: 20px;
							padding-bottom: 0;
							max-width: 500px;
							margin-bottom: 10px;
							.foot {
								.el-col {
									padding: 20px;
								}
							}
						}
					}
					&.progress {
						.canvas{
							padding-left: 20px;
						}
						span{
							display: inline-block;
							line-height: 25px;
						}
						.undone {
							display: inline-block;
							width: 14px;
							height: 14px;
							background: #E6EAF0;
							border: 1px solid #A8ACB5;
						}
						.done {
							display: inline-block;
							width: 14px;
							height: 14px;
							background: #3F9EFF;
							border-radius: 2px;
						}
						.main{
							transform: translateY(50%);
						}
					}
				}
			}
			.behavior-log {
				background: @textBgColor;
				margin: 0 30px 30px 30px;
				padding: 30px 0 30px 20px;
				color: @textColor;
				font-size: @normalFontSize;
				.left {
					display: inline-block;
					width: 100px;
					vertical-align: top;
					text-align: right;
					line-height: 20px;
				}
				.middle, .right {
					display: inline-block;
					margin-left: -100px;
					padding-left: 100px;
					line-height: 20px;
					.log-record {
						color: @textColor;
					}
					&.right {
						.log-record {
							padding-left: 200px;
						}
					}
					&.middle {
						a {
							color: @textHover;
						}
					}
				}
			}
			.page-foot{
				padding: 0 30px 30px 30px;
				.return{
					.return-btn;
				}
				.edit{
					.confirm-btn
				}
			}
		}
	}
</style>
<style lang="less">
	.task-detail {
		.main {
			.title {
				width: 100%;
				.el-checkbox__inner {
					width: 19px;
					height: 19px;
					&:after {
						height: 10px;
						left: 6px;
						width: 6px;
					}
				}
				.el-checkbox__input {
					line-height: 2;
				}
				.el-checkbox__label {
					display: inline;
					font-size: 20px;
					white-space: pre-wrap;
					line-height: 30px;
					text-align: justify;
				}
			}
		}
	}

</style>