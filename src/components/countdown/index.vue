<template>
    <div>
        <span>获取验证码{{ time }}</span>
    </div>
</template>

<script setup lang="ts">
// 引入组合式api函数ref
import {ref,watch} from 'vue'
// 倒计时事件
let time = ref<number>(5)
// 接受父组件传递过来的props->flag：用于控制计数器组件的显示与隐藏
let props = defineProps(['flag'])
// 监听父组件传递过来props数据变化
watch(
    () => props.flag,
    () => {
        // 开启定时器
        let timer = 
        setInterval(() => {
            time.value--
            if(time.value == 0) {
                // 通知父组件倒计时模式结束
                $emit('getFlag', false)
                // 清楚定时器
                clearInterval(timer)
            }
        }, 1000)
    },
    {
        immediate:true
    }
)

let $emit = defineEmits(['getFlag'])
</script>

<style scoped>

</style>