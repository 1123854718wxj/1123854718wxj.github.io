//发表文章
import React, { Component } from "react"
import { List, InputItem, WhiteSpace, WingBlank, Button, TextareaItem, Picker, Toast } from 'antd-mobile';
import { NavBar, Icon } from 'antd-mobile';
import { history } from "../../../utils";
import { axios } from "../../../utils"
import head from "../../mobx/head"
import { observer } from "mobx-react"

const seasons = [
    [
        {
            label: 'HTML5',
            value: 'HTML5',
        },
        {
            label: 'NodeJs',
            value: 'NodeJs',
        },
        {
            label: 'Vue',
            value: 'Vue',
        },
        {
            label: 'React',
            value: 'React',
        },
        {
            label: 'ES6',
            value: 'ES6',
        },
        {
            label: '原生JS',
            value: '原生JS',
        },
    ],
];
@observer
class Submit extends Component {
    goBack = () => {
        history.go(-1)
    }
    submit = (headPic, nickName) => {
        var userInfo = sessionStorage.userInfo;
        var userName = "";
        if (userInfo) {
            userName = JSON.parse(userInfo).token;
        }
        //标题
        var type = this.type.state.value;
        //内容
        var text = this.text.state.value;
        //类别
        var title = this.state.sValue && this.state.sValue[0];
        //用户图片
        var userPhoto = headPic;
        //用户昵称
        var nickName = nickName;
        if (type && text && title) {
            axios.post("/react/submitBooks", { title, text, type, userPhoto, nickName, userName }).then(res => {
                console.log(res);
            })
        } else {
            Toast.offline('赶快提交数据吧!', 1);
        }
    }
    state = {
        data: { seasons },
    }
    render() {
        const { headPic, nickName } = head;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    rightContent={[
                        <i key="1" className="iconfont icon icon-dongtai" style={{ fontSize: 20 }} onClick={() => this.submit(headPic, nickName)} />
                    ]}
                    onLeftClick={this.goBack}
                >撰写文章</NavBar>
                <WingBlank>
                    <WhiteSpace />
                    <InputItem
                        clear
                        placeholder="请输入标题"
                        ref={el => this.type = el}
                    />
                    <WhiteSpace />
                    <Picker
                        data={seasons}
                        title="选择类别"
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue}
                        onChange={v => this.setState({ sValue: v })}
                    >
                        <List.Item arrow="horizontal">类别</List.Item>
                    </Picker>
                    <WhiteSpace />
                    <TextareaItem
                        autoHeight
                        labelNumber={5}
                        placeholder="请输入正文"
                        ref={el => this.text = el}
                    />
                </WingBlank>
            </div>
        )
    }
}
export default Submit;