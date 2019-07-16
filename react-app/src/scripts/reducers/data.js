import { GETGUIDES, GETUSERINFO, GETNEWS, GETUSERBOOKS, DELETEBOOKS, GETNEWSDETAIL, GETNEWSCONTENT, GETPHOTOS, GETMUSICS, GETBOOKSTYPES, GETALLBOOKS, GETMUSICURL, GETMUSICFLAG } from "../actions";


export const defaultState = {
    guides: [
        require("../../assets/images/slide1.jpg"),
        require("../../assets/images/slide2.jpg"),
        require("../../assets/images/slide3.gif"),
    ],
    userInfo: {},
    news: [],
    newsDetail: [],
    newsContent: [],
    photos: [],
    allMusics: [],
    types: [],
    allBooks: [],
    musicUrl: '',
}

export const data = (state = defaultState, action) => {
    switch (action.type) {
        case GETGUIDES:
            return { ...state, guides: state.guides };
            break;
        case GETUSERINFO:
            return { ...state, userInfo: action.userInfo };
            break;
        case GETNEWS:
            return { ...state, news: action.news }
            break;
        case GETNEWSDETAIL:
            return { ...state, newsDetail: action.newsDetail }
            break;
        case GETNEWSCONTENT:
            return { ...state, newsContent: action.newsContent }
            break;
        case GETPHOTOS:
            return { ...state, photos: action.photos }
            break;
        case GETMUSICS:
            return { ...state, allMusics: action.allMusics }
            break;
        case GETBOOKSTYPES:
            return { ...state, types: action.types }
            break;
        case GETALLBOOKS:
            return { ...state, allBooks: action.allBooks }
            break;
        case GETMUSICURL:
            return { ...state, musicUrl: action.musicUrl }
            break;
        default:
            return state;
            break;
    }
}