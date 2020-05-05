<template>
<div>
	<div style="margin-top: 15px;">
		<el-input placeholder="商品名称" v-model="query.name" class="input-with-select">
			<el-button slot="append" icon="el-icon-search" @click='search'></el-button>
		</el-input>
	</div>
	<el-table :data='data' style = "width:100%">
		<el-table-column prop="img" label="图片">
			<template slot-scope="scope">
				<el-image style="width:100px;height:100px;" :src="scope.row.img" fit="contain"></el-image>
			</template>
		</el-table-column>
		<el-table-column prop="product_title" label="商品名称"></el-table-column>
		<el-table-column prop="price" label="售价"></el-table-column>
		<el-table-column prop="on_sale" label="是否上架">
			<template slot-scope='scope'>
				<el-tag v-if="scope.row.on_sale" type="success">上架</el-tag>
				<el-tag v-else type="info">下架</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template>
				<el-button size="mini" type="primary">编辑</el-button>
				<el-button size="mini" type="danger">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination
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
	import {productsGet} from '@/api/product'

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
				total:0
			}
		},
		methods:{
			getData(){
				productsGet(this.query).then(r=>{
					this.data = r.data.body.data
					this.total = r.data.body.page.total
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
			}
		},
		created(){
			this.getData()
		}
	}
</script>