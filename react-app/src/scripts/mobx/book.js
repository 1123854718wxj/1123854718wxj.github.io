import { observable, action, computed } from "mobx"
import { axios } from "../../utils"

class Book {
    @observable logId = "logId";
    @observable flag = false;
    @observable books = [];
    @observable userInfo = {}
    //获取用户发表文章
    @action getUserBooks = (userName) => {
        axios.post("/react/getUserBooks", { userName }).then(res => {
            console.log(res)
            this.books = res.data.result.reverse();
        })
    }
    //删除用户发表文章
    @action deleteBooks = (booksId, userName) => {
        axios.post("/react/deleteBooks", { booksId, userName }).then(res => {
            this.books = res.data.result;
        })
    }
    //点击阅读
    @action read = (booksId) => {
        console.log(booksId)
        this.books.forEach((item, i) => {
            if (item._id == booksId) {
                item.id = booksId;
            }
        })
    }
    //获取用户信息
    @action getUserInfo = (userName) => {
        console.log(userName)
        sessionStorage.userInfo && axios.post("/react/getUserPhoto", { userName }).then(res => {
            res.data.result.forEach(item => {
                console.log(item)
                this.userInfo = item;
                if (item.photo !== undefined) {
                    this.userInfo = item;
                    // this.userInfo.src = item.photo.replace(/public/, "http://localhost:8888/")
                    this.userInfo.src = item.photo.replace(/public/, "http://182.92.171.203:8880")
                }
            });
        })
    }
    //上传图像
    @action upload = (file, userName) => {
        console.log("111", userName)
        let data = new FormData(); //新建表单对象
        data.append("photo", file);
        data.append("userName", userName)
        axios({
            url: "/react/uploadPhoto",
            method: "POST",
            contentType: false,
            processData: false,
            data: data,
        }).then(res => {
            console.log(res.data.photoUrl)
            // this.userInfo.src = res.data.photoUrl.replace(/public/, "http://localhost:8888/");
            this.userInfo.src = res.data.photoUrl.replace(/public/, "http://182.92.171.203:8880");
        });
    }
}

export default new Book()