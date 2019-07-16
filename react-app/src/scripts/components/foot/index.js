import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import "./index.scss"
class Foot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foots: [
                { txt: "广场", path: "/app/home", name: "home", icon: "icon-guangchang" },
                {
                    txt: "阅读",
                    path: "/app/book",
                    name: "book",
                    icon: "icon-yuedu"
                },
                { txt: "发现", path: "/app/find", name: "find", icon: "icon-youqu" },
                { txt: "音乐", path: "/app/music", name: "music", icon: "icon-icon14" }
            ],
        }
    }
    render() {
        const {
            foots,
        } = this.state;
        return (
            <footer>
                {
                    foots.map((foot, i) => {
                        return (
                            <div key={i}>
                                <NavLink to={foot.path} activeClassName="nav-active">
                                    <i className={"iconfont icon " + foot.icon}> </i>
                                    <span> {foot.txt}</span>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </footer>
        )
    }
}
export default Foot;