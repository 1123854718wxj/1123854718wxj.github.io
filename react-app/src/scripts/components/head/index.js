import React, { Component } from "react"
import { NavBar, Popover, Modal, Toast } from 'antd-mobile';
import { history } from "../../../utils"
import "./index.scss"
import head from "../../mobx/head"
import { observer } from "mobx-react"
const Item = Popover.Item;
const alert = Modal.alert;
@observer
class Head extends Component {
    goMy = () => {
        history.push("/my")
    }
    componentDidMount() {

        //获取头像信息
        setTimeout(() => {
            var userInfo = sessionStorage.userInfo;
            var userName = "";
            if (userInfo) {
                userName = JSON.parse(userInfo).token;
            }
            sessionStorage.userInfo && head.getHeadPhoto(userName)
        }, 200)
    }
    render() {
        const { headPic } = head;
        return (
            <div className="myHead">
                <NavBar
                    mode="light"
                    rightContent={[
                        <Pop key="1" />
                    ]}
                >广场</NavBar>
                <div className="logo" ref="logo" onClick={this.goMy}>
                    {/* <img src={sessionStorage.userInfo ? headPic : "http://182.92.171.203/files/images/photo.png"} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%" }} /> */}
                    <img src={headPic ? headPic : "http://182.92.171.203/files/images/photo.png"} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                </div>
            </div>
        )
    }
}
class Pop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: ""
        }
    }
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        })
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value
        })
        if (opt.props.value == "loginOut") {
            sessionStorage.removeItem("userInfo")
            history.push("/login")
        }
        if (opt.props.value == "submit") {
            if (sessionStorage.userInfo) {
                history.push("/submit")
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
    }
    render() {
        return (
            <Popover mask
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={this.state.visible}
                overlay={[
                    (<Item key="4" value="scan" data-seed="logId"><i className="iconfont icon icon-richscan_icon" style={{ fontSize: 24, verticalAlign: "middle", marginRight: 5 }} />扫一扫</Item>),
                    (<Item key="5" value="photo"><i className="iconfont icon icon-xiangji" style={{ fontSize: 24, verticalAlign: "middle", marginRight: 5 }} />拍  照</Item>),
                    (<Item key="6" value="submit"><i className="iconfont icon icon-bianji" style={{ fontSize: 24, verticalAlign: "middle", marginRight: 5 }} />发  表</Item>),
                    (<Item key="7" value="loginOut">
                        <span style={{ marginRight: 5 }}>{sessionStorage.userInfo ? <i className="iconfont icon-zhuxiao" style={{ fontSize: 24, verticalAlign: "middle", marginRight: 5 }} /> :
                            <i className="iconfont icon-wode" style={{ fontSize: 20, verticalAlign: "middle", marginRight: 5 }} />
                        }{sessionStorage.userInfo ? "注  销" : "登  录"}</span>
                    </Item>),
                ]}
                align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
            >
                <div style={{
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                    <i className="iconfont icon icon-jiahao" style={{ fontSize: 20 }} />
                </div>
            </Popover>
        )
    }
}

export default Head;