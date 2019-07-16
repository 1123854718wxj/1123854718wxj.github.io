import React, { Component } from "react"
import { WingBlank, WhiteSpace, List, TextareaItem, Button, Toast } from 'antd-mobile';
import head from "../../mobx/head"
import { observer } from "mobx-react"
import { axios } from "../../../utils"
@observer
class SubmitNewsCon extends Component {
    submit = (newsId, nickName, headPic) => {
        var content = this.content.state.value;
        const { dispatch, match } = this.props;
        var userInfo = sessionStorage.userInfo;
        var userName = "";
        if (userInfo) {
            userName = JSON.parse(userInfo).token;
        }
        if (content) {
            axios.post("/react/submitNewsContent", { content, newsId, headPic, nickName, userName }).then(res => {
                //强制刷新页面
                window.location.reload(true)
            })
        } else {
            Toast.fail("您还未填写内容哦!!", 1);
        }
    }
    render() {
        const { flag, newsDetail } = this.props;
        const { headPic, nickName } = head;
        console.log(headPic, nickName)
        return (
            <List className={flag ? "active" : "hidden"}>
                <TextareaItem
                    rows={5}
                    count={100}
                    ref={el => this.content = el}
                />
                <Button type="warning" onClick={() => this.submit(newsDetail._id, nickName, headPic)}>提交评论</Button><WhiteSpace />
            </List>
        )
    }
}
export default SubmitNewsCon;