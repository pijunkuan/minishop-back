<template>
<div class="header-container">
    <div class="header-item header-item-side">
        <div v-if="menuShow" @click="toggleMenu(false)"><i class="iconfont iconleimupinleifenleileibie2"></i></div>
        <div v-else @click="toggleMenu(true)"><i class="iconfont iconleimupinleifenleileibie"></i></div>
    </div>
    <div class="header-item header-item-main">{{ $store.getters.title }}</div>
    <div class="header-item header-item-side">
        <span @click="toEdit" style="cursor:pointer">{{ $store.getters.username }}</span>
        <span @click="toLogout" style="cursor:pointer">退出<i class="iconfont icontuichu1"></i></span>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            menuShow:false
        }
    },
    methods:{
        toggleMenu(boolean){
            this.menuShow = !this.menuShow
            this.$store.dispatch('toggleSide',boolean)
            this.$emit('click')
        },
        toLogout(){
            this.$store.dispatch('logout').then(()=>{
                this.$message.success({
                    message:'已安全登出',
                    duration:1000
                })
                setTimeout(()=>{
                    this.$router.push({name:'Login'})
                },1000)
            })
        },
        toEdit(){
            if(this.$route.name !== 'UserEdit') this.$router.push({name:'UserEdit'})
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/base.scss';
.header-container{
    height:60px;
    line-height:60px;
    border-bottom:1px solid $line-color;
}
.header-item{
    display:inline-block;
    vertical-align:middle;
}
.header-item-side{
    width:30%;
}
.header-item-main{
    width:40%;
    text-align:center;
    font-size:20px;
}
.header-item:first-child>div{
    width:65px;
    text-align:center;
}
.header-item:first-child>div i{
    font-size:24px;
}
.header-item:last-child{
    text-align:right;
}
.header-item:last-child span:first-child{
    color:$main-color;
    font-weight:500;
    margin-right:20px;
}
.header-item:last-child span:last-child{
    margin-right:20px;
}
.header-item:last-child span:last-child i{
    position:relative;
    top:1px;
    margin-left:2px;
}

@media (max-width:960px){
    .header-container{
        width:960px;
    }
}
</style>
<style>
.el-submenu .el-menu-item{
    min-width:165px!important;
}
.is-collapse .el-submenu__title span,.is-collapse .el-menu-item span{
    display:none;
}
.el-submenu__title .iconfont,.el-menu-item .iconfont{
    font-size:20px;
    margin-right:6px;
}
.el-submenu__title .el-submenu__icon-arrow{
    right:5px;
    margin-top:-3px;
}
</style>