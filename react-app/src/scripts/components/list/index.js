import React, { Component } from "react"
import { List, Card, Badge, WingBlank, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
class BookList extends Component {
    render() {
        const { items } = this.props;
        console.log(items)
        return (
            <div>
                {
                    items.map((item, i) => {
                        var time = new Date(item.time);
                        var newTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                        return (
                            <WingBlank key={i}>
                                <Card style={{ marginBottom: 20 }}>
                                    <Card.Header
                                        thumb={item.userPhoto}
                                        extra={<span>{item.nickName}<br /><br />发表于:{newTime}</span>}
                                    />
                                    <List.Item>
                                        <Badge text={item.title} hot style={{ marginLeft: 12 }} />
                                    </List.Item>
                                    <div style={{ fontSize: 20, paddingLeft: 10, fontWeight: "bold" }}>{item.type}</div>
                                    <Card.Body>
                                        <div><Item wrap>
                                            {item.text}
                                        </Item></div>
                                    </Card.Body>
                                </Card>
                            </WingBlank>
                        )
                    })
                }
            </div>
        )
    }
}
export default BookList