<template>
<div>
	<div class="table-header">
		<el-input placeholder="请输入商品名称搜索" v-model="query.name" class="input-with-select">
			<el-button slot="append" icon="el-icon-search" @click='search'></el-button>
		</el-input>
		<div class="table-header-button">
			<el-button type="primary" size="small" @click="visibleGroup">批量上下架</el-button>
			<el-button type="primary" size="small" @click="deleteGroup">批量删除</el-button>
		</div>
	</div>
	<el-table
		ref="itemTable"
		:data='data'
		v-loading='loading'
		header-row-class-name="table-header-row"
		@selection-change="handleSelect"
		border>
		<el-table-column type="selection" align="center"></el-table-column>
		<el-table-column prop="img" label="图片" width="130px" align="center">
			<template slot-scope="scope">
				<el-image style="width:100px;height:100px;" :src="scope.row.img" fit="scale-down"></el-image>
			</template>
		</el-table-column>
		<el-table-column label="商品名称">
			<div slot-scope="scope" style="cursor:pointer" @click="toItem(scope.row)">{{ scope.row.product_title }}</div>
		</el-table-column>
		<el-table-column prop="price" label="售价" width="120px"></el-table-column>
		<el-table-column prop="on_sale" label="上架" width="70px">
			<template slot-scope='scope'>
				<el-tag v-if="scope.row.on_sale" type="success">上架</el-tag>
				<el-tag v-else type="info">下架</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="操作" width="145px">
			<template slot-scope="scope">
				<el-button size="mini" type="primary" @click="toEdit(scope.row)">编辑</el-button>
				<el-button size="mini" type="danger" @click="toDelete(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination
		style="text-align:center;margin-top:40px"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="query.page"
		:page-sizes="[15, 30, 50, 100]"
		:page-size="query.pageSize"
		layout="total, sizes, prev, pager, next, jumper"
		:total="total">
    </el-pagination>
    <progress-bar :Visible="progressShow" :Title="progressTitle" :Index="index" :Total="selected.length"></progress-bar>
</div>
</template>

<script>
	import { get_products, delete_product, edit_product } from '@/api/product'
	import ProgressBar from '@/components/ProgressBar'
	export default {
		components:{
			ProgressBar
		},
		data(){
			return {
				data:null,
				query:{
					name:null,
					page:1,
					pageSize:15
				},
				name:"",
				total:0,
				selected:[],
				loading:false,
				progressShow:false,
				progressTitle:'',
				index:0,
				error:0
			}
		},
		created(){
			this.getData()
		},
		methods:{
			getData(){
				this.loading = true
				get_products(this.query).then(r=>{
					this.data = r.data.body.data
					this.total = r.data.body.page.total
					this.loading = false
				}).catch(()=>{
					this.loading = false
				})
			},
			handleSizeChange(val){
				this.query.pageSize = val
				this.query.page = 1
				this.getData()
			},
			handleCurrentChange(val){
				this.query.page = val
				this.getData()
			},
			search(){
				this.query.page = 1
				this.getData()
			},
			handleSelect(val){
				this.selected = val
			},
			toItem(row){
				this.$router.push({name:'ProductItem',query:{id:row.id}})
			},
			toEdit(row){
				this.$router.push({name:'ProductItem',query:{id:row.id}})
			},
			toDelete(row){
				this.$confirm('删除后无法找回，是否继续？','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消'
				}).then(()=>{
					delete_product(row.id).then(()=>{
						this.$message.success('已成功删除')
						this.getData()
					}).catch(()=>{})
				}).catch(()=>{})
			},
			visibleGroup(){
				if (this.selected.length === 0) {
					this.$message.warning('请先选择商品')
					return
				}
				this.progressShow = true
				this.progressTitle = '批量上下架'
				this.index = 0
				this.error = 0
				this.confirmVisible()
			},
			confirmVisible(){
				if(this.index === this.selected.length){
					setTimeout(()=>{
						this.progressShow = false
						this.progressTitle = ''
						this.index = 0
						this.selected = []
						this.$refs.itemTable.clearSelection()
						this.getData()
						if(this.error !== 0){
							this.$message.warning({
								message: this.error + '个商品未能成功修改，请稍后重试',
								duration:2000
							})
						}else{
							this.$message.success('已成功修改')
						}
					},1000)
					return
				}
				let _item = this.selected[this.index]
				let _data = {
					product:{
						on_sale: _item.on_sale ? 0 : 1
					}
				}
				edit_product(_data,_item.id).then(()=>{
					this.index += 1
					setTimeout(()=>{
						this.confirmVisible()
					},100)
				}).catch(()=>{
					this.index += 1
					this.error += 1
					setTimeout(()=>{
						this.confirmVisible()
					},100)
				})
			},
			deleteGroup(){
				if(this.selected.length === 0){
					this.$message.warning('请先选择商品')
					return
				}
				this.progressShow = true
				this.progressTitle = '批量删除'
				this.index = 0
				this.error = 0
				this.confirmDelete()
			},
			confirmDelete(){
				if(this.index === this.selected.length){
					setTimeout(()=>{
						this.progressShow = false
						this.progressTitle = ''
						this.index = 0
						this.selected = []
						this.$refs.itemTable.clearSelection()
						this.getData()
						if(this.error !== 0){
							this.$message.warning({
								message: this.error + '个商品未能成功删除，请稍后重试',
								duration:2000
							})
						}else{
							this.$message.success('已成功删除')
						}
					},1000)
					return
				}
				let _item = this.selected[this.index]
				delete_product(_item.id).then(()=>{
					this.index += 1
					setTimeout(()=>{
						this.confirmDelete()
					},100)
				}).catch(()=>{
					this.index += 1
					this.error += 1
					setTimeout(()=>{
						this.confirmDelete()
					},100)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.table-header{
	margin-bottom:20px;
}
.table-header-button{
	margin-top:20px;
}
</style>
<style lang="scss">
@import '@/assets/style/base.scss';
.el-table tr.table-header-row th{
	background-color:$background-color;
}
</style>