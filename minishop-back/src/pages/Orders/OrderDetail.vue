<template>
<div>
	订单编号：{{no}}
	<div>
		<el-tag v-if="status === 'pending'" type="warning" effect="dark">{{status_value}}</el-tag>
		<el-tag v-else-if="status === 'sent'" type="success" effect="dark">{{status_value}}</el-tag>
		<el-tag v-else-if="status === 'proccessing'" type="primary" effect="dark">{{status_value}}</el-tag>
		<el-tag v-else-if="status === 'refunding'" type="danger" effect="dark">{{status_value}}</el-tag>
		<el-tag v-else type="info" effect="dark">{{status_value}}</el-tag>
	</div>
	<div>
		<div>客户信息</div>
		<div>用户名：{{customer.username}}</div>
		<div>手机号：{{customer.mobile}}</div>
	</div>
	<div>
		<div>收件信息</div>
		<div>姓名：{{address.name}}</div>
		<div>地址：{{address.address}}</div>
		<div>电话：{{address.mobile}}</div>
	</div>
	<div>
		<div>商品详情</div>
		<div v-for="(item , index) in items" :key='index'>
			<div>
				<el-image :src="item.img_url" style="width: 60px;height: 60px" fit="contain"></el-image>
			</div>
			<div>
				商品名：{{item.product_title}}
			</div>
			<div>
				规格：{{item.variant_title}}
			</div>
			<div>
				数量：x {{item.quantity}} {{item.product_unit}} (已发货：{{item.ship_quantity}} {{item.product_unit}})
			</div>
			<div>
				总计：¥ {{item.total}}
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import {get_order} from "@/api/order"
	export default {
		data(){
			return {
				no:null,
				customer:{},
				items:{},
				payments:{},
				address:{},
				items_amount:null,
				discounts_amount:null,
				shipments_amount:null,
				amount:null,
				ori_amount:null,

				status:null,
				status_value:null,

				refund_at:null,
				refund_status:null,
				refund_status_value:null,
				
				remark:null,
				send_at:null,
				pay_at:null,
				success_at:null,
				created_at:null,


			}
		},
		methods:{
			getData(){
				get_order(this.$route.query.id).then(r=>{
					let _data = r.data.body
					this.no = _data.no
					this.customer = _data.customer
					this.items = _data.items
					this.payments = _data.payments
					this.address = _data.address
					this.items_amount = _data.items_amount
					this.discounts_amount = _data.discounts_amount
					this.shipments_amount = _data.shipments_amount
					this.amount = _data.amount
					this.ori_amount = _data.ori_amount
					this.status = _data.status
					this.status_value = _data.status_value
					this.refund_status = _data.refund_status
					this.refund_status_value = _data.refund_status_value
					this.refund_at = _data.refund_at
					this.remark = _data.remark
					this.send_at = _data.send_at
					this.pay_at = _data.pay_at
					this.success_at = _data.success_at
					this.created_at = _data.created_at
				})
			}
		},
		created(){
			if(this.$route.query.id){
				this.getData()
			}else{
				this.$message.warning('参数错误')
				this.$router.push({
					name:'OrderList'
				})
			}
		}
	}
</script>