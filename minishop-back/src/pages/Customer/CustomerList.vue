<template>
<div>
    <div class="customer-header"></div>
    <el-table :data="data" :loading="loading" border header-row-class-name="table-header-row">
        <el-table-column label="昵称" prop="username"></el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="注册时间" prop="created_at"></el-table-column>
        <el-table-column label="余额">
            <div slot-scope="scope">
                <span style="margin-right:10px">¥ {{ scope.row.balance }}</span>
                <el-button type="text" size="small" @click="toPay(scope.row)">充值记录</el-button>
            </div>
        </el-table-column>
        <el-table-column label="操作" width="170px">
            <div slot-scope="scope">
                <el-button type="primary" size="small" @click="toPay(scope.row)">充值</el-button>
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
</div>
</template>

<script>
import { get_customer } from '@/api/customer'
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
            data:[]
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
        handleCurrentChange(pagination){
            this.query.page = pagination
            this.getData()
        },
        toPay(row){
            console.log(row)
        },
        editPass(row){
            this.$prompt('重置后顾客将使用新的密码进行登录，请谨慎操作，并且及时通知顾客密码已变更。如果确认重置，请在下方输入重置密码，并点击重置按钮。','提示',{
                confirmButtonText:'重置',
                cancelButtonText:'关闭'
            }).then(({value})=>{
                console.log(value)
                console.log(row)
            }).catch(()=>{})
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/style/base.scss';
.el-table tr.table-header-row th{
    background-color:$background-color;
}
</style>