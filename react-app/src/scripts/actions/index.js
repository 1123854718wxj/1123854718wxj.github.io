
import { axios } from "../../utils"

//轮播图
export const GETGUIDES = "GETGUIDES";
export const getGuides = () => {
    return {
        type: GETGUIDES,
    }
}
//获取音乐播放地址
export const GETMUSICURL = "GETMUSICURL";
export const getMusicUrl = (musicUrl) => {
    return {
        type: GETMUSICURL,
        musicUrl
    }
}
//获取用户登录手机号
export const GETUSERINFO = "GETUSERINFO";
export async function getUserInfo(url) {
    var res = await axios.get(url);
    return {
        type: GETUSERINFO,
        userInfo: res.data.result
    }
}
//获取新闻
export const GETNEWS = "GETNEWS";
export async function getNews(url) {
    var res = await axios.get(url);
    return {
        type: GETNEWS,
        news: res.data.result
    }
}
//获取新闻详情
export const GETNEWSDETAIL = "GETNEWSDETAIL";
export async function getNewsDetail({ url, params }) {
    var res = await axios.get(url, { params });
    return {
        type: GETNEWSDETAIL,
        newsDetail: res.data.result
    }
}
//获取新闻评论
export const GETNEWSCONTENT = "GETNEWSCONTENT";
export async function getNewsContent({ url, newsId }) {
    var res = await axios.post(url, { newsId });
    console.log(res.data.result)
    return {
        type: GETNEWSCONTENT,
        newsContent: res.data.result
    }
}

//获取美图资源
export const GETPHOTOS = "GETPHOTOS";
export async function getPhotos(url) {
    var res = await axios.get(url);
    return {
        type: GETPHOTOS,
        photos: res.data.result
    }
}

//获取音乐资源
export const GETMUSICS = "GETMUSICS";
export async function getMusics(url) {
    var res = await axios.get(url);
    console.log(res)
    return {
        type: GETMUSICS,
        allMusics: res.data.result
    }
}

//获取文章类型
export const GETBOOKSTYPES = "GETBOOKSTYPES";
export async function getBooksTypes(url) {
    var res = await axios.get(url);
    return {
        type: GETBOOKSTYPES,
        types: res.data.result
    }
}

//获取所有文章
export const GETALLBOOKS = "GETALLBOOKS";
export async function getAllBooks(url) {
    var res = await axios.get(url);
    console.log(res);
    return {
        type: GETALLBOOKS,
        allBooks: res.data.result.reverse()
    }
}
