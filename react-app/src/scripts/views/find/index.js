import React, { Component } from "react"
import { Title } from "../../components/title"
import { connect } from "react-redux"
import { getPhotos } from "../../actions";
import { WingBlank, WhiteSpace } from 'antd-mobile';
@connect(
    state => {
        return {
            photos: state.data.photos
        }
    }
)
class Find extends Component {
    componentWillMount() {
        const { dispatch, photos } = this.props;
        if (photos.length <= 0) {
            dispatch(getPhotos("/react/getPhoto"))
        }
    }
    render() {
        const { photos } = this.props;
        return (
            <div>
                <Title title="发现" />
                {
                    photos.map((item, i) => {
                        return (
                            <div key={i}>
                                <WingBlank>
                                    <WhiteSpace />
                                    <img src={item.img} alt="" style={{ width: "100%", height: 300 }} />
                                    <WhiteSpace />
                                </WingBlank>
                            </div>
                        )
                    })
                }
                <div style={{ width: "100%", height: 80 }}></div>
            </div>
        )
    }
}
export default Find;