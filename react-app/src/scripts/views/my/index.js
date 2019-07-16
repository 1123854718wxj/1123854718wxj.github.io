import React, { Component } from "react"
import { Title } from "../../components/title"
import { Card, WingBlank, WhiteSpace, Accordion, List, Modal, Toast } from 'antd-mobile';
import "./index.scss"
import { history } from "../../../utils"
import Article from "../../components/article";
import book from "../../mobx/book"
import { observer } from "mobx-react"
const alert = Modal.alert;

@observer

class My extends Component {
    editUserInfo = () => {
        if (sessionStorage.userInfo) {
            history.push("/editUserInfo")
        } else {
            const alertInstance = alert('未登录', '是否马上登录???', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确定', onPress: () => history.push("/login") },
            ]);
            setTimeout(() => {
                // 可以调用close方法以在外部close
                console.log('auto close');
                alertInstance.close();
            }, 500000);
        }

    }
    componentWillMount() {
        var userInfo = sessionStorage.userInfo;
        var userName = "";
        if (userInfo) {
            userName = JSON.parse(userInfo).token;
        }
        book.getUserInfo(userName);
    }
    uploadImg = () => {
        if (sessionStorage.userInfo) {
            this.refs.one.click()
        } else {
            const alertInstance = alert('未登录', '是否马上登录???', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确定', onPress: () => history.push("/login") },
            ]);
            setTimeout(() => {
                // 可以调用close方法以在外部close
                console.log('auto close');
                alertInstance.close();
            }, 500000);
        }
    }
    upload = () => {
        var userInfo = sessionStorage.userInfo;
        var userName = "";
        if (userInfo) {
            userName = JSON.parse(userInfo).token;
        }
        console.log("upload", userName)
        let file = this.refs.one.files[0];//需要上传图片
        book.upload(file, userName);
    }
    render() {
        const { userInfo } = book;
        console.log(userInfo)
        return (
            <div>
                <Title title="个人中心" />
                <WingBlank size="lg" style={{ marginTop: 50 }}>
                    <WhiteSpace size="lg" />
                    <Card >
                        <i className="iconfont icon-gerenziliao" style={{ fontSize: 20, marginLeft: 10 }} >基本资料</i>
                        <div style={{ marginTop: 30, marginBottom: 30, backgroundColor: "#fff" }}>
                            <div style={{ display: "flex" }}>
                                <img src={userInfo.src ? userInfo.src : "http://182.92.171.203/files/images/photo.png"} alt="" onClick={this.uploadImg} style={{ width: 100, height: 100, borderRadius: "50%", marginLeft: 10 }} />
                                <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 20, lineHeight: "25px" }}>
                                    <span>{userInfo && userInfo.nickName}</span>
                                </p>
                            </div>
                        </div>
                        <input type="file" ref="one" accept="image/*" onChange={this.upload} style={{ display: "none" }} />
                        <Card.Body style={{ fontSize: 20 }}>
                            <div><i className="iconfont icon icon-shouji" style={{ fontSize: 20 }} /> :&emsp;{userInfo && userInfo.userName}</div>
                        </Card.Body>
                        <Card.Footer style={{ fontSize: 20, color: "#000" }}
                            content={<i className='iconfont icon icon-xingbie' style={{ fontSize: 20 }}> :&emsp;{userInfo && userInfo.sex}</i>} extra={<div onClick={this.editUserInfo}>
                                <i className="iconfont icon icon-bianji" style={{ fontSize: 20 }} /> </div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
                <WingBlank>
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <Accordion accordion openAnimation={{}} className="my-accordion">
                            <Accordion.Panel header="我的文章">
                                <List className="my-list">
                                    <List.Item style={{ overflowY: "scroll" }}>
                                        <Article />
                                    </List.Item>
                                </List>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                </WingBlank>
            </div>
        )
    }
}
export default My;