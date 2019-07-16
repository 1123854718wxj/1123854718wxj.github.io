import React, { Component } from "react"
class NewsContent extends Component {
    render() {
        const { contents, newTime } = this.props
        return (
            <div style={{ marginTop: 30, marginBottom: 30, backgroundColor: "#fff" }}>
                <div style={{ display: "flex" }}>
                    <img src={contents.headPic} alt="" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                    <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 20, lineHeight: "25px" }}>
                        <span>{contents.nickName}</span>
                        <span>评论时间:{newTime}</span>
                    </p>
                </div>
                <p style={{ marginTop: 20, textIndent: "32px" }}>{contents.content}</p>
            </div>
        )
    }
}
export default NewsContent;