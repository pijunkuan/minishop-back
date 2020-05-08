<template>
<div>
	<div>
		<div class="shipment-des-title">
			运费模板说明 <i class="iconfont iconbangzhu2" @click="desOpen" style="margin-left: 5px; cursor: pointer;"></i>
		</div>
	</div>
	<div style="margin-bottom: 20px;">
		<el-button type="primary" round @click="createShipment" size="small">创建新模板</el-button>
	</div>
	<div>
		<el-table :data="shipData" border header-row-class-name="table-header-row">
			<el-table-column label="模板名称" prop="shipment_title"></el-table-column>
			<el-table-column label="计费方式" prop="cost_type"></el-table-column>
			<el-table-column label="是否包邮">
				<template slot-scope="scope">
					<el-tooltip v-if="scope.row.need_cost" placement="top">
						<div slot="content">
							第一计费数量：{{scope.row.value_1}}<br/>
							第一计费价格：{{scope.row.price_1}}<br/>
							第二计费数量：{{scope.row.value_2}}<br/>
							第二计费价格：{{scope.row.price_2}}<br/>
						</div>
						<el-tag type="info">否</el-tag>
					</el-tooltip>
					<el-tag v-else type="success">是</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="是否启用">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.visibility" type="success">启用</el-tag>
					<el-tag v-else type="danger">停用</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
					<el-button v-if="scope.row.visibility" type="warning" size="mini" @click="changeVisi(scope.row)">停用</el-button>
					<el-button v-else type="success" size="mini" @click="changeVisi(scope.row)">启用</el-button>
					<el-button type="danger" size="mini" @click="deleteRow(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<el-dialog :title="title" :visible.sync="dialogVisibility">
		<el-form label-width="100px" class="dialog-edit">
			<el-form-item label="模板名称">
				<el-input v-model="dialogData.shipment_title"></el-input>
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
			<el-form-item label="是否包邮">
				<el-switch 
				v-model="dialogData.need_cost"
				active-color="#ff4949"
				inactive-color="#13ce66"
				active-text="不包邮"
				inactive-text="包邮">
				</el-switch>
			</el-form-item>
			<div v-show="dialogData.need_cost">
				<el-form-item label="计费方式">
					<el-select v-model="dialogData.cost_type">
						<el-option label="按重量" value="weight"></el-option>
						<el-option label="按件数" value="numeric"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="第一计费数量(KG/件)">
					<el-input v-model="dialogData.value_1"></el-input>
				</el-form-item>
				<el-form-item label="第一计费价格">
					<el-input v-model="dialogData.price_1"></el-input>
				</el-form-item>
				<el-form-item label="第二计费数量(KG/件)">
					<el-input v-model="dialogData.value_2"></el-input>
				</el-form-item>
				<el-form-item label="第二计费价格">
					<el-input v-model="dialogData.price_2"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div style="text-align: right;">
			<el-button @click="dialogVisibility = false" size="mini">关闭</el-button>
			<el-button v-if="dialogId" size="mini" type="primary" @click="update">更新</el-button>
			<el-button v-else size="mini" type="primary" @click="creat">新增</el-button>

		</div>
	</el-dialog>
	<el-dialog title="运费模板设置说明" :visible.sync="desShow" width="600px">
		<div>
			<div class="shipment-des-sub-title">
				运费计算规则：
			</div>
			<el-image style="width:560px;height:400px;border:1px solid #cdcdcd" fit="scale-down" src="//asset.ibanquan.com/image/5eb5e35b6da86b000b7603e5/s.png?v=1588978523"></el-image>
			<div class="shipment-des-sub">
				<div class="shipment-des-content-title">计费方式为：<strong>按重量</strong></div>
				<div>
					计量单位为公斤，第一计费数量为首重包含多少公斤，第一计费价格为首重的价格多少元，第二计费数量为续重的重量，第二计费价格为每单位下续重的价格
				</div>
				<div class="shipment-example">
					例如：第一计费数量为<strong>5</strong>，第一计费价格为<strong>2</strong>，第二计费数量为<strong>1</strong>，第二计费价格为<strong>3</strong>，
				</div>
				<div class="shipment-example">
					相当于：前5公斤的运费为2元，超出5公斤的部分每1公斤的运费为3元
				</div>
			</div>
			<div class="shipment-des-sub" style="margin-top:20px;">
				<div class="shipment-des-content-title">计费方式为：<strong>按件数</strong></div>
				<div>
					计量单位为件，第一计费数量为前多少件，第一计费价格为前几件的价格多少元，第二计费数量为后续每多少件计算价格，第二计费价格为每单位下商品件数的价格
				</div>
				<div class="shipment-example">
					例如：第一计费数量为<strong>5</strong>，第一计费价格为<strong>2</strong>，第二计费数量为<strong>1</strong>，第二计费价格为<strong>3</strong>，
				</div>
				<div class="shipment-example">
					相当于：前5件的运费为2元，超出5件的部分每件的运费为3元
				</div>
			</div>
		</div>
		<div style="text-align: right;">
			<el-button @click="desShow = false" size="mini">关闭</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
import {get_shipment,update_shipment,create_shipment,delete_shipment} from "@/api/ship"

export default {
	data(){
		return {
			shipData:[],
			title:"",
			dialogVisibility:false,
			dialogData:{},
			dialogId:null,
			desShow:false,

		}
	},
	methods:{
		getData(){
			get_shipment().then(r=>{
				let _data = r.data.body
				this.shipData = _data
			})
		},
		edit(row){
			this.dialogVisibility = true
			this.dialogId = row.id
			this.title = "编辑"
			this.dialogData = {
				shipment_title:row.shipment_title,
				visibility:row.visibility,
				cost_type:row.cost_type_code,
				need_cost:row.need_cost,
				price_1:row.price_1,
				value_1:row.value_1,
				price_2:row.price_2,
				value_2:row.value_2,
			}
		},
		createShipment(){
			this.dialogVisibility = true
			this.dialogId = null
			this.title = "新增"
			this.dialogData = {
				shipment_title:null,
				visibility:true,
				cost_type:null,
				need_cost:false,
				price_1:null,
				value_1:null,
				price_2:null,
				value_2:null,
			}
		},
		update(){
			update_shipment(this.dialogId,this.dialogData).then(()=>{
				this.$message.success('更新成功')
				this.dialogVisibility = false
				this.getData()
			}).catch(e=>{
				this.$message.error(e.response.data.message)
			})
		},
		creat(){
			create_shipment(this.dialogData).then(()=>{
				this.$message.success('创建成功')
				this.dialogVisibility = false
				this.getData()
			}).catch(e=>{
				this.$message.error(e.response.data.message)
			})
		},
		changeVisi(row){
			update_shipment(row.id,{
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
				delete_shipment(id).then(()=>{
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
		desOpen(){
			this.desShow = true
		}
	},
	created(){
		this.getData()
	},
	
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.shipment-des-title {
	font-size: $large-font-size;
	color: $main-font-color;
	margin-bottom: 20px;
}
.shipment-des-sub-title {
	font-size: $large-font-size;
	color: $main-font-color;
	margin-bottom: 10px;
	padding-bottom:10px;
	border-bottom:1px solid $line-color;
}
.shipment-des-sub>div {
	font-size: $middle-font-size;
}
.dialog-edit .el-input {
	width: 250px
}
.shipment-des-content-title{
	font-size:$middle-font-size;
	line-height:40px;
}
.shipment-example{
	color:$error-color;
	margin-top:10px;
}
</style>
<style lang="scss">
@import '@/assets/style/base.scss';
.el-table tr.table-header-row th{
	background-color:$background-color;
}
</style>