<template>
<div>
    <page-header></page-header>
    <div>
        <page-side></page-side>
        <router-view />
    </div>
</div>
</template>

<script>
import PageHeader from './PageHeader'
import PageSide from './PageSide'
export default{
    components:{
        PageHeader,
        PageSide
    }
}
</script>