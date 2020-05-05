<template>
<div class="main-sidebar" :class="{'is-collapse':isCollapse}">
    <el-menu :collapse="isCollapse">
        <div v-for="(menu,index) in menus" :key="index">
            <el-submenu v-if="menu.children !== undefined" :index="'m'+index">
                <template slot="title">
                    <i class="iconfont" :class="menu.icon"></i>
                    <span slot="title">{{ menu.title }}</span>
                </template>
                <el-menu-item v-for="(sub,Index) in menu.children" :key="'s'+Index" :index="index + 's'+Index" @click="toPage(sub)">
                    <span>{{ sub.title }}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="menu.children === undefined" :index="'m'+index" @click="toPage(menu)">
                <i class="iconfont" :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
            </el-menu-item>
        </div>
    </el-menu>
</div>
</template>

<script>
import { allRoutes } from '@/router'
export default{
    props:{
        isCollapse:Boolean
    },
    data(){
        return{
            menus:[]
        }
    },
    created(){
        this.getMenu()
    },
    methods:{
        getMenu(){
            let routes = allRoutes.filter((val)=>{return !val.hidden})
            routes.map(v=>{
                if(v.children !== undefined && v.children.length === 1){
                    let item = {
                        title:v.meta.title,
                        link:v.children[0].name,
                        icon:v.meta.icon
                    }
                    this.menus.push(item)
                }else if(v.children !== undefined && v.children.length > 1){
                    let item = {
                        title:v.meta.title,
                        icon:v.meta.icon,
                        children:[]
                    }
                    let temp = {}
                    v.children.map(t=>{
                        temp['title'] = t.meta.title
                        temp['icon'] = t.meta.icon
                        temp['link'] = t.name
                        item.children.push(temp)
                        temp = {}
                    })
                    this.menus.push(item)
                }
            })
        },
        toPage(menu){
            this.$router.push({ name: menu.link })
        }
    }
}
</script>

<style scoped>
.main-sidebar{
    display:inline-block;
    vertical-align:top;
    width:165px;
}
.main-sidebar.is-collapse{
    width:65px;
}
.main-sidebar,.main-sidebar ul{
    height:100%;
}
</style>