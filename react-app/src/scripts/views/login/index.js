import React, { Component } from "react"
import "./index.scss"
import { WingBlank, List, InputItem, WhiteSpace, Button, NavBar, Icon } from "antd-mobile"
import { axios, history } from "../../../utils"
export const mobileReg = /^1(3|5|7|8|9)\d{9}$/;
export const codeReg = /^\d{4}$/
let timer = null;
export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codeBtn: true,
            loginBtn: true,
            txt: "获取验证码",
            count: 60,
            flag: true
        }
    }
    getMobile = (val) => {
        if (this.state.flag) {
            this.setState({
                codeBtn: !mobileReg.test(val)
            })
        }
        this.setState({
            loginBtn: !(mobileReg.test(val) && codeReg.test(this.code.state.value))
        })
    }
    getCode = (val) => {
        this.setState({
            loginBtn: !(mobileReg.test(this.mobile.state.value) && codeReg.test(val))
        })
    }
    sendCode = () => {
        axios.post("/react/sendCode", {
            mobile: this.mobile.state.value
        }).then(res => {

        })

        this.setState({
            codeBtn: true,
            flag: false
        })
        timer = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count,
                    txt: "倒计时" + this.state.count + "s",
                    codeBtn: true
                })
            } else {
                clearInterval(timer)
                this.setState({
                    txt: "获取验证码",
                    codeBtn: !mobileReg.test(this.mobile.state.value),
                    count: 60,
                    flag: true
                })
            }
        }, 1000)
    }
    gotoLogin = () => {
        axios.post("/react/checkCode", {
            mobile: this.mobile.state.value,
            code: this.code.state.value
        }).then(res => {
            if (!!res.data.type) {
                var token = res.data.token;
                sessionStorage.userInfo = JSON.stringify({ token });
                this.props.history.push("/app/home")
            } else {
                sessionStorage.userInfo = "";
            }
        })
    }
    render() {
        const { codeBtn, loginBtn, txt } = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.push("/app/home")}
                >登录</NavBar>
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem
                            type="tel"
                            placeholder="请输入手机号"
                            clear
                            onChange={this.getMobile}
                            ref={el => this.mobile = el}
                        >
                            手机号
                        </InputItem>
                        <InputItem
                            type="number"
                            placeholder="请输入验证码"
                            clear
                            onChange={this.getCode}
                            ref={el => this.code = el}
                        >
                            验证码
                        </InputItem>
                        <Button type="warning" inline className="checkCode" disabled={codeBtn} onClick={this.sendCode}>{txt}</Button>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" disabled={loginBtn} onClick={this.gotoLogin}>登录</Button>
                </WingBlank>
            </div>
        )
    }
}