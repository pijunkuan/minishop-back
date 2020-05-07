<template>
<div>
    <div class="set-module">
        <div class="set-module-title">
            <span style="margin-right:20px">主题颜色选择</span>
            <el-button type="primary" size="mini" @click="changeTheme">保存</el-button>
        </div>
        <div v-loading="loading">
            <el-radio v-for="(color,index) in colors" :key="index" :label="color.value" v-model="selectTheme">
                <el-image :src="color.img" style="width:160px;height:284px;"></el-image>
                <div style="text-align:center;margin:10px 0 20px">{{ color.name }}</div>
            </el-radio>
        </div>
    </div>
    <div class="set-module">
        <div class="set-module-title">
            <span style="margin-right:20px">广告图设置</span>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
        <div>
            <div class="module-template"></div>
            <div class="module-content" v-loading="t_loading">
                <div class="module-content-title">
                    <div style="width:80px">图片</div>
                    <div style="width:calc(100% - 170px);margin:0 5px;">链接</div>
                    <div style="width:80px">操作</div>
                </div>
                <div v-for="(banner,index) in banners" :key="index" class="module-content-content">
                    <div class="module-content-image" style="position:relative">
                        <div class="image-cover-button" style="line-height:50px;height:50px;width:80px">
                            <el-button type="text" size="small" @click="changeImage('banner',index)">选择</el-button>
                        </div>
                        <el-image :src="banner.img" fit="scale-down" style="width:80px;height:50px"></el-image>
                    </div>
                    <el-input v-model="banner.link" style="width:calc(100% - 172px);margin:0 5px;" placeholder="选填，广告图跳转链接"></el-input>
                    <div class="module-content-button" style="width:80px">
                        <span @click="toFront('banner',index)"><i class="iconfont iconxiangshang"></i></span>
                        <span @click="toBack('banner',index)"><i class="iconfont iconxiangxia"></i></span>
                        <span @click="toDelete('banner',index)"><i class="iconfont iconshanchu1"></i></span>
                    </div>
                </div>
                <div style="margin-top:20px">
                    <div><el-button size="small" type="primary" @click="addBanner">添加广告图</el-button></div>
                    <div class="module-tip">提示：最多可添加6张广告图</div>
                </div>
            </div>
        </div>
    </div>
    <div class="set-module">
        <div class="set-module-title">
            <span style="margin-right:20px">分类标签设置</span>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
        <div>
            <div class="module-template"></div>
            <div class="module-content" v-loading="t_loading">
                <div v-for="(type,index) in types" :key="index">
                    <el-image :src="type.img" style="width:40px;height:40px"></el-image>
                    <el-input v-model="type.title"></el-input>
                    <el-input v-model="type.link"></el-input>
                    <div>
                        <span><i class="iconfont iconxiangshang"></i></span>
                        <span><i class="iconfont iconxiangxia"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="set-module">
        <div class="set-module-title">
            <span style="margin-right:20px">消息通知</span>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
        <div>
            <div class="module-template"></div>
            <div class="module-content" v-loading="t_loading">
                <el-input v-model="message"></el-input>
            </div>
        </div>
    </div>
    <div class="set-module">
        <div class="set-module-title">
            <span style="margin-right:20px">限时打折</span>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
        <div>
            <div class="module-template"></div>
            <div class="module-content" v-loading="t_loading">
                <div>活动结束时间</div>
                <el-date-picker v-model="limit.endTime" type="datetime"></el-date-picker>
                <div>活动商品</div>
                <div>
                    <div v-for="(item,index) in limit.items" :key="index">
                        <el-image :src="item.img_src" style="width:40px;height:40px"></el-image>
                        <el-input v-model="item.title"></el-input>
                        <el-input v-model="item.subTitle"></el-input>
                        <el-input v-model="item.price"></el-input>
                        <el-input v-model="item.ori_price"></el-input>
                        <div>
                            <span><i class="iconfont iconxiangshang"></i></span>
                            <span><i class="iconfont iconxiangxia"></i></span>
                            <span><i class="iconfont iconshanchu1"></i></span>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" size="mini">新增商品</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="set-module">
        <div class="set-module-title">
            <span style="margin-right:20px">今日上新</span>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
        <div>
            <div class="module-template"></div>
            <div class="module-content" v-loading="t_loading">
                <div>活动商品</div>
                <div>
                    <div v-for="(item,index) in newitem.items" :key="index">
                        <el-image :src="item.img_src" style="width:40px;height:40px"></el-image>
                        <el-input v-model="item.title"></el-input>
                        <el-input v-model="item.subTitle"></el-input>
                        <el-input v-model="item.price"></el-input>
                        <el-input v-model="item.ori_price"></el-input>
                        <div>
                            <span><i class="iconfont iconxiangshang"></i></span>
                            <span><i class="iconfont iconxiangxia"></i></span>
                            <span><i class="iconfont iconshanchu1"></i></span>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" size="mini">新增商品</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="set-module">
        <div class="set-module-title">
            <span style="margin-right:20px">广告图</span>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
        <div>
            <div class="module-template"></div>
            <div class="module-content" v-loading="t_loading">
                <el-image :src="ad.img" style="width:80px;height:80px"></el-image>
                <el-input v-model="ad.title"></el-input>
                <el-input v-model="ad.subTitle"></el-input>
                <el-input v-model="ad.price"></el-input>
                <el-input v-model="ad.ori_price"></el-input>
                <el-input v-model="ad.link"></el-input>
            </div>
        </div>
    </div>
    <image-dialog :Visible="imageShow" Type="mono" @close="imageShow = false" @confirm="confirmImage"></image-dialog>
