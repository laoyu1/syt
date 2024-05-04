<template>
  <div class="login_container">
    <!-- title:对话框左上角的标题 v-model:控制对话框显示与隐藏 -->
    <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog">
      <!-- 对话框身体部分结构 -->
      <div class="content">
        <el-row>
          <!-- 左侧结构：收集号码登录、微信扫一扫登录 -->
          <el-col :span="12">
            <div class="login">
              <!-- 手机账号密码登录 -->
              <div v-show="scene == 0">
                <el-form :model="loginParam" :rules="rules" ref="form">
                <el-form-item prop="phone">
                  <el-input
                    placeholder="请你输入手机号码"
                    :prefix-icon="User"
                    v-model="loginParam.phone"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    placeholder="请输入手机验证码"
                    :prefix-icon="Lock"
                    v-model="loginParam.code"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="!isPhone || flag ? true : false">
                    <countDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                    <span v-else @click="getCode">获取验证码</span>
                  </el-button>
                </el-form-item>
              </el-form>
                <el-button style="width: 100%" type="primary" size="default"  :disabled="!isPhone || loginParam.code.length < 6 ? true : false" @click="login">
                      用户登录
                  </el-button>
                <div class="buttom" @click="changeScene">
                  <p>微信扫码登录</p>
                  <svg
                    t="1714136324011"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11982"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445"
                      p-id="11983"
                    ></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445"
                      p-id="11984"
                    ></path>
                  </svg>
                </div>
              </div>
              <!-- 微信扫码登录 -->
              <div class="webchat" v-show="scene == 1">
                   <!-- 在这个容器当中显示微信扫码登录页面 -->
                <div id="login_container"></div>
                <div class="phone" @click="handler">
                    <p>手机短信验证码登录</p>
                    <svg
                      t="1685676069573"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2476"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                        p-id="2477"
                      ></path>
                    </svg>
                </div>
            </div>
          </div>
          </el-col>
          <!-- 右侧结构：二维码 -->
          <el-col :span="12">
            <div class="leftContent">
              <div class="top">
                <div class="item">
                  <img src="../../assets/images/code_app.png" alt="" />
                  <svg
                    t="1714136947038"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="12158"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M767.818667 409.173333C867.338667 444.266667 938.666667 539.136 938.666667 650.666667c0 42.709333-10.496 83.978667-30.261334 120.842666-1.792 3.338667-4.992 8.928-9.696 16.96l14.613334 53.557334c6.506667 23.893333-15.402667 45.813333-39.296 39.296l-53.642667-14.634667-6.229333 3.669333A254.933333 254.933333 0 0 1 682.666667 906.666667c-77.994667 0-147.84-34.88-194.805334-89.888a352.608 352.608 0 0 1-56.64 4.554666c-63.338667 0-124.266667-16.853333-177.472-48.298666-1.834667-1.088-6.410667-3.733333-13.632-7.893334l-80.544 21.653334c-23.914667 6.432-45.76-15.573333-39.146666-39.434667l21.792-78.752a961.205333 961.205333 0 0 1-15.904-27.317333A336.384 336.384 0 0 1 85.333333 480c0-188.618667 154.965333-341.333333 345.888-341.333333 159.914667 0 297.984 108.010667 335.818667 259.296 0.949333 3.765333 1.173333 7.552 0.778667 11.2z m-68.106667-13.952C662.88 282.037333 555.178667 202.666667 431.221333 202.666667 275.434667 202.666667 149.333333 326.933333 149.333333 480c0 46.272 11.498667 90.837333 33.194667 130.698667 2.88 5.290667 10.176 17.706667 21.621333 36.746666a32 32 0 0 1 3.413334 25.013334l-10.517334 37.994666 39.232-10.549333a32 32 0 0 1 24.234667 3.146667c14.272 8.192 22.773333 13.098667 25.802667 14.890666A283.882667 283.882667 0 0 0 431.221333 757.333333c6.154667 0 12.288-0.192 18.389334-0.576A255.061333 255.061333 0 0 1 426.666667 650.666667c0-141.386667 114.613333-256 256-256 5.728 0 11.413333 0.192 17.045333 0.554666z m133.706667 397.056a32 32 0 0 1 3.338666-24.725333 996.672 996.672 0 0 0 15.242667-26.293333A190.997333 190.997333 0 0 0 874.666667 650.666667c0-106.037333-85.962667-192-192-192s-192 85.962667-192 192 85.962667 192 192 192a190.933333 190.933333 0 0 0 98.570666-27.2c2.208-1.322667 8.288-4.874667 18.517334-10.837334a32 32 0 0 1 24.522666-3.210666l12.565334 3.424-3.424-12.565334zM330.666667 426.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m192 0a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m85.333333 202.666666a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m149.333333 0a32 32 0 1 1 0-64 32 32 0 0 1 0 64z"
                      fill="#000000"
                      p-id="12159"
                    ></path>
                  </svg>
                  <p>微信扫一扫关注</p>
                  <p>"快速预约挂号"</p>
                </div>
                <div class="item">
                  <img src="../../assets/images/code_login_wechat.png" alt="" />
                  <svg
                    t="1714137248058"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="13353"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                      p-id="13354"
                    ></path>
                  </svg>
                  <p>扫一扫下载</p>
                  <p>"预约挂号"APP</p>
                </div>
              </div>
              <p class="tip">尚医通官方指定平台</p>
              <p class="tip">快速挂号 安全放心</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog"> 关闭窗口 </el-button>
      
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { ref, reactive, computed, watch } from "vue";
// 获取user仓库的数据(visiable)可以控制login组件的对话框显示与隐藏
import useUserStore from "@/store/modules/interface/user";
let userStore = useUserStore();
import { useRoute,useRouter } from "vue-router";
// 引入wx扫码登录参数请求
import { reqWxLogin } from "@/api/hospital";
import type { WXLoginResponseData } from "@/api/hospital/type";

