<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
        <div class="hosname">{{workData.baseMap?.hosname}}</div>
        <div class="line"></div>
        <div> 3333</div>
        <div class="dot">.</div>
        <div class="hosdeparment">11111</div>
        </div>

        <div class="center">
            <h1 class="time">2024年4月30日</h1>
            <div class="container">
                <div class="item" v-for="item in 6" :key="item">
                    <div class="top1">123</div>
                    <div class="buttom">444</div>
                </div>
            </div>
            <el-pagination
                layout="prev, pager, next"
                :total="50"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { reqHospitalWork } from '@/api/hospital';
import { useRoute,useRouter } from 'vue-router';
import type { HospitalWordData } from '@/api/hospital/type';
//获取路由对象
let $route = useRoute();
//获取路由器对象
let $router = useRouter();
//分页器当前页码
let pageNo = ref<number>(1);
//每一页展示几条数据
let limit = ref<number>(6);
//存储医院科室挂号的数据
let workData = ref<any>({});
//组件挂载完毕发一次请求
onMounted(() => {
  fetchWorkData();
});
//获取挂号的数据
const fetchWorkData = async () => {
  let result = await reqHospitalWork(
    pageNo.value,
    limit.value,
    $route.query.hoscode,
    $route.query.depcode
  );
  console.log(result);
  if (result.code == 200) {
    workData.value = result.data;
   
  }
  
};
</script>

<style scoped lang="scss">
.wrap {
    .top {
        display: flex;
        color: #7f7f7f;

        .line {
            width: 5px;
            height: 20px;
            background: skyblue;
            margin: 0 5px;
        }

        .dot {
            margin: 0 10px;
            background: skyblue;
        }
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;

        .time {
            font-weight: 900;
        }

        .container {
            width: 100%;
            display: flex;
            margin: 30px 0px;

            .item {
                flex: 1;
                width: 100%;
                border: 1px solid skyblue;
                margin: 0px 10px;
                transition: all 0.3s;

                .top1 {
                    background: #e8f2ff;
                    height: 30px;
                    width: 100%;
                    text-align: center;
                    line-height: 30px;
                }

                .buttom {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
            }
        }
    }
}
</style>

