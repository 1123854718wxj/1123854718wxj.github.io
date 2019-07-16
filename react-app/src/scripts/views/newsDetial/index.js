import React, { Component } from "react"
import { Title } from "../../components/title";
import { connect } from "react-redux"
import { getNewsDetail, getNewsContent } from "../../actions";
import { WingBlank, WhiteSpace, Toast, Modal } from 'antd-mobile';
import "./index.scss"
import NewsContent from "../../components/newsContent"
import SubmitNewsCon from "../../components/submitNewCon"
import { history } from "../../../utils"
const alert = Modal.alert;
@connect(
    state => {
        console.log(state.data)
        return {
            newsDetail: state.data.newsDetail,
            newsContent: state.data.newsContent
        }
    }
)
class NewsDetail extends Component {
    state = {
        flag: false,
    }
    componentWillMount() {
        const { dispatch, match } = this.props;
        dispatch(getNewsDetail(
            {
                url: "/react/getNewsDetail",
                params: {
                    newsId: match.params.newsId
                }
            }
        ))
        setTimeout(function () {
            dispatch(getNewsContent({
                url: "/react/getNewsContent",
                newsId: match.params.newsId
            }))
        }, 500)
    }
    contentBox = () => {
        if (sessionStorage.userInfo) {
            this.setState({
                flag: !this.state.flag
            })
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
        const { flag } = this.state;
        const { location, newsDetail, newsContent } = this.props;
        console.log(newsDetail)
        return (
            <div>
                <Title title={new URLSearchParams(location.search).get("title")} />
                <WingBlank>
                    <WhiteSpace />
                    <div style={{ marginTop: 50 }}>
                        <img src={newsDetail.image} alt="" style={{ width: "100%" }} />
                        <WhiteSpace />
                        <h2 style={{ fontWeight: "bolder", fontSize: 20, marginBottom: 20 }}>&emsp;{newsDetail.title}</h2>
                        <p style={{ marginBottom: 10 }}>&emsp;&emsp;{newsDetail.text}</p>
                        <i key="2" className="iconfont icon icon-pinglun" style={{ fontSize: 20, marginLeft: 275 }} onClick={this.contentBox} >评论</i>
                    </div>
                    {
                        newsContent.map((item, i) => {
                            console.log(item)
                            var time = new Date(item.time);
                            var newTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                            return (
                                <NewsContent
                                    key={i}
                                    newTime={newTime}
                                    contents={item}
                                />
                            )
                        })
                    }
                    <SubmitNewsCon
                        newsDetail={newsDetail}
                        flag={flag}
                    />
                </WingBlank>
            </div >
        )
    }
}
export default NewsDetail;