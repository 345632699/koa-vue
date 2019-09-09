<template>
	<div class="event">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/event/list' }">大事件管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="#">时间轴</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
				<Search></Search>
				<a href="/BusinessMgr/event/create">
					<el-button type="primary" class="confirm-btn">添加大事件</el-button>
				</a>
			</div>
		</div>
		<div class="year-time-line" v-for="item,key in list">
			<div class="time-line-icon">
				<el-icon class="el-icon-time"></el-icon>
			</div>
			<div class="year-title">
				{{key}}年
				<el-icon class="el-icon-caret-bottom"></el-icon>
			</div>
			<div class="year-list-item" v-for="v,k in item">
				<div class="date">
					<p class="day">{{ (new Date(v.publish_time).getMonth() + 1 ) +"."+new Date(v.publish_time).getDate() }}</p>
					<p class="year">{{ key }}</p>
				</div>
				<div class="event-content">
					<div class="title"><a :href="'/BusinessMgr/event/detail?event_id=' + v.id">{{ v.title }}</a></div>
					<div class="description">
						{{ v.content.replace(/<.*?>/g, "") }}
					</div>
					<div class="img_list">
						<img :src="src" v-for="src in v.imgList" alt="" style="width: 246px;height: 163px"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'
  import Search from '~/components/Search'

  export default {
    data () {
      return {
        list: {}
      }
    },
    components: {
      Search
    },
    async mounted () {
      let res = await axios.get('/api/getEventList')
      console.log(res.data.data)
      this.list = res.data.data
    }
  }
</script>
<style lang="less" scoped>
	@import "../../../assets/less/common";

	.event {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border: 10px solid #e4e8f1;
		.year-time-line {
			max-width: 980px;
			margin: 20px 20px 30px 20px;
			position: relative;
			color: #3F9EFF;
			&:before {
				content: "";
				width: 2px;
				height: 100%;
				top: 37px;
				bottom: 0;
				left: 127px;
				background: #3F9EFF;
				position: absolute;
			}
			.time-line-icon {
				position: absolute;
				font-size: 34.5px;
				top: 3px;
				left: 110px;
			}
			.year-title {
				font-size: 28px;
				padding-top: 5px;
				vertical-align: middle;
				color: #3A434A;
				.el-icon-caret-bottom {
					font-size: 12px;
					position: absolute;
					top: 16px;
				}
			}
			.year-list-item {
				position: relative;
				.date {
					position: absolute;
					left: 60px;
					text-align: right;
					.day {
						font-size: 20px;
						color: #3A434A;
						letter-spacing: 0;
					}
					.year {
						font-size: 14px;
						color: #555A67;
						letter-spacing: 0;
					}
				}
				.event-content {
					margin-left: 150px;
					margin-top: 50px;
					font-size: 20px;
					color: #3A434A;
					letter-spacing: 0;
					line-height: 30px;
					&:after {
						content: "";
						width: 12px;
						height: 12px;
						border-radius: 50%;
						position: absolute;
						left: 122px;
						top: 10px;
						border: 2px solid #3F9EFF;
						background: #ffffff;
						z-index: 10;
					}
					.img_list {
						img {
							margin-right: 30px;
						}
					}
					.title {
						font-size: 20px;
					}
					.description {
						font-size: 14px;
						color: #555A67;
						letter-spacing: 0;
						line-height: 24px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						margin-bottom: 19px;
					}
				}
			}
		}
		img {
			width: 232px;
			height: 163px;
		}
	}
</style>
<style lang="less">
	.event{
		.el-input__inner{
			height: 30px;
			line-height: 30px;
		}
		.el-input__icon{
			line-height: 30px;
		}
	}
</style>
