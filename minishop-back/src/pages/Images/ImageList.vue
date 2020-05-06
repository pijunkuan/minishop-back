<template>
<div>
	<div>
		<div style="width: 120px" v-for="(image , index) in images" :key="index">
			<el-image style="width: 120px;height: 120px" :src="image.url" fit="contain"></el-image>
			<div>{{image.name}}</div>
		</div>
	</div>
</div>
</template>

<script>
	import { get_images } from "@/api/image"
	export default {
		data(){
			return {
				images:[],
				query:{
					page:1,
					pageSize:15
				}
			}
		},
		methods:{
			getData(){
				get_images(this.query).then(r=>{
					this.images = r.data.body.data
					console.log(this.images)
				})
			}
		},
		created(){
			this.getData()
		}
	}
</script>