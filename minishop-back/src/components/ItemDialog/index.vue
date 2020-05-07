<template>
<el-dialog :visible="Visible" title="商品选择" :before-close="close" width="80%">
    <div>
        <el-input v-model="query.name" placeholder="请输入商品名称搜索">
            <el-button slot="append" @click="search">搜索</el-button>
        </el-input>
    </div>
    <div v-loading="loading">
        <div v-if="items.length === 0" class="loading-placeholder">暂无结果</div>
        <div v-for="(item,index) in items" :key="index" class="item-dialog-item">
            <el-image style="width:80px;height:80px" :src="item.img"></el-image>
            <div style="width:calc(100% - 250px)">{{ item.product_title }}</div>
            <div style="width:100px">¥ <strong>{{ item.price }}</strong></div>
            <div style="40px">{{ item.on_sale ? '上架' : '下架' }}</div>
        </div>
    </div>
    <el-pagination
        style="margin-top:20px;text-align:center"
        :current-page="query.page"
        :page-size="query.pageSize"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange">
    </el-pagination>
</el-dialog>
</template>

<script>
import { get_products } from '@/api/product'
export default{
    props:{
        Visible:Boolean
    },
    data(){
        return{
            loading:false,
            items:[],
            total:0,
            query:{
                page:1,
                pageSize:15,
                name:''
            }
        }
    },
    methods:{
        getItems(){
            this.loading = true
            get_products(this.query).then(r=>{
                this.items = r.data.body.data
                this.total = r.data.body.page.total
                this.loading = false
            }).catch(()=>{
                this.loading = false
            })
        },
        handleCurrentChange(pagination){
            this.query.page = pagination
            this.getItems()
        },
        search(){
            this.query.page = 1
            this.getItems()
        },
        close(){
            this.$emit('close')
        }
    },
    watch:{
        Visible:{
            deep:true,
            handler:function(){
                if(this.Visible) this.getItems()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.item-dialog-item{
    margin:10px 0;
}
.item-dialog-item>div{
    display:inline-block;
    vertical-align:middle;
    margin-right:10px;
}
</style>