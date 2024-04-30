// 本地存储操作用户信息的方法




export const SET_TOKEN = (userInfo) => {
    localStorage.setItem('USERINFO',userInfo)
}

export const GET_TOKEN = () => {
    return localStorage.getItem('USERINFO')
}

// 清除本地储存用户相关的数据
export const REMOVE_TOKEN = () => {
    localStorage.removeItem('USERINFO')
}