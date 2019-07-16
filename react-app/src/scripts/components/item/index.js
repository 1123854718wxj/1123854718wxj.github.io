import React, { Component } from "react"
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { Link } from "react-router-dom"
class Item extends Component {
    render() {
        const { news } = this.props;
        return (
            <div>
                <Link to={"/newsDetail/detail/" + news._id + "?title=" + news.title}>
                    <Card style={{ marginBottom: 20 }}>
                        <Card.Header
                            thumb={news.image}
                        />
                        <Card.Body>
                            <div>{news.title}</div>
                        </Card.Body>
                        <Card.Footer extra={<div><i className="iconfont icon icon-yuedu" style={{ fontSize: 20 }} />阅读全文</div>} />
                    </Card>
                </Link>
            </div >
        )
    }
}
export default Item;