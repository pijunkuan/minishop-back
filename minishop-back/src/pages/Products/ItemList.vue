<template>
<div>
	<div class="table-header">
		<el-input placeholder="请输入商品名称搜索" v-model="query.name" class="input-with-select">
			<el-button slot="append" icon="el-icon-search" @click='search'></el-button>
		</el-input>
		<div class="table-header-button">
			<el-button type="primary" size="small">批量上下架</el-button>
			<el-button type="primary" size="small">批量删除</el-button>
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
				<el-image style="width:100px;height:100px;" :src="scope.row.img" fit="cover"></el-image>
			</template>
		</el-table-column>
		<el-table-column prop="product_title" label="商品名称"></el-table-column>
		<el-table-column prop="price" label="售价"></el-table-column>
		<el-table-column prop="on_sale" label="上架">
			<template slot-scope='scope'>
				<el-tag v-if="scope.row.on_sale" type="success">上架</el-tag>
				<el-tag v-else type="info">下架</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="操作">
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
</div>
</template>

<script>
	import { get_products, delete_product } from '@/api/product'

	export default {
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
				loading:false
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