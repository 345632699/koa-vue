<template>
	<div class="page meeting-detail">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/meeting/list' }">会议管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">创建会议</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
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
        organization_name: '',
        datetime: ''
      }
    },
    components: {
      Search
    },
    methods: {},
    async mounted () {
      let res = await axios.get('/api/getTaskTypeList')
      let data = res.data.data[0]
      this.organization_list = data.OrganizationList
    }
  }
</script>
<style scoped lang="less">
	@import "../../../assets/less/common";

	.meeting-detail{
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border: 10px solid #e4e8f1;
		.header-container{
			min-width: 980px;
		}
	}
</style>
