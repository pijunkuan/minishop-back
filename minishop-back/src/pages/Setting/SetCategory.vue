<template>
<div>
	<div class="category-main-title">
		<strong style="margin-right: 15px">分类设置</strong>
		<el-button type="primary" size="mini" circle plain @click="createCategory"><i class="iconfont iconjiahao"></i></el-button>
		<span class="category-sub-des">已创建：{{categoryData.length}} 个 / 可新建： {{20 - categoryData.length}}个</span>
	</div>
	<el-table :data="categoryData" v-loading="tableLoading" border header-row-class-name="table-header-row">
		<el-table-column label="分类名称" prop="category_title"></el-table-column>
		<el-table-column label="是否启用">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.visibility" type="success" size="mini">启用</el-tag>
				<el-tag v-else type="warning" size="mini">停用</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button size="mini" type="primary" round @click="editDialog(scope.row)">编辑</el-button>
				<el-button v-if="!scope.row.visibility" size="mini" type="success" round @click="changeVisi(scope.row)">启用</el-button>
				<el-button v-else size="mini" type="warning" round @click="changeVisi(scope.row)">停用</el-button>
				<el-button size="mini" type="danger" round @click="deleteRow(scope.row.id)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-dialog :title="title" :visible.sync="dialogVisibility">
		<el-form label-width="100px" class="dialog-edit">
			<el-form-item label="分类名称">
				<el-input v-model="dialogData.category_title"></el-input>
			</el-form-item>
			<el-form-item label="是否启用">
				<el-switch 
				v-model="dialogData.visibility"
				active-color="#13ce66"
				inactive-color="#ff4949"
				active-text="启用"
				inactive-text="停用">		
				</el-switch>
			</el-form-item>
		</el-form>
		<div style="text-align: right;">
			<el-button @click="dialogVisibility = false" size="mini">关闭</el-button>
			<el-button v-if="dialogId" size="mini" type="primary" @click="update">更新</el-button>
			<el-button v-else size="mini" type="primary" @click="creat">新增</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
import {get_categories,update_categories,create_categories,delete_categories} from "@/api/category"
	export default {
		data(){
			return {
				categoryData:[],
				tableLoading:true,
				title:null,
				dialogVisibility:false,
				dialogId:null,
				dialogData:{}
			}
		},
		methods:{
			getData(){
				this.tableLoading = true
				get_categories().then(r=>{
					let _data = r.data.body
					this.categoryData = _data
					this.tableLoading=false
				}).catch(()=>{
					this.tableLoading=false
				})
			},
			editDialog(row){
				this.title="编辑"
				this.dialogId = row.id
				this.dialogData = {
					category_title : row.category_title,
					visibility : row.visibility
				}
				this.dialogVisibility = true
			},
			createCategory(){
				if(this.categoryData.length >= 20){
					this.$message.warning('最多只能添加20个分类')
					return
				}
				this.title="新增"
				this.dialogId = null
				this.dialogData = {
					category_title : null,
					visibility : true
				}
				this.dialogVisibility = true
			},
			update(){
				update_categories(this.dialogId,this.dialogData).then(()=>{
					this.$message.success('更新成功')
					this.dialogVisibility = false
					this.getData()
				}).catch(e=>{
					this.$message.error(e.response.data.message)
				})
			},
			creat(){
				create_categories(this.dialogData).then(()=>{
					this.$message.success('创建成功')
					this.dialogVisibility = false
					this.getData()
				}).catch(e=>{
					this.$message.error(e.response.data.message)
				})
			},
			changeVisi(row){
				update_categories(row.id,{
					visibility:!row.visibility,
				}).then(()=>{
					this.$message.success('更新成功')
					this.getData()
				}).catch(e=>{
					this.$message.error(e.response.data.message)
				})
			},
			deleteRow(id){
				this.$confirm('此操作将永久删除该模板，是否继续？','提示',{
					confirmButtonText:'删除',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					delete_categories(id).then(()=>{
						this.$message.success('删除成功!')
						this.getData()
					}).catch(e=>{
						if(e.response.data.message){
							this.$message.error(e.response.data.message)
						}else{
							this.$message.error('删除失败')
						}
					})
				}).catch(()=>{
					this.$message.info('已取消删除')
				})
			},
		},
		created(){
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.category-main-title {
	font-size: $large-font-size;
	color: $main-font-color;
	margin: 20px 10px;
}
.category-sub-des {
	font-size: $small-font-size;
	color: $sub-font-color;
	margin-left:10px;
}
.dialog-edit .el-input {
	width: 250px
}
</style>
<style lang="scss">
@import '@/assets/style/base.scss';
.el-table tr.table-header-row th{
	background-color:$background-color;
}
</style>