<template>
    <div>
        <div v-if="$route.query.orderId">
            <Detail></Detail>
        </div>
        <div v-else>
            <AllOrder></AllOrder>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
// 读取路由对象
let $route = useRoute()
import Detail from './detail/index.vue'
import AllOrder from './allOrder/index.vue'
</script>

<style scoped lang="scss">

</style>