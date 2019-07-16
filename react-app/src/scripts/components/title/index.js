import React, { Component } from "react"
import { NavBar, Icon } from 'antd-mobile';
import { history } from '../../../utils'
import "./index.scss"
export class Title extends Component {
    goBack = () => {
        history.go(-1)
    }
    render() {
        const { title, show } = this.props;
        return (
            <div className="title">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.goBack(show)}
                >{title}</NavBar>

            </div>
        )
    }
}