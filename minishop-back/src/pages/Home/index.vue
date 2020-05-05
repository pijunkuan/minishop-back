<template>
<div>
	<el-button @click="Logout">登出</el-button>

</div>
</template>

<script>
	
	export default {
		methods:{
			Logout(){
				this.$store.dispatch('logout')
			}
		}
	}
</script>