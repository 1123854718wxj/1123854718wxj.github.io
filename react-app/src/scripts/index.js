import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Guide from "./views/guide"
import { App } from './views/app';
import My from "./views/my"
import { Login } from "./views/login"
import EditUserInfo from './views/editUserInfo';
import { Search } from './views/search';
import Submit from './views/submit';
import NewsDetail from './views/newsDetial';
import AudioPlay from './components/audioPlay/audio';
class IndexView extends Component {
    render() {
        return (
            <Router basename="/">
                <div>
                    <Route component={Layout} />
                </div>
            </Router>
        )
    }
}
class Layout extends Component {
    render() {
        return (
            <div>

                <Switch>
                    <Route path="/" component={Guide} exact />
                    <Route path="/guide" component={Guide} />
                    <Route path="/app" component={App} />
                    <Route path="/my" component={My} />
                    <Route path="/login" component={Login} />
                    <Route path="/editUserInfo" component={EditUserInfo} />
                    <Route path="/search" component={Search} />
                    <Route path="/submit" component={Submit} />
                    <Route path="/audioPlay" component={AudioPlay} />
                    <Route path="/newsDetail/detail/:newsId?" component={NewsDetail} />
                    <Route render={
                        () => (<Redirect to={"/app/home"} />)
                    } />
                </Switch>
                <AudioPlay />
            </div>

        )
    }
}
export default IndexView;