// 引入倒计时组件
import countDown from '../countdown/index.vue'
import { ElMessage } from "element-plus";
// 定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false) //flag为真，开启倒计时

let form = ref<any>()

let scene = ref<number>(0); //0代表手机号码登录 1：微信扫码登录

// 获取路由器对象
let $route = useRoute()
let $router = useRouter()


// 点击微信扫码登录 | 微信小图标
const changeScene = async() => {
  scene.value = 1;
  // 生成微信扫码登录的二维码页面
   //发请求获取微信扫码二维码需要参数
  //咱们在想硅谷学校的服务器发请求,获取微信扫码登录页面参数
  //还需要携带一个参数:告诉学校服务器用户授权成功以后重定向项目某一个页面
  let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
  let result: WXLoginResponseData = await reqWxLogin(redirect_URL);
  // console.log(result);
  
  //生成微信扫码登录二维码页面
  //@ts-ignore
  new WxLogin({
    self_redirect: true, //true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
    id: "login_container", //显示二维码容器设置
    appid: result.data.data.appid, //应用位置标识appid
    scope: "snsapi_login", //当前微信扫码登录页面已经授权了
    redirect_uri: result.data.data.redirectUri, //填写授权回调域路径,就是用户授权成功以后，微信服务器向公司后台推送code地址
    state: result.data.data.state, //state就是学校服务器重定向的地址携带用户信息
    style: "black",
    href: "",
  });
};

// 点击手机短信验证码盒子回调
const handler = () => {
  scene.value = 0
}

// 收集表单数据----手机号码
let loginParam = reactive({
  phone: "",
  code: "", //收集验证码
});

// 计算当前表单元素收集的内容是否手机号码格式
let isPhone = computed(() => {
  //手机号码正则表达式
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  //返回布尔值:真代表手机号码、假代表的即为不是手机号码
  return reg.test(loginParam.phone);
});

// 获取验证码按钮的回调
const getCode = async () => {
   
    
    // 开启倒计时模式，使倒计时组件显示出来
    flag.value = true

    // 通知pinia仓库存储验证码
    try {
        // 获取验证码成功
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
    } catch (error) {
        // 获取验证码失败
    }
};

// 计数器子组件绑定的自定义事件
// 当倒计时为0时,通知父组件倒计时组件隐藏
const getFlag = (val:boolean) => {
    // 倒计时模式结束
    flag.value = val
}

// 点击用户登录按钮的回调
const login = async() => {
  // 保证表单校验两项都符合条件
  await form.value.validate()
    // 发起登录请求
    // 登录成功: 顶部组件需要展示用户名字,对话框关闭
    // 登录失败: 弹出对应登录失败的错误信息
   try {
        // 用户登录成功
        await  userStore.userLogin(loginParam)
        // 关闭对话框
        userStore.visiable = false
        // 获取url的query参数
        let redirect = $route.query.redirect
        if(redirect) {
          $router.push(redirect as string)
        }else{
          $router.push('./home')
        }
   } catch (error) {
    ElMessage({
        type: "error",
        message:(error as Error).message
    })
   }
}

// 自定义校验规则: 手机号码自定义校验规则
const validatorPhone = (rule:any,value:any,callBack:any) => {
    // rule: 表单校验规则对象
    // value: 当前文本内容
    // callBack: 回调函数
   
    
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    if(reg.test(value)) {
        callBack()
    }else{
        callBack(new Error('请输入正确的手机号码格式'))
    }
  }
//验证码自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  if (/^\d{6}$/.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
};

// 表单校验的规则
const rules = {
    //手机号码校验规则
  //required:代表当前字段务必进行校验
  //message:代表的校验错误的提示信息
  //trigger:代表表单校验触发的时机  change:文本发生变化的时候进行校验  blur:失却焦点的时候触发校验
  //min:代表的是最小位数
  //max:代表的是最大的位置
  // phone: [{ required: true, message: "手机号码务必11位", trigger: "change", min: 11 }],
  // code: [{ required: true, message: "验证码务必6位", trigger: "blur", min: 6 }],
    // 自定义校验规则
    phone:[{trigger:'change',validator:validatorPhone}],
    code: [{ trigger: "change", validator: validatorCode }],
};


// 关闭窗口按钮的回调
const closeDialog = () => {
  userStore.visiable = false;
};
  
// 监听场景的数值
watch(() => scene.value, (val:number) => {
  if(val==1){
    userStore.queryState()
  }
})


</script>

<style lang="scss" scoped>
.login_container {
  :deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 30px;
  }

  .login {
    padding: 20px;
    border: 1px solid #ccc;
    margin-right: 30px;
   
    .webchat {
      display: flex;
      flex-direction: column;
      align-items: center;

      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .buttom {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 10px 0px;
    }
  }

  .leftContent {
    .top {
      display: flex;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 130px;
          height: 130px;
        }

        p {
          margin: 5px 0;
        }
      }
    }
  }

  .tip {
    text-align: center;
    margin: 20px 0;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>