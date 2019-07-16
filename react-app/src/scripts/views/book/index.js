import React, { Component } from "react"
import { Title } from "../../components/title"
import { axios } from "../../../utils"
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { connect } from "react-redux"
import "./index.scss"
import { getBooksTypes, getAllBooks } from "../../actions";
import BookList from "../../components/list";
@connect(
    state => {
        return {
            ...state.data
        }
    }
)
class Book extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getBooksTypes("/react/getBooksType"));
        setTimeout(function () {
            dispatch(getAllBooks("/react/getAllBooks"))
        }, 500)
    }
    render() {
        const { types, allBooks } = this.props;
        return (
            <div className="box">
                <Title title="阅读" />
                <div style={{ marginTop: 40 }}>
                    <Tabs tabs={types}
                        initialPage={0}
                        tabBarPosition="top"
                        renderTab={types => <span>{types}</span>}
                    >
                        {
                            types.map((item, i) => {
                                return (
                                    <div className="bookList" key={i}>
                                        <BookList
                                            type={item}
                                            items={allBooks.filter(g => g.title == item)}
                                        >
                                        </BookList>
                                    </div>
                                )
                            })
                        }
                    </Tabs>
                </div>
                <div style={{ width: "100%", height: 80 }}></div>
            </div>
        )
    }
}
export default Book;