</div>
</template>

<script>
import { get_theme, change_theme } from '@/api/theme'
import { get_template, change_template } from '@/api/template'
import ImageDialog from '@/components/ImageDialog'
export default{
    components:{
        ImageDialog
    },
    data(){
        return{
            loading:false,
            colors:[
                { value:'summer', name:'夏日艳阳', img:'' },
                { value:'water', name:'清爽', img:'' },
                { value:'spring', name:'春日绿', img:'' },
                { value:'forest', name:'森林', img:'' },
                { value:'purple', name:'静谧紫', img:'' },
            ],
            selectTheme:'',
            t_loading:false,
            banners:[
                { img:'', link:'', sort:0 }
            ],
            types:[
                { img:'', title:'', link:'', sort:0 },
                { img:'', title:'', link:'', sort:1 },
                { img:'', title:'', link:'', sort:2 },
                { img:'', title:'', link:'', sort:3 }
            ],
            message:'',
            limit:{
                endTime:'',
                items:[]
            },
            newitem:{
                items:[]
            },
            ad:{
                img:'',
                title:'',
                subTitle:'',
                price:'',
                ori_price:'',
                link:''
            },
            imageShow:false,
            current:{
                type:null,
                index:null
            }
        }
    },
    created(){
        this.getTheme()
        this.getTemplate()
    },
    methods:{
        getTheme(){
            this.loading = true
            get_theme().then(r=>{
                this.selectTheme = r.data.body.theme
                this.loading = false
            }).catch(()=>{
                this.loading = false
            })
        },
        changeTheme(){
            change_theme({theme:{theme:this.selectTheme}}).then(()=>{
                this.getTheme()
                this.$message.success('修改成功')
            }).catch(()=>{})
        },
        getTemplate(){
            this.t_loading = true
            get_template().then(r=>{
                let _template = r.data.body
                if(_template.banners !== undefined) this.banners = _template.banners
                if(_template.types !== undefined) this.types = _template.types
                if(_template.message !== undefined) this.message = _template.message
                if(_template.limit !== undefined) this.limit = _template.limit
                if(_template.newitem !== undefined) this.newitem = _template.newitem
                if(_template.ad !== undefined) this.ad = _template.ad
                this.t_loading = false
            }).catch(()=>{
                this.t_loading = false
            })
        },
        changeTemplate(type){
            let _data = {}
            _data[type] = {}
            change_template(_data).then(()=>{

            })
        },
        changeImage(type,index){
            this.imageShow = true
            this.current.type = type
            this.current.index = index
        },
        confirmImage(val){
            let _data = this.current.type === 'banner' ? this.banners : (this.current.type === 'type' ? this.types : this.ad)
            if(this.current.index !== null){
                _data[this.current.index].img = val[0].url
            }else{
                _data.img = val[0].url
            }
            this.imageShow = false
        },
        addBanner(){
            if(this.banners.length === 6){
                this.$message.warning('已有6张广告图')
                return
            }
            this.banners.push({
                img:'',
                link:'',
                sort:this.banners.length
            })
        },
        toFront(type,index){
            let _data = type === 'banner' ? this.banners : this.types
            if(_data[index].sort === 0) return
            _data[index - 1].sort += 1
            _data[index].sort -= 1
            _data[index] = _data.splice(index - 1, 1, _data[index])[0]
        },
        toBack(type,index){
            let _data = type === 'banner' ? this.banners : this.types
            if(_data[index].sort === _data.length - 1) return
            _data[index + 1].sort -= 1
            _data[index].sort += 1
            _data[index] = _data.splice(index + 1, 1, _data[index])[0]
        },
        toDelete(type,index){
            let _data = type === 'banner' ? this.banners : this.types
            this.$confirm('是否确认删除？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消'
            }).then(()=>{
                _data.splice(index,1)
                _data.map((v,n)=>{
                    v.sort = n
                })
                console.log(_data)
            }).catch(()=>{})
        }
    }
}
</script>

<style>
.set-module .el-radio__inner{
    position: absolute;
    margin-top: -275px;
    margin-left: 17px;
    z-index: 2;
}
</style>
<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.set-module{
    margin-bottom:20px;
}
.set-module-title{
    font-size:$large-font-size;
    line-height:40px;
    margin-bottom:10px;
    border-bottom:1px solid $line-color;
}
.module-template{
    display:inline-block;
    width:200px;
}
.module-content{
    display:inline-block;
    width:calc(100% - 210px);
    margin-left:10px;
}
.module-content-title>div,.module-content-content>div{
    display:inline-block;
    vertical-align:middle;
}
.module-content-title{
    padding:10px 0;
    border-bottom:1px dotted $line-color;
    margin-bottom:10px;
}
.module-content-content{
    margin-bottom:10px;
}
.module-content-image .el-image{
    border:1px solid $line-color;
}
.image-cover-button{
    position:absolute;
    z-index:2;
    text-align:center;
    background-color:rgba(0,0,0,0.5);
    display:none;
}
.module-content-image:hover .image-cover-button{
    display:block;
}
.module-tip{
    color:$other-font-color;
    margin-top:10px;
}
.module-content-button span{
    color:$sub-font-color;
    cursor:pointer;
}
.module-content-button span:hover{
    color:$main-color;
}
</style>