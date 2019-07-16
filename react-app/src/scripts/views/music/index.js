import React, { Component } from "react"
import { Title } from "../../components/title"
import { connect } from "react-redux"
import { getMusics, getMusicUrl } from "../../actions";
import { NoticeBar, WhiteSpace, Icon } from 'antd-mobile';
import "./index.scss"
@connect(
    state => {
        return {
            allMusics: state.data.allMusics,
            musicUrl: state.data.musicUrl
        }
    }
)
class Music extends Component {
    componentWillMount() {
        const { dispatch, allMusics } = this.props;
        if (allMusics.length <= 0) {
            dispatch(getMusics("/react/getMusic"))
        }
    }
    play(url) {
        this.props.dispatch(getMusicUrl(url))
    }
    render() {
        const { allMusics, musicUrl } = this.props;
        return (
            <div>
                <Title title="音乐" />
                <div style={{ marginTop: 60 }}>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        通知:点击音乐播放按钮即可播放,功能还在完善中,敬请期待!!!
                    </NoticeBar>
                    {
                        allMusics.map((item, i) => {
                            return (
                                <div key={i} style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", marginBottom: 10, position: "relative" }}>
                                    <h3 style={{ width: 40, textAlign: "center" }}>{i + 1}</h3>
                                    <img src={item.pic} alt="" style={{ width: 50, height: 50 }} />
                                    <p style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
                                        <span>{item.name}</span>
                                        <span>{item.singer}</span>
                                    </p>
                                    <i
                                        className="iconfont icon icon-bofanganniu"
                                        style={{ fontSize: 30, position: "absolute", right: 0 }}
                                        onClick={() => this.play(item.url)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{ width: "100%", height: 80 }}></div>
                {/* <div className="musicBox">
                    <audio ref="audio" controls="controls" autoPlay="autoplay" loop="loop" src={musicUrl} ></audio>
                </div> */}
            </div>
        )
    }
}
export default Music;