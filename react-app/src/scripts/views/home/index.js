import React, { Component } from "react"
import Head from "../../components/head";
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from "react-redux"
import { getNews } from "../../actions"
import "./index.scss"
import Item from "../../components/item";
@connect(
    state => {
        return {
            news: state.data.news
        }
    }
)
class Home extends Component {
    componentWillMount() {
        if (this.props.news <= 0) {
            this.props.dispatch(getNews("/react/getNews"))
        }
    }
    render() {
        const { news } = this.props;
        return (
            <div className="box">
                <Head></Head>
                <WingBlank size="lg" style={{ overflowY: "auto", marginTop: 50, height: "100%" }}>
                    <WhiteSpace size="lg" />
                    <iframe width="450" scrolling="no" height="50" frameBorder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&icon=1&py=jiangxia&num=5&site=12"></iframe>
                    {
                        news && news.map((item, i) => {
                            return (
                                <Item
                                    key={i}
                                    news={item}
                                />
                            )
                        })
                    }
                    <WhiteSpace size="lg" />
                </WingBlank>
                <WingBlank size="lg" />
                <div style={{ width: "100%", height: 50 }}></div>
            </div>
        )
    }
}
export default Home;