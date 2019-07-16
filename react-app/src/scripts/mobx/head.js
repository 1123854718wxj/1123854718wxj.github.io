import { observable, action } from "mobx"
import { axios } from "../../utils"

class Head {
    @observable headPic = ""
    @observable nickName = ""
    //获取用户头像
    @action getHeadPhoto = (userName) => {
        axios.post("/react/getUserPhoto", { userName }).then(res => {
            res.data.result && res.data.result.forEach(item => {
                console.log(item)
                if (item.photo !== undefined) {
                    this.headPic = item.photo.replace(/public/, "http://182.92.171.203:8880")
                    this.nickName = item.nickName
                }
            });
        })
    }
}

export default new Head()