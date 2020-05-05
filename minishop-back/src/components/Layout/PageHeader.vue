<template>
<div>
    <div class="header-item">
        <div><i class="iconfont iconleimupinleifenleileibie2"></i></div>
        <div><i class="iconfont iconleimupinleifenleileibie"></i></div>
    </div>
    <div class="header-item">{{ $store.getters.title }}</div>
    <div class="header-item">
        {{ $store.getters.username }}
    </div>
</div>
</template>

<script>
export default{
}
</script>
