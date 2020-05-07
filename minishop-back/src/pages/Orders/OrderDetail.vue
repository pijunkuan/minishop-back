<template>
<div>
	<div class="order-top-button">
		<el-button @click='$router.go(-1)'>返回</el-button>
		<el-button v-if="['processing','sent','partial','success'].indexOf(status) !== -1 && !refund_status" type="info" @click="refundOrder('refunded')">退单</el-button>
		<el-button v-if="status === 'pending'" type="info" @click='closedOrder'>关闭订单</el-button>
		<el-button v-if="refund_status ==='refunding'" type='primary' @click="refundOrder('refunded')">同意退单</el-button>
		<el-button v-if="refund_status ==='refunding'" type="danger" @click="refundOrder('refund_refuse')">拒绝退单</el-button>
	</div>
	<div class="order-top" style="width:calc(100% - 5px)">
		<el-steps :active="status_active" :finish-status="status === 'cancel' || status === 'closed' || status === 'refunded' ? 'wait' : 'success'" simple>
			<el-step v-for = "(status_process,index) in status_processes" :key="index" :title="status_process.value"></el-step>
		</el-steps>
	</div>
	<div class="order-contain">
		<div class="order-main">
			<div>
				<div class="order-block-title">
					<strong>商品详情</strong>
					<el-button v-if="status == 'processing'" style="padding: 5px 10px ; margin-left: 20px" type='primary' @click="openSendDialog">发货</el-button>
				</div>
				<div class="order_items" v-for="(item , index) in items" :key='index'>
					<div class="order_items_img">
						<el-image :src="item.img_url" style="width: 60px;height: 60px" fit="contain"></el-image>
					</div>
					<div class="order_items_info">
						<div>{{item.product_title}}</div>
						<div>规格：{{item.variant_title}}</div>
					</div>
					<div class="order_items_quantity">
						<div>¥ <strong>{{ item.price }}</strong> x <strong>{{item.quantity}}</strong></div>
						<div>总计：¥ {{item.total}}</div>
					</div>
				</div>
				<div class="order-price-list">
					<div>
						<div>商品总计：</div>
						<div>¥ {{items_amount}}</div>
					</div>
					<div>
						<div>运费总计：</div>
						<div>¥ {{shipments_amount}}</div>
					</div>
					<div>
						<div>优惠总计：</div>
						<div>-¥ {{discounts_amount}}</div>
					</div>
					<div>
						<div>订单总计：</div>
						<div v-if="ori_amount == amount">¥ <strong>{{amount}}</strong></div>
						<div v-else>
							<div style="text-decoration: line-through;">¥ {{ori_amount}}</div>  
							<div>¥ <strong>{{amount}}</strong></div>
						</div>
					</div>
					<div v-if="status == 'pending'">
						<el-button style="float: right; padding: 3px 0 ; margin-right: 10px" type ='text' @click="updatePriceOrder">修改价格</el-button>
					</div>
				</div>
			</div>
			<div class="order-remark">
				<div class="order-block-title"><strong>客户备注</strong></div>
				<div style="padding:10px">{{ remark ? remark : '暂无' }}</div>
			</div>
		</div>
		<div class="order-subside">
			<div class='order-subside-card'>
				<div class="order-block-title">订单信息</div>
				<div class="order-block-content">
					<div>
						<div>订单编号：</div>
						<div>{{no}}</div>
					</div>
					<div v-if="payment">
						<div>支付方式：</div>
						<div>{{payment.payment_method}}</div>
					</div>
					<div v-if="payment">
						<div>支付时间：</div>
						<div>{{payment.created_at}}</div>
					</div>
				</div>
			</div>
			<div class='order-subside-card'>
				<div class="order-block-title">客户信息</div>
				<div class="order-block-content">
					<div>
						<div>用户名：</div>
						<div>{{customer.username}}</div>
					</div>
					<div>
						<div>手机号：</div>
						<div>{{customer.mobile}}</div>
					</div>
				</div>
			</div>
			<div class='order-subside-card'>
				<div class="order-block-title">配送信息</div>
				<div class="order-block-content">
					<div>
						<div>姓名：</div>
						<div>{{address.name}}</div>
					</div>
					<div>
						<div>地址：</div>
						<div>{{address.address}}</div>
					</div>
					<div>
						<div>电话：</div>
						<div>{{address.mobile}}</div>
					</div>
					<div>
						<div>邮编：</div>
						<div>{{address.zip}}</div>
					</div>
				</div>
			</div>
			<div class='order-subside-card'>
				<div class="order-block-title">配送列表</div>
				<div v-if='shipments.length !== 0'>
					<el-collapse>
						<el-collapse-item v-for="(shipment,index) in shipments" :key="index" :title="'配送'+ (index + 1)" :name="index">
							<div>配送方式：{{shipment.shipment_company}}</div>
							<div>配送单号：{{shipment.shipment_no}}</div>
							<div>
								<ul>
									<li v-for="(item , index) in shipment.items" :key="index">{{item.product_title}} [规格]{{item.variant_title}} x {{item.quantity}}</li>
								</ul>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
				<div v-else style="padding:10px">还未配送</div>
			</div>
		</div>
	</div>
	<el-dialog title='发货' :visible.sync="sendDialogShow">
		<el-form label-width="80px">
			<el-form-item label="配送公司">
				<el-input v-model="sendInfo.shipment_company"></el-input>
			</el-form-item>
			<el-form-item label="配送号码">
				<el-input v-model="sendInfo.shipment_no"></el-input>
			</el-form-item>
			<div style="text-align: right;">
				<el-button @click="sendDialogShow = false">取消</el-button>
				<el-button @click="sendOrder" type="primary">发货</el-button>
			</div>
		</el-form>
	</el-dialog>
