import React, { Component } from 'react';
import { connect } from "react-redux"
import { Carousel, WingBlank } from 'antd-mobile';
@connect(
    state => {
        console.log(state.data);
        return {
            data: state.data
        }
    }
)
class Guide extends Component {
    componentWillMount() {
        if (localStorage.guideCount) {
            localStorage.guideCount++;
            if (localStorage.guideCount > 3) {
                const { history } = this.props;
                history.push("/app/home")
            }
        } else {
            localStorage.guideCount = 1;
        }
    }
    goHome = (index) => {
        if (index === this.props.data.guides.length - 1) {
            const { history } = this.props;
            history.push("/app/home")
        }
    }
    render() {
        console.log(this.props.data)
        const {
            data: {
                guides
            }
        } = this.props;
        return (
            <div >
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        dots={true}
                    >
                        {guides.map((item, i) => (
                            <div key={i} className="box">
                                <img
                                    src={item}
                                    alt=""
                                    style={{ width: '100%', height: "100%" }}
                                    onClick={() => this.goHome(i)}
                                />
                            </div>
                        ))}
                    </Carousel>
                </WingBlank>
            </div>
        )
    }
}
export default Guide;