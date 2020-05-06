<template>
<div>
    <div class="product-page-title">
        <el-button size="small">返回</el-button>
        <span class="page-item-title">{{ item.product.product_title }}</span>
    </div>
    <div>
        <div>
            <div>商品名称</div>
            <el-input v-model="item.product.name"></el-input>
        </div>
    </div>
</div>
</template>

<script>
import { get_product } from '@/api/product'
export default{
    data(){
        return{
            item:{
                product:{},
                images:[],
                variants:[],
                categories:[]
            }
        }
    },
    created(){
        if(this.$route.query.id !== undefined) this.getItem()
    },
    methods:{
        getItem(){
            this.$loading()
            get_product(this.$route.query.id).then(r=>{
                this.item = r.data.body
                this.$loading().close()
            }).catch(()=>{
                this.$loading().close()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.product-page-title{
    padding-bottom:10px;
    border-bottom:1px solid $line-color;
}
.page-item-title{
    font-size:14px;
    font-weight:500;
    margin-left:10px;
}
</style>