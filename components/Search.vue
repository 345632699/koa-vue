<template>
	<div class="search-container" :class="isActive ? 'focus' : ''">
		<el-input
				placeholder="搜索"
				class="search"
				v-model="searchWord"
				@keyup.enter.native="onSearch">
			<i slot="suffix" @click="onSearch" class="el-input__icon el-icon-search"></i>
		</el-input>
	</div>
</template>

<script>
	export default {
	  data: function () {
	    return {
	      searchWord: '',
	      isActive: false
	    }
	  },
	  methods: {
	    inDiv (event) {
	      this.isActive = true
	    },
	    onSearch () {
	      this.$emit('search', this.searchWord)
	    },
	    outDiv (event) {
	      this.isActive = false
	    }
	  },
	  created () {

	  }
	}
</script>

<style lang="less">
	.search-container{
		display: inline-block;
		padding: 0 10px;
		.el-icon-search{
			cursor: pointer;
		}
	}


</style>