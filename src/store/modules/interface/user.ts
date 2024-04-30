// 定义用户相关的仓库
import { defineStore } from "pinia";
// 引入获取验证码的请求方法
import { reqCode, reqUserLogin } from "@/api/hospital";

import type { LoginData, UserLoginResponseData, UserInfo } from "@/api/hospital/type";
import type { UserState } from '../interface';
import { GET_TOKEN,REMOVE_TOKEN,SET_TOKEN } from "@/utils/user";
const useUserStore = defineStore('user', {
    state:() => {
        return {
            visiable: false, //用于控制登录组件中dialog的显示与隐藏
            code:'', //存储用户的验证码
            userInfo: JSON.parse(GET_TOKEN() as string) || {}
        }    
    },
    actions: {
        // 获取验证码方法
        async getCode(phone:string){
            // 在向服务器携带手机号码，获取验证码
            let result = await reqCode(phone)
            if(result.data.code == 200){
                this.code = result.data.data
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data.message))
            }
            
        },
        // 用户手机号码登录方法
        async userLogin(lgoinData:LoginData){
            let result:UserLoginResponseData =  await reqUserLogin(lgoinData)
            if(result.data.code == 200){
                this.userInfo = result.data.data
                // 本地存储持久化存储用户信息
                SET_TOKEN(JSON.stringify(this.userInfo))
                // 返回一个成功的promise
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
            
        },
        // 退出登录方法
        logout(){
            // 清空pinia仓库的数据
            this.userInfo = {}
            // 清空本地存储的数据
            REMOVE_TOKEN()
        }
    },
    getters: {

    }
})

export default useUserStore