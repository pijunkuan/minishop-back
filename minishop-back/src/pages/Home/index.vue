<template>
<div>
	<div class="dashboard-contain">
		<div class="dashboard-1">
			<div class="dashboard-title">
				<strong>经营数据</strong>
			</div>
			<div class="dashboard-1-data">
				<div>
					<div class="data-card-title-1"><strong style="color:#E6A23C">{{order.processing_count}}</strong></div>
					<div class="data-card-title-2">待配送订单</div>
					<div class="data-card-title-3"><span style="color:#409EFF;cursor: pointer;">查看</span></div>
				</div>
				<div>
					<div class="data-card-title-1">¥ {{order.day_new_order_suc_amount}}</div>
					<div class="data-card-title-2">今日总金额</div>
					<div class="data-card-title-3">昨日订单金额: <strong>{{order.yesterday_order_suc_amount}}</strong></div>
				</div>
				<div>
					<div class="data-card-title-1">{{order.day_new_order_count}}</div>
					<div class="data-card-title-2">今日订单数</div>
					<div class="data-card-title-3">昨日订单数: <strong>{{order.yesterday_order_count}}</strong></div>
				</div>
				<div>
					<div class="data-card-title-1">{{customer.today_customer_count}}</div>
					<div class="data-card-title-2">今日新增顾客</div>
					<div class="data-card-title-3">昨日增加顾客: <strong>{{customer.yesterday_customer_count}}</strong></div>
				</div>
				<div>
					<div class="data-card-title-1">{{order.refunding_count}}</div>
					<div class="data-card-title-2">退款中</div>
					<div class="data-card-title-3"><span style="color:#409EFF;cursor: pointer;">查看</span></div>
				</div>
			</div>
		</div>
		<div class="dashboard-2">
			<div class="image-info">
				<div class="dashboard-title">
					<strong>图片空间资源</strong>
				</div>
				图片资源，占位
			</div>
			<div class="order-line">
				<div class="dashboard-title">
					<strong>实时订单金额</strong>
				</div>
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
	width: 16%;
	height:550px;
	vertical-align: top;
	padding:5px;
	border: 1px solid $line-color;
}
.dashboard-1 {
	margin-top: 10px;
	width: 95%;
	height: 200px;
}
.dashboard-title{
	height:30px;
	line-height: 20px;
	padding:10px 0 0 15px;
	border-bottom:1px solid $line-color;
	margin-bottom: 15px;
	font-size: $large-font-size;
}
.data-card-title-1{
	font-size: $large-font-size;
	color:$main-font-color;
	margin-bottom: 8px;
}
.data-card-title-2{
	font-size: $middle-font-size;
	color:$sub-font-color;
	padding-bottom:5px;
	margin-bottom: 5px;
	border-bottom: 1px solid $line-color;
}
.data-card-title-3{
	font-size: $small-font-size;
	color:$other-font-color;
}
.dashboard-1-data {
	text-align: center;
}
.dashboard-1 .dashboard-1-data>div {
	display: inline-block;
	width: calc(20% - 40px);
	min-height:80px;
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
	width: 30%;
	height:300px;
	margin-right:15px;
	padding:10px;
	vertical-align: top;
}

.dashboard-2 .order-line {
	width: 60%;
	height:300px;
	padding: 10px;
	vertical-align: top;
}
</style>