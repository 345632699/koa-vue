<template>
	<div class="event-detail">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/event/list' }">大事件管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="#">{{ event.title }}</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
		</div>
		<div class="main">
			<div class="title">
				{{ event.title }}
			</div>
			<div class="publish_time">
				{{ new Date(event.publish_time).toLocaleDateString() }}
			</div>
			<div class="content" v-html="event.content"></div>
		</div>
		<div class="foot">
			<el-button class="return-btn" @click="() => {this.$router.back()}">返回</el-button>
			<a :href="'/BusinessMgr/event/edit?event_id=' + event.id">
				<el-button type="primary" class="confirm-btn">修改</el-button>
			</a>
		</div>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        event: {}
      }
    },
    async mounted () {
      let eventId = this.$route.query.event_id
      let params = {
        event_id: eventId
      }
      let res = await axios.get('/api/getEvemtDetail', {params: params})
      console.log(res.data.data)
      this.event = res.data.data
    }
  }
</script>
<style lang="less" scoped>
	@import "../../../assets/less/common";
	.event-detail {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border: 10px solid #e4e8f1;
		.main{
			padding: 30px;
			.title{
				margin: auto;
				font-size: 20px;
				color: #3A434A;
				letter-spacing: 0;
				text-align: center;
			}
			.publish_time{
				font-size: 14px;
				color: #555A67;
				letter-spacing: 0;
				line-height: 30px;
				text-align: center;
				margin-bottom: 50px;
			}
			.content{
				margin: auto;
				max-width: 980px;
				line-height:200%;
			}
		}
		.foot{
			margin: 30px;
			button{
				margin-right: 20px;
			}
		}
	}
	img{
		max-width: 980px;
	}
</style>
<style lang="less">
	.event-detail{
		* {
			max-width: 100%;
		}
	}
</style>