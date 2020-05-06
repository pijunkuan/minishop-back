<template>
<div>
	<div class="table-header">
		<el-input placeholder="请输入" v-model="query.value" class="input-with-select">
		<el-select v-model="query.type" slot="prepend" placeholder="请选择">
			<el-option label="收件人" value="name"></el-option>
			<el-option label="订单号" value="no"></el-option>
			<el-option label="电话" value="mobile"></el-option>
		</el-select>
			<el-button slot="append" icon="el-icon-search" @click='search'></el-button>
		</el-input>
	</div>
	<el-table
		ref="orderTable"
		:data='orderData'
		v-loading='loading'
		header-row-class-name="table-header-row"
		border>
		<el-table-column prop="no" label="订单编号" width="130px" align="center"></el-table-column>
		<el-table-column prop="name" label="收件人"></el-table-column>
		<el-table-column prop="mobile" label="电话"></el-table-column>
		<el-table-column prop="address" label="地址"></el-table-column>
		<el-table-column prop="amount" label="订单总价"></el-table-column>
		<el-table-column prop="status_value" label="状态">
			<template slot-scope='scope'>
				<el-tag v-if="scope.row.status === 'pending'" type="warning" >{{scope.row.status_value}}</el-tag>
				<el-tag v-else-if="scope.row.status === 'processing'" type="primary">{{scope.row.status_value}}</el-tag>

				<el-tag v-else-if="scope.row.status === 'sent'" type="success" effect="dark">{{scope.row.status_value}}</el-tag>
				<el-tag v-else-if="scope.row.status === 'partial'" type="success">{{scope.row.status_value}}</el-tag>
				<el-tag v-else-if="scope.row.status === 'refunding'" type="danger" effect="dark">{{scope.row.status_value}}</el-tag>
				<el-tag v-else-if="scope.row.status === 'refunded'" type="danger">{{scope.row.status_value}}</el-tag>
				<el-tag v-else-if="scope.row.status === 'cancel' " type='info'>{{scope.row.status_value}}</el-tag>
				<el-tag v-else-if="scope.row.status === 'closed' " type='info'>{{scope.row.status_value}}</el-tag>
				<el-tag v-else-if="scope.row.status === 'success' " type='primary' effect="dark">{{scope.row.status_value}}</el-tag>
				<el-tag v-else type="info" effect="dark">{{scope.row.status_value}}</el-tag>

			</template>
		</el-table-column>
		<el-table-column prop="created_at" label="创建时间"></el-table-column>
		<el-table-column label="操作">
			<template slot-scope='scope'>
				<el-button size="mini" type="primary" @click="toDetail(scope.row.id)">处理</el-button>
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
	import {get_orders} from "@/api/order"

	export default {
		data(){
			return {
				orderData:[],
				loading:false,
				query:{
					type:"",
					value:"",
					page:1,
					pageSize:15
				},
				total:0
			}
		},
		methods:{
			getData(){
				this.loading = true
				get_orders(this.query).then(r=>{
					this.orderData = r.data.body.data
					this.total = r.data.body.page.total
					this.loading=false
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
			toDetail(id){
				this.$router.push({
					name:'OrderDetail',
					query:{
						id:id
					}
				})
			}
		},
		created(){
			this.getData()
		}
	}
</script>