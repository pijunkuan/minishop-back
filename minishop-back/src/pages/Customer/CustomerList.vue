<template>
<div>
    <div class="customer-searchbar">
        <el-input v-model="searchValue" style="width: 400px;">
            <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option label="用户名" value="username"></el-option>
                <el-option label="手机号" value="mobile"></el-option>
            </el-select>
        </el-input>
        <el-button type="primary" size="small" @click="search" round>搜索</el-button>
        <el-button size="small" @click="reset" round>重置</el-button>
    </div>
    <div class="customer-header"></div>
    <el-table :data="data" :loading="loading" border header-row-class-name="table-header-row">
        <el-table-column label="昵称" prop="username"></el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="注册时间" prop="created_at"></el-table-column>
        <el-table-column label="余额">
            <div slot-scope="scope">
                <span style="margin-right:10px">¥ {{ scope.row.balance }}</span>
                <el-button type="text" size="small" @click="toWallet(scope.row.id)">历史记录</el-button>
            </div>
        </el-table-column>
        <el-table-column label="操作" width="300px">
            <div slot-scope="scope">
                <el-button type="primary" size="small" @click="toPay(scope.row)">操作</el-button>
                <el-button size="small" @click="editPass(scope.row)">修改密码</el-button>
            </div>
        </el-table-column>
    </el-table>
    <el-pagination
        style="margin:20px 0;text-align:center"
        :current-page="query.page"
        :page-size="query.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="钱包记录" witdh='100%' :visible.sync="walletListShow">
        <div><strong>钱包余额：</strong> {{walletBalance}}</div>
        <el-table :data="walletData" :loading="walletLoading">
            <el-table-column label="流水号" prop="no"></el-table-column>
            <el-table-column label="金额" prop="amount"></el-table-column>
            <el-table-column label="类型" >
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type_code == 'in'" type="success">{{scope.row.type}}</el-tag>
                    <el-tag v-else type="danger">{{scope.row.type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="说明" prop="content"></el-table-column>
            <el-table-column label="时间" prop="created_at"></el-table-column>
        </el-table>
        <el-pagination
        style="margin:20px 0;text-align:center"
        :current-page="walletQuery.page"
        :page-size="walletQuery.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="walletTotal"
        @current-change="walletHandleCurrentChange">
        </el-pagination>
    </el-dialog>

    <el-dialog :title="'用户 '+ mobile +' --新增财务操作'" :visible.sync="payWalletShow">
        <el-form>
            <el-form-item label="金额" required>
                <el-input-number v-model="payData.amount" required></el-input-number>
            </el-form-item>
            <el-form-item label="业务类型" required>
                <el-select v-model="payData.type" required>
                    <el-option label="支出" value="out"></el-option>
                    <el-option label="收入" value="in"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="payData.content" :rows = "3"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align: right;">
            <el-button @click="payWalletShow = false">取消</el-button>
            <el-button type='primary' @click="payWallet">确认</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import { get_customer,update_customer } from '@/api/customer'
import { get_wallet_list,get_wallet_balance,pay_wallet } from '@/api/wallet'
export default{
    data(){
        return{
            loading:false,
            query:{
                page:1,
                pageSize:15,
                username:'',
                mobile:''
            },
            total:0,
            data:[],
            searchType:"username",
            searchValue:null,
            walletListShow:false,
            walletData:[],
            walletLoading:false,
            walletCustomerId:null,
            walletQuery:{
                page:1,
                pageSize:5
            },
            walletTotal:0,
            walletBalance:0,
            mobile:null,
            payWalletShow:false,
            payData:{
                amount:0,
                type:"in",
                content:null
            }
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            this.loading = true
            get_customer(this.query).then(r=>{
                this.data = r.data.body.data
                this.total = r.data.body.page.total
                this.loading = false
            }).catch(()=>{
                this.loading = false
            })
        },
        getWalletData(){
            this.walletLoading = true
            get_wallet_list(this.walletCustomerId,this.walletQuery).then(r=>{
                let _wallet = r.data.body
                this.walletData = _wallet.data
                this.walletTotal = _wallet.page.total
                this.walletLoading = false
            })
            get_wallet_balance(this.walletCustomerId).then(r=>{
                this.walletBalance = r.data.body.balance
            })

        },
        handleCurrentChange(pagination){
            this.query.page = pagination
            this.getData()
        },
        editPass(row){
            this.$prompt('重置后顾客将使用新的密码进行登录，请谨慎操作，并且及时通知顾客密码已变更。如果确认重置，请在下方输入重置密码，并点击重置按钮。','提示',{
                confirmButtonText:'重置',
                cancelButtonText:'关闭'
            }).then(({value})=>{
                update_customer(row.id,{password:value}).then(()=>{
                    this.$message.success('操作成功')
                    this.getData()
                })
            }).catch(()=>{})
        },
        search(){
            this.query = {
                page:this.query.page,
                pageSize:this.query.pageSize
            }
            this.query[this.searchType] = this.searchValue
            this.getData()
        },
        reset(){
            this.query = {
                page:1,
                pageSize:15
            }
            this.getData()
        },
        toWallet(id){
            this.walletListShow = true
            this.walletCustomerId = id
            this.walletData = []
            this.walletBalance = 0
            this.getWalletData()
        },
        walletHandleCurrentChange(val){
            this.walletQuery.page = val
            this.getWalletData()
        },
        toPay(row){
            this.mobile = row.mobile
            this.walletCustomerId = row.id
            this.payData={
                amount:0,
                type:"in",
                content:null
            }
            this.payWalletShow = true
        },
        payWallet(){
            pay_wallet(this.walletCustomerId,this.payData).then(()=>{
                this.payWalletShow = false
                this.$message.success('操作成功')
                this.getData()
            })
        }

    }
}
</script>

<style lang="scss">
@import '@/assets/style/base.scss';
.el-table tr.table-header-row th{
    background-color:$background-color;
}
.customer-searchbar .el-input--suffix input{
    width: 100px;
}
.customer-searchbar .el-input__inner {
    border-radius: 0 15px 15px 0;
}
.customer-searchbar .el-input-group__prepend {
    border-radius: 15px 0 0 15px;
}
</style>

<style lang="scss" scoped>
.customer-searchbar{
    margin-bottom: 20px;
}
.customer-searchbar .el-button{
    width:100px;
    margin-left: 10px;
}
</style>