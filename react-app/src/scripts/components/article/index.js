import React, { Component } from "react"
import { List, Card, Badge, Modal, Toast } from 'antd-mobile';
import book from "../../mobx/book"
import { observer } from "mobx-react"
import { history } from "../../../utils"
const Item = List.Item;
const alert = Modal.alert;
@observer
class Article extends Component {
    read = (booksId) => {
        book.read(booksId)
    }
    delete = (booksId) => {
        var userInfo = sessionStorage.userInfo;
        var userName = "";
        if (userInfo) {
            userName = JSON.parse(userInfo).token;
        }
        book.deleteBooks(booksId, userName)
    }
    componentWillMount() {
        var userInfo = sessionStorage.userInfo;
        var userName = "";
        if (userInfo) {
            userName = JSON.parse(userInfo).token;
        }
        if (sessionStorage.userInfo) {
            book.getUserBooks(userName)
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
    render() {
        const { logId, books, userInfo } = book;
        return (
            <div>
                {
                    books.map((item, i) => {
                        console.log(item)
                        var time = new Date(item.time);
                        var newTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                        return (
                            <Card key={i} style={{ marginBottom: 20 }}>
                                <Card.Header
                                    thumb={userInfo.src}
                                    extra={<span>发表于:<br />{newTime}</span>}
                                />
                                <List.Item>
                                    <Badge text={item.title} hot style={{ marginLeft: 12 }} />
                                </List.Item>
                                <div style={{ fontSize: 20, paddingLeft: 10, fontWeight: "bold" }}>{item.type}</div>
                                <Card.Body>
                                    <div><Item data-seed={logId} wrap={item.id ? true : false}>
                                        {item.text}
                                    </Item></div>
                                </Card.Body>
                                <Card.Footer content={<i key="3" className="iconfont icon icon-yuedu" style={{ fontSize: 20 }} ref="one" onClick={() => this.read(item._id)} >阅读</i>} extra={<div>
                                    <i key="1" className="iconfont icon icon-shanchu" style={{ fontSize: 20 }} onClick={() => this.delete(item._id)}>删除</i>
                                </div>} />
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}
export default Article;