</div>
</template>

<script>
	import {get_order, status_update_order, update_order,send_order} from "@/api/order"
	export default {
		data(){
			return {
				id:null,
				no:null,
				customer:{},
				items:{},
				payment:{},
				address:{},
				shipments:[],
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
				status_active:0,
				status_processes:[
				],

				sendDialogShow:false,

				sendInfo:{
					shipment_company:null,
					shipment_no:null,
				}
			}
		},
		methods:{
			getData(){
				get_order(this.$route.query.id).then(r=>{
					let _data = r.data.body
					this.id = this.$route.query.id
					this.no = _data.no
					this.customer = _data.customer
					this.items = _data.items
					this.payment = _data.payment
					this.address = _data.address
					this.shipments = _data.shipments
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
					switch(_data.status){
						case "pending":
						this.status_active = 1
						this.status_processes = [
							{value:'订单创建'},
							{value:'订单支付'},
							{value:'配送中'},
							{value:'已完成'},
						]
						break
						case "processing":
						this.status_active = 2
						this.status_processes = [
							{value:'订单创建'},
							{value:'订单支付'},
							{value:'配送中'},
							{value:'已完成'},
						]
						break
						case "partial":
						case "sent":
						this.status_active = 3
						this.status_processes = [
							{value:'订单创建'},
							{value:'订单支付'},
							{value:'配送中'},
							{value:'已完成'},
						]
						break
						case "success":
						this.status_active = 4
						this.status_processes = [
							{value:'订单创建'},
							{value:'订单支付'},
							{value:'配送中'},
							{value:'已完成'},
						]
						break
						case "cancel":
						this.status_active = 2
						this.status_processes = [
							{value:'订单创建'},
							{value:'已取消'},
						]
						break;
						case "closed":
						this.status_active = 2
						this.status_processes = [
							{value:'订单创建'},
							{value:'已关闭'},
						]
						break;
					}
				}).catch(()=>{
					this.$message.warning('参数错误')
					this.$router.push({
						name:'OrderList'
					})
				})
			},
			refundOrder(status){
				this.$prompt('请输入理由',"提示",{
					confirmButtonText:"确定",
					cancelButtonText:"取消",
					type:"warning"
				}).then(({value})=>{
					status_update_order(this.id,{status:status,reason:value}).then(()=>{
						this.$message.success('退单成功')
						this.getData()
					})
				}).catch(()=>{
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			},
			closedOrder(){
				this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					status_update_order(this.id,{status:"closed"}).then(()=>{
						this.$message.success('关闭成功')
						this.getData()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			},
			updatePriceOrder(){
				this.$prompt('请输入价格',"提示",{
					confirmButtonText:"确定",
					cancelButtonText:"取消",
					type:"warning"
				}).then(({value})=>{
					update_order(this.id,{amount:value}).then(()=>{
						this.$message.success('修改成功')
						this.getData()
					})
				}).catch(()=>{
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			},
			openSendDialog(){
				this.sendDialogShow = true
				this.sendInfo.shipment_company = ""
				this.sendInfo.shipment_no = ""
			},
			sendOrder(){
				let items = []
				this.items.map(v=>{
					items.push({
						variant_id:v.variant_id,
						quantity:v.quantity
					})
				})
				this.sendInfo.items = items
				send_order(this.id,this.sendInfo).then(()=>{
					this.$message.success('发货成功')
					this.sendDialogShow = false
					this.getData()

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

<style lang="scss" scoped>
@import "@/assets/style/base.scss";
.order-top-button{
	margin-bottom: 10px;
	padding-bottom:10px;
	border-bottom:1px solid $line-color;
}
.order-top {
	height: 47px;
	border: 1px solid $line-color;
	border-radius: 3px;
	margin-bottom: 10px;
}
.order-main {
	display: inline-block;
	min-height:300px;
	width: 70%;
	vertical-align: top;
}
.order-main>div {
	border:1px solid $line-color;
	border-radius:5px;
	margin-bottom:20px;
}
.order-subside {
	display: inline-block;
	width: calc(30% - 8px);
	vertical-align: top;
	margin-left: 6px;
}
.order-subside .order-subside-card{
	margin-bottom: 20px;
}

.order_items{
	margin:0 10px;
	padding:10px 0;
	border-bottom:1px dotted $line-color;
}
.order_items .order_items_img {
	display: inline-block;
	text-align:center;
	width:65px;
	height:65px;
	vertical-align: middle;
}

.order_items .order_items_info {
	margin-left: 15px;
	display: inline-block;
	width: 450px;
	vertical-align: top;
}

.order_items .order_items_quantity {
	display: inline-block;
	vertical-align: top;
}
.order-price-list{
	padding:10px 0;
}
.order-price-list>div{
	text-align: right;	
}
.order-price-list>div>div{
	width: 80px;
	display:inline-block;
	margin-right: 10px;
	vertical-align: top;
}
.order-price-list>div>div:first-child{
	color:$sub-font-color;
}

.order-subside-card{
	border:1px solid $line-color;
	border-radius:5px;
}
.order-block-title{
	line-height:40px;
	padding:0 10px;
	background-color:$background-color;
	border-bottom:1px solid $line-color;
}
.order-block-content{
	padding:0 10px;
}
.order-block-content>div{
	padding:5px 0;
}
.order-block-content>div>div{
	display:inline-block;
	vertical-align:top;
}
.order-block-content>div>div:first-child{
	width:80px;
}
.order-block-content>div>div:last-child{
	width:calc(100% - 80px);
}
</style>