<template>
<div>
	<el-form ref="login" :model="user" :rules="rules">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="user.username" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="user.password" placeholder="密码" type="password"></el-input>
		</el-form-item>
	</el-form>
	<div>
		<el-button type="primary" @click="Login" round>登录</el-button>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return{
			user:{
                username:"",
				password:""
			},
			rules:{
				username:[
					{required:true, message:'请填写用户名', trigger:'blur'}
				],
				password:[
					{required:true,message:'请填写密码',trigger:'blur'},
					{min:6,message:'密码至少6位',trigger:'blur'}
				]
			}
			
		}
	},
	methods:{
		Login(){
			this.$store.dispatch('login',this.user).then(()=>{
                this.$router.push('/dashboard')                
			})
		}
	}
}
</script>