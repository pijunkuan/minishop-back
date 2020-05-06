<template>
<div>
	<div class="image-button">
		<el-upload class="avatar-uploader upload-btn"
            :headers="{'Authorization': 'Bearer ' + $store.getters.token}"
            action="http://test.tvbeu.info/api/admin/image"
            name="file"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :on-success="successUpload">
            <el-button type="primary" size="small">新增图片</el-button>
        </el-upload>
	</div>
	<div v-loading="loading" style="min-height:500px">
		<div v-for="(image , index) in images" :key="index" class="image-list-item" style="position:relative" @mouseenter="activeIndex = index" @mouseleave="activeIndex = null"> 
			<div class="image-edit-button" :class="{'is-active':activeIndex === index}">
                <span style="width:20px;padding-right:5px;text-align:right;cursor:pointer" @click="imgDelete(image)"><i class="iconfont iconshanchu1"></i></span>
            </div>
			<el-image class="image-content" style="width:180px;height:180px" :src="image.url" fit="scale-down"></el-image>
			<div>{{image.name}}</div>
		</div>
		<el-pagination
			style="text-align:center;margin-top:20px;"
			:current-page="query.page"
			:page-size="query.pageSize"
			:total="total"
			layout="total, prev, pager, next, jumper"
			@current-change="handleCurrentChange">
		</el-pagination>
	</div>
</div>
</template>

<script>
	import { get_images, delete_image } from "@/api/image"
	export default {
		data(){
			return {
				loading:false,
				images:[],
				query:{
					page:1,
					pageSize:15
				},
				total:0,
				activeIndex:null
			}
		},
		created(){
			this.getData()
		},
		methods:{
			getData(){
				this.loading = true
				get_images(this.query).then(r=>{
					this.images = r.data.body.data
					this.total = r.data.body.page.total
					this.loading = false
				}).catch(()=>{
					this.loading = false
				})
			},
			handleCurrentChange(pagination){
				this.query.page = pagination
				this.getData()
			},
			beforeUpload(file){
				const isJPG = file.type === 'image/jpeg'
				const isLt2M = file.size / 1024 / 1024 < 2

				if (!isJPG) {
					this.$message.error('上传图片只能是 JPG 格式!')
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!')
				}
				return isJPG && isLt2M
			},
			successUpload(){
				this.$message.success('上传成功')
				this.getData()
			},
			imgDelete(image){
				this.$confirm('是否确认删除？','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消'
				}).then(()=>{
					delete_image(image.id).then(()=>{
						this.$message.success('已成功删除')
						this.getData()
					}).catch(()=>{})
				}).catch(()=>{})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.image-button{
	margin:10px 0 20px;
	padding-bottom:10px;
	border-bottom:1px solid $line-color;
}
.image-list-item{
	display:inline-block;
	width:180px;
	height:230px;
	vertical-align:middle;
	margin-right:10px;
	margin-bottom:10px;
	text-align:center;
}
.image-list-item>div.image-content{
	height:180px;
	width:180px;
	border:1px solid $line-color;
}
.image-edit-button{
    position:absolute;
    margin-top:161px;
    height:30px;
    width:182px;
    line-height:30px;
    z-index:2;
    background-color:rgba(0,0,0,0.5);
    opacity:0;
    color:#fff;
}
.image-edit-button.is-active{
    transition:all .2s ease-in;
    transform:translateY(-10px);
    opacity:1;
}
</style>