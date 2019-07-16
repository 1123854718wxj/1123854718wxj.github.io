import React, { Component } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "../home";
import Foot from "../../components/foot"
import Book from "../book"
import Find from "../find"
import Music from "../music";
export class App extends Component {
    render() {
        return (
            <div className="box">
                <Switch>
                    <Route path="/app/home" component={Home} />
                    <Route path="/app/book" component={Book} />
                    <Route path="/app/find" component={Find} />
                    <Route path="/app/music" component={Music} />
                    <Route render={
                        () => (<Redirect to={"/app/home"} />)
                    } />
                </Switch>
                <Foot />
            </div>
        )
    }
}