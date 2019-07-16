import React, { Component } from "react"
import { Title } from "../../components/title"
import { List, InputItem, WhiteSpace, WingBlank, Picker, Button } from 'antd-mobile';
import { connect } from "react-redux"
import { axios } from "../../../utils"
const seasons = [
    [
        {
            label: '男',
            value: '男',
        },
        {
            label: '女',
            value: '女',
        },
    ],
];
class EditUserInfo extends Component {
    state = {
        data: { seasons },
    }
    submit = () => {
        var nickName = this.nickName.state.value;
        var sex = this.state.sValue[0];
        console.log(nickName, sex)
        var userInfo = sessionStorage.userInfo;
        var userName = "";
        if (userInfo) {
            userName = JSON.parse(userInfo).token;
        }
        axios.post("/react/editUserInfo", { nickName, sex, userName }).then(res => {
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                <Title title="修改资料" />
                <div style={{ marginTop: 50 }}>
                    <WingBlank>
                        <WhiteSpace />
                        <List >
                            <InputItem
                                type="text"
                                placeholder="请输入昵称"
                                ref={el => this.nickName = el}
                            >昵称</InputItem>
                        </List>
                        <WhiteSpace />
                    </WingBlank>
                    <WingBlank>
                        <Picker
                            data={seasons}
                            title="选择性别"
                            cascade={false}
                            extra="请选择(可选)"
                            value={this.state.sValue}
                            onChange={v => this.setState({ sValue: v })}
                        >
                            <List.Item arrow="horizontal">性别</List.Item>
                        </Picker>
                        <WhiteSpace />
                        <Button type="warning" onClick={this.submit}>确认提交</Button><WhiteSpace />
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default EditUserInfo