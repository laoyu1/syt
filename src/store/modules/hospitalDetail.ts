import { defineStore } from "pinia";

import { reqHospitalDeparment, reqHospitalDetail } from "@/api/hospital";

// 引入详情数据的ts类型
import type { HospitalDetail, DeparmentResponseData,DeparmentArr } from '@/api/hospital/type'
import type {DetailState} from './interface'

// pinia仓库写法：组合式api，选项式api
const useDetailStore = defineStore('Detail', {
    state: ():DetailState => {
        return {
            // 医院详情的数据
            hospitalInfo:({} as HospitalDetail),
            // 存储医院科室的数据
            deparmentArr:[]
        }
    },
    actions: {
        // 获取医院详情的方法
       async getHospital(hoscode:string){
            let result = await reqHospitalDetail(hoscode)
            if(result.data.code == 200)
                this.hospitalInfo = result.data.data
            
        },
        // 获取某一个医院科室的数据
        async getDeparment(hoscode:string){
            let result:DeparmentResponseData = await reqHospitalDeparment(hoscode)
            if(result.data.code == 200) {
                this.deparmentArr = result.data.data
            }
        }
    },
    getters: {

    }
})

// 获取仓库的方法对外暴露
export default useDetailStore