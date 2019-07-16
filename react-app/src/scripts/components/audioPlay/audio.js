import React, { Component } from "react"
import { connect } from "react-redux"
import "./index.scss"
@connect(
    state => {
        return {
            musicUrl: state.data.musicUrl
        }
    }
)
class AudioPlay extends Component {
    render() {
        const { musicUrl } = this.props;
        console.log(musicUrl)
        return (
            <div className="musicBox">
                <audio ref="audio" controls="controls" autoPlay="autoplay" loop="loop" src={musicUrl} ></audio>
            </div>
        )
    }
}
export default AudioPlay;