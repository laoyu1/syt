<template>
    <div class="hospital">
        <!-- 左侧导航区域 -->
        <div class="menu">
            <div class="top">
                <el-icon><HomeFilled /></el-icon>
                <span> / 医院信息</span>
            </div>
            <el-menu
                default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router=true
                @select="handleSelect"
            >
                <el-menu-item router="true" index="/hospital/register">
                    <el-icon><icon-menu /></el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail" >
                    <el-icon><document /></el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice">
                    <el-icon><setting /></el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close">
                    <el-icon><InfoFilled /></el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search">
                    <el-icon><Search /></el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧内容展示区域：路由组件展示位置 -->
        <div class="content">
            <!-- 子组件展示结构的地方 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail';

// 获取仓库对象
let detailStore = useDetailStore()

// 左侧菜单需要的图标
import {
  Document,
  Menu as IconMenu,
  Setting,
  InfoFilled,
  Search,
  HomeFilled,
} from '@element-plus/icons-vue'



import { useRouter,useRoute } from 'vue-router';
// 获取路由器
let $router = useRouter()
// 获取当前路由信息
let $route = useRoute()

// 组件挂载完毕：通知pinia仓库发请求获取医院详情的数据，存储在仓库中
onMounted(() => {
    // 获取医院详情的数据
    detailStore.getHospital($route.query.hoscode as string);
    // 获取某一个医院科室的数据
    detailStore.getDeparment($route.query.hoscode as string)
})

// 处理 el-menu 组件的 select 事件

const handleSelect = (index: string) => {
  
    // 使用 $router.push() 导航到目标页面，并保留当前页面的查询参数 hoscode
    $router.push({ path:index, query: { hoscode: $route.query.hoscode } });

}
</script>



<style scoped lang="scss">
.hospital {
     display: flex;

     .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
            color: #7f7f7f;
        }
     }
     
     .content{
        flex: 8;
     }
}
</style>