import axios from "axios"
import { Toast } from "antd-mobile";
import { history } from "../utils"
axios.defaults.baseURL = "http://182.92.171.203:8880"
// let token = "";
// axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] = token;//请求头
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";//配置请求头


function loadingToast(msg) {
    Toast.loading(msg, 1, () => {
        console.log('');
    });
}

function showToastNoMask(msg) {
    Toast.info(msg, 2, null, false);
}

function successToast(msg) {
    Toast.success(msg, 1);
}
function failToast(msg) {
    Toast.fail(msg, 1);
}

//请求拦截器
axios.interceptors.request.use(function (config) {
    // let userInfo = window.sessionStorage.userInfo;
    // if (userInfo) {
    //     userInfo = JSON.parse(userInfo);
    //     token = userInfo.token;
    // }
    // config.headers.common['token'] = token;

    //ajax请求发送之前
    Toast.hide();
    loadingToast("请求中...")
    return config;
}, function (error) {
    //ajax请求无法发送
    failToast("请求失败!")
    return Promise.reject(error);
})

//响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.code == "401") {
        //token失效时操作
        history.push("/login")
    }
    //成功接收到后台返回数据
    setTimeout(() => {
        successToast(response.data.msg)
    }, 500);
    return response;
}, function (error) {
    //后台数据返回失败
    failToast("服务器错误!")
    return Promise.reject(error);
})
export { axios }