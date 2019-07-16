
var mongoose = require("mongoose");
var users_schema = new mongoose.Schema({ userName: String, mobile: Number, code: Number, password: String, nickName: String, photo: String, sex: String, time: Date });
var User = mongoose.model("User", users_schema);

exports.User = User;



var code_schema = new mongoose.Schema({ mobile: Number, code: Number, time: Date });
var Code = mongoose.model("Code", code_schema);
exports.Code = Code;

var book_schema = new mongoose.Schema({ userName: String, Mobile: Number, nickName: String, title: String, text: String, type: String, time: Date, userPhoto: String });
var Book = mongoose.model("Book", book_schema);
exports.Book = Book;

var new_schema = new mongoose.Schema({ image: String, title: String, content: String, time: Date, userName: String, newsId: String });
var New = mongoose.model("New", new_schema);
exports.New = New;

var newcontent_schema = new mongoose.Schema({ content: String, time: Date, userName: String, newsId: String, headPic: String, nickName: String });
var Newcontent = mongoose.model("Newcontent", newcontent_schema);
exports.Newcontent = Newcontent;

var photo_schema = new mongoose.Schema({ img: String });
var Photo = mongoose.model("Photo", photo_schema);
exports.Photo = Photo;

var music_schema = new mongoose.Schema({ img: String });
var Music = mongoose.model("Music", music_schema);
exports.Music = Music;

// var movies_schema = new mongoose.Schema({ id: String, title: String, year: String, images: Object, directors: Object, rating: Object, genres: Array });
// var Movie = mongoose.model("Movie", movies_schema);

// exports.Movie = Movie;


// var comments_schema = new mongoose.Schema({ title: String, content: String, username: String, mid: String, time: Date, mTitle: String, mv: Object });
// var Comment = mongoose.model("Comment", comments_schema);

// exports.Comment = Comment;


// var goods_schema = new mongoose.Schema({ name: String, price: Number, discount: Number, img: String, type: Object, _id: String });
// var Good = mongoose.model("Good", goods_schema);

// exports.Good = Good;

// var cars_schema = new mongoose.Schema({ username: String, goodId: String, count: Number, good: Object, money: Number });
// var Car = mongoose.model("Car", cars_schema);
// exports.Car = Car;

// var addrs_schema = new mongoose.Schema({ username: String, myMsg: Object });
// var Addr = mongoose.model("Addr", addrs_schema);
// exports.Addr = Addr;

// var contents_schema = new mongoose.Schema({ title: String, content: String });
// var Content = mongoose.model("Content", contents_schema);
// exports.Content = Content;