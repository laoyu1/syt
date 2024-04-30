<template>
    <div>
        <el-card class="box-card" shadow="hover" @click="goDetail">
            <div class="content">
                <div class="left">
                    <div class="hospital_name">
                        {{hospitalInfo.hosname}}
                    </div>
                    <div class="tip">
                        <div class="level">
                            <svg t="1713790641294" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4284" width="16" height="16">
                                <path
                                    d="M840.88 330H631.67c-11.17 0-19.3-10.6-16.41-21.38l23.16-86.43c14.45-53.93-17.55-109.36-71.48-123.81A98.616 98.616 0 0 0 541.36 95c-43.88 0-84.3 29.38-96.17 73.66l-19.8 73.88C411.57 294.12 364.82 330 311.41 330H150c-17.67 0-32 14.33-32 32v448c0 17.67 14.33 32 32 32h618.88c30.8 0 57.23-21.94 62.9-52.21l72-384c7.39-39.38-22.82-75.79-62.9-75.79zM182 394h93.63L248.2 778H182V394z m586.88 384H312.37l27.6-386.39c69.97-11.15 128.47-62.44 147.25-132.51l19.8-73.88c4.07-15.2 18.52-26.22 34.35-26.22 3.01 0 6.04 0.4 9.01 1.2 19.76 5.29 31.52 25.68 26.23 45.43l-23.16 86.43c-6.57 24.52-1.47 50.13 13.98 70.26 15.45 20.14 38.87 31.69 64.25 31.69h209.21L768.88 778z"
                                    fill="#333333" p-id="4285"></path>
                            </svg>
                            <span>{{ hospitalInfo.param.hostypeString }}</span>
                        </div>
                        <div class="time">
                            <svg t="1713790779328" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5521" width="16" height="16">
                                <path
                                    d="M917.333333 512c0-223.850667-181.482667-405.333333-405.333333-405.333333S106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333z m-425.984-5.333333a21.333333 21.333333 0 0 0 6.101334 20.928l124.8 116.394666a21.333333 21.333333 0 0 0 29.12-31.189333l-118.08-110.122667L533.333333 501.333333v-170.666666a21.333333 21.333333 0 0 0-42.666666 0v170.666666c0 1.834667 0.213333 3.626667 0.682666 5.333334zM149.333333 512c0-200.298667 162.368-362.666667 362.666667-362.666667s362.666667 162.368 362.666667 362.666667-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512z m612.501334 305.002667a21.333333 21.333333 0 1 0-30.336 29.994666l74.304 75.157334a21.333333 21.333333 0 1 0 30.336-29.994667l-74.304-75.157333z m-480.362667 29.994666a21.333333 21.333333 0 0 0-30.336-29.994666L176.832 892.16a21.333333 21.333333 0 1 0 30.336 29.994667l74.304-75.157334zM778.496 128A117.525333 117.525333 0 0 1 896 245.333333a21.333333 21.333333 0 0 0 42.666667 0C938.666667 157.077333 866.901333 85.333333 778.496 85.333333h-20.992a21.333333 21.333333 0 1 0 0 42.666667h20.992zM245.504 85.333333C157.098667 85.333333 85.333333 157.077333 85.333333 245.333333a21.333333 21.333333 0 0 0 42.666667 0C128 180.629333 180.672 128 245.504 128h20.992a21.333333 21.333333 0 1 0 0-42.666667h-20.992z"
                                    fill="#3D3D3D" p-id="5522"></path>
                            </svg>
                            <span>每天{{ hospitalInfo.bookingRule.releaseTime }}放号</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <img :src="`data:img/jpeg;base64,${hospitalInfo.logoData}`" alt="">
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
// 获取路由器对象
let $router = useRouter()
// 点击医院卡片的时候跳转到医院详情页面
const goDetail = () => {
    // console.log(123);
    $router.push({path:'/hospital/register',query:{hoscode:props.hospitalInfo.hoscode}})
    
}
// 接受父组件传过来的props->即为已有的医院的数据
let props = defineProps(['hospitalInfo'])
// console.log(props);

</script>

<style scoped lang="scss">
.content {
    display: flex;
    justify-content: space-between;

    .right {
        img {
            width: 50px;
            height: 50px;
        }
    }

    .left {
        width: 60%;

        .tip {
            color: #7f7f7f;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;

            .level,
            .time {
                display: flex;
                align-items: center;

                span {
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>