<template>
<div>
	<div class="dashboard-contain">
		<div class="dashboard-1">
			<div class="dashboard-title">
				经营数据
			</div>
			<div class="dashboard-1-data">
				<div>
					<div>{{order.processing_count}}</div>
					<div>待配送订单</div>
					<div><el-button type="text">查看</el-button></div>
				</div>
				<div>
					<div>{{order.day_new_order_suc_amount}}</div>
					<div>今日总金额</div>
					<div>昨日订单金额:{{order.yesterday_order_suc_amount}}</div>
				</div>
				<div>
					<div>{{order.day_new_order_count}}</div>
					<div>今日订单数</div>
					<div>昨日订单数:{{order.yesterday_order_count}}</div>
				</div>
				<div>
					<div>{{customer.today_customer_count}}</div>
					<div>今日新增顾客</div>
					<div>昨日增加顾客:{{customer.yesterday_customer_count}}</div>
				</div>
				<div>
					<div>{{order.refunding_count}}</div>
					<div>退款中</div>
					<div><el-button type="text">查看</el-button></div>
				</div>
			</div>
		</div>
		<div class="dashboard-2">
			<div class="image-info">
				图片资源，占位
			</div>
			<div class="order-line">
				订单曲线图，占位
			</div>
		</div>
	</div>
	<div class="ad-contain">
		广告占位
	</div>
</div>
</template>

<script>
import { get_static_data } from "@/api/dashboard.js"
export default {
	data(){
		return {
			order:{
				processing_count:0,
				refunding_count:0,
				day_new_order_count:0,
				day_new_order_suc_amount:0,
				yesterday_order_count:0,
				yesterday_order_amount:0,
				yesterday_order_suc_amount:0,
				yesterday_order_rate:0,
			},
			customer:{
				today_customer_count:0,
				yesterday_customer_count:0,
				week_customer_count:0
			},
			image:{
				bytes:0,
				bytes_value:"",
				count:0
			},
			order_line:{
				today:[],
				yesterday:[]
			}
		}
	},
	methods:{
		getOrder(){
			get_static_data("order").then(r=>{
				let _data = r.data.body
				this.order = {
					processing_count:_data.processing_count * 1.00,
					refunding_count:_data.refunding_count * 1.00,
					day_new_order_count:_data.day_new_order_count * 1.00,
					day_new_order_suc_amount:_data.day_new_order_suc_amount * 1.00,
					yesterday_order_count:_data.yesterday_order_count * 1.00,
					yesterday_order_amount:_data.yesterday_order_amount * 1.00,
					yesterday_order_suc_amount:_data.yesterday_order_suc_amount * 1.00,
					yesterday_order_rate:_data.yesterday_order_rate * 1.00,
				}
			})
		},
		getCustomer(){
			get_static_data("customer").then(r=>{
				let _data = r.data.body
				this.customer = {
					today_customer_count:_data.today_customer_count  * 1.00,
					yesterday_customer_count:_data.yesterday_customer_count  * 1.00,
					week_customer_count:_data.week_customer_count  * 1.00
				}
			})
		},
		getImage(){
			get_static_data("image").then(r=>{
				let _data = r.data.body
				this.image = {
					bytes:_data.bytes * 1.00,
					bytes_value:_data.bytes_value,
					count:_data.count * 1.00
				}
			})
		},
		getOrderLine(){
			get_static_data("order_line").then(r=>{
				let _data = r.data.body
				this.order_line = {
					today:_data.today,
					yesterday:_data.yesterday
				}
			})
		}
	},
	created(){
		this.getOrder()
		this.getImage()
		this.getCustomer()
		this.getOrderLine()
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';

.dashboard-contain {
	display: inline-block;
	width : 80%;
	vertical-align: top;
}
.ad-contain {
	display: inline-block;
	width: 19%;
	height:550px;
	vertical-align: top;
	background-color: #f9f;
}
.dashboard-1 {
	margin-top: 10px;
	width: 95%;
	height: 200px;
	border-radius: 15px;
}
.dashboard-title{
	
	height:40px;
	line-height: 40px;
	padding:10px 0 0 15px;
	border-bottom:1px solid $line-color;
	margin-bottom: 15px;
}
.dashboard-1-data {
	text-align: center;
}
.dashboard-1 .dashboard-1-data>div {
	display: inline-block;
	width: calc(20% - 40px);
	height:80px;
	margin-right: 15px;
	padding: 10px;
	border: 1px solid $line-color;
	border-radius: 5px;
	color:$main-font-color;
	font-size: $large-font-size;
	vertical-align: top;
}
.dashboard-2>div {
	display: inline-block;
	width: 100%;
}

.dashboard-2 .image-info {
	background-color: #0f0;
	width: 30%;
	height:300px;
	margin-right:15px;
	padding:10px;
}

.dashboard-2 .order-line {
	background-color: #ff2;
	width: calc(60% - 20px);
	height:300px;
	padding: 10px;
}
</style>