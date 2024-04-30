<template>
    <div>
        <!-- 首页轮播图的结构 -->
        <Carousel></Carousel>
        <!-- 首页收索医院的表单区域 -->
        <Search></Search>
        <!-- 底部显示医院的结构 -->
        <el-row>
            <el-col :span="20">
                <!-- 等级子组件 -->
                <Level @getLevel="getLevel"></Level>
                <!-- 地区 -->
                <Region @getRegion="getRegion"></Region>
                <div class="hospital" v-if="hasHospitalArr.length > 0">
                    <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
                </div>
                <el-empty v-else description="暂无数据" />
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20]"
                    :background="true" layout="prev, pager, next, jumper,sizes,total" :total="18"
                    @current-change="currentChange" @size-change="sizeChange" />



            </el-col>
            <el-col :span="4">
                <Tip></Tip>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { onMounted } from 'vue'
import { reqHospital } from '@/api/home'
// 引入首页轮播图组件
import Carousel from './carousel/index.vue'
// 引入首页搜索的组件
import Search from './search/index.vue'
// 引入首页等级的组件
import Level from './level/index.vue'
// 引入首页地区选择的组件
import Region from './region/index.vue'
// 展示医院新的卡片组件
import Card from './card/index.vue'
// 引入右侧组件
import Tip from './tip/index.vue'
// 分页器需要的数据
import { ref } from 'vue'
// 分页器页码
let pageNo = ref<number>(1)
// 一页展示一条数据
let pageSize = ref<number>(10)

// 存储已有的医院的数据
let hasHospitalArr = ref([])
// 存储医院总个数
let total = ref<number>(0)
// 存储医院的等级相应数据
let hostype = ref<string>('')
// 存储医院的地区
let districtCode = ref<string>('')

// 组件挂载完毕,发一次请求
onMounted(() => {
    getHospitalInfo()
})

// 获取已有的医院的数据
const getHospitalInfo = async () => {
    // 获取医院的数据:默认获取第一页,一页十个医院的数据
    let result = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
    // console.log(result.data.data.content);
    // console.log(result.data);

    if (result.data.code == 200)
        // 存储已有的医院数据
        hasHospitalArr.value = result.data.data.content
    // console.log(hasHospitalArr);

    // 存储医院的总个数
    total.value = result.data.data.totalElements
}

// 分页器页码发生变化时候回调
const currentChange = () => {
    getHospitalInfo()

}
// 分页器下拉菜单发生变化时侯会触发
const sizeChange = () => {
    getHospitalInfo()
}

// 子组件自定义事件:获取儿子给父组件传递过来的等级参数
const getLevel = (level: string) => {
    // 收集医院等级的参数
    hostype.value = level
    // 再次发请求
    getHospitalInfo()

}

// 子组件自定义事件:获取儿子给父组件传递过来的地区参数
const getRegion = (region: string) => {
    // 收集医院等级的参数
    districtCode.value = region
    // 再次发请求
    getHospitalInfo()

}
</script>

<style scoped lang="scss">
.hospital {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 48%;
        margin: 10px 0;
    }
}
</style>