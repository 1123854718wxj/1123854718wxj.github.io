import React, { Component } from "react"
import { SearchBar } from 'antd-mobile';
import { Title } from "../../components/title"
export class Search extends Component {
    render() {
        return (
            <div>
                <Title title="搜索" />
                <SearchBar placeholder="Search" maxLength={8} />
            </div>
        )
    }
}