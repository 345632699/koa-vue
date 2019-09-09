<template>
	<div class="page meeting-list">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item class="f20" :to="{ path: '/BusinessMgr/meeting/list' }">会议管理</el-breadcrumb-item>
					<!--<el-breadcrumb-item><a href="/">创建会议</a></el-breadcrumb-item>-->
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
				与会单位
				<el-select v-model="organization_id" class="element-select" style="width: 140px;padding: 5px; ">
					<el-option v-for="(item,idx) in organization_list" :key="idx" :label="item.name" :value="item.id"></el-option>
				</el-select>
				会议日期
				<el-date-picker
						v-model="datetime"
						value-format="yyyy-MM-dd"
						placeholder="请输入日期" style="width: 140px;padding-left: 5px;"></el-date-picker>
				<Search class="search" @search="onSearch"></Search>
				<el-button type="primary" class="confirm-btn" @click="() => this.$router.push('/BusinessMgr/meeting/create')">
					添加会议记录
				</el-button>
			</div>
		</div>
		<div class="container">
			<div class="list">
				<div class="item" v-for="meeting,index in meetingList" :key="index">
					<div class="item-header course" @click="detail(meeting.id)">
						<div class="title">
							{{ meeting.name }}
						</div>
						<div class="item-content" v-html="meeting.content">
						</div>
					</div>
					<div class="item-foot">
						<el-row>
							<el-col :span="6">
								会议日期：{{ new Date(meeting.time).toLocaleDateString() }}
							</el-col>
							<el-col :span="6">
								记录单位：{{ meeting.organization.name }}
							</el-col>
							<el-col :span="12">
								与会单位：<span v-for="organization,index in meeting.organizations"
													 :key="index">{{ organization.name }} </span>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'
  import Search from '../../../components/Search'

  export default {
    data () {
      return {
        organization_list: [],
        organization_id: '',
        datetime: '',
        meetingList: []
      }
    },
    components: {
      Search
    },
    methods: {
      detail (id) {
        this.$router.push('/BusinessMgr/meeting/detail?id=' + id)
      },
      async onSearch (keyword) {
        console.log(keyword)
        let params = {
          organization_id: this.organization_id,
          datetime: this.datetime,
          keyword: keyword
        }
        let meetRes = await axios.get('/api/getMeetingList', {params: params})
        this.meetingList = meetRes.data.data
      }
    },
    async mounted () {
      let res = await axios.get('/api/getTaskTypeList')
      let meetRes = await axios.get('/api/getMeetingList')
      let data = res.data.data[0]
      this.organization_list = data.OrganizationList
      this.meetingList = meetRes.data.data
    }
  }
</script>
<style scoped lang="less">
	@import "../../../assets/less/common";

	.meeting-list {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border: 10px solid #e4e8f1;
		.header-container {
			min-width: 980px;
		}
		.container {
			min-width: 980px;
			padding: 40px 30px;
			.list {
				.item {
					background: #F5F7FA;
					border-radius: 4px;
					margin-bottom: 10px;
					.item-header {
						padding: 30px 30px 20px 30px;
						.title {
							font-size: 16px;
							color: #3A434A;
							letter-spacing: -0.51px;
							font-weight: bold;
						}
						.item-content {
							margin-top: 10px;
							max-width: 100%;
							font-size: 14px;
							color: #555A67;
							letter-spacing: 0;
							line-height: 30px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
					}
					.item-foot {
						border-top: 1px solid #E4E8F1;
						padding: 12px 30px 15px 30px;
						font-size: 14px;
						color: #555A67;
						letter-spacing: 0;
						line-height: 30px;
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.meeting-list{
		.el-input__inner{
			height: 30px;
			line-height: 30px;
		}
		.el-input__icon{
			line-height: 30px;
		}
	}
</